
process.env.NODE_ENV = process.argv.includes('--development')
  ? 'development'
  : 'production';

const config = require('../../config.json');
const express = require('express');
const path = require('path');
const mqtt = require('async-mqtt');

let state = {};

const app = express();
const client = mqtt.connect('tcp://192.168.178.20');

client.on('connect', async () => {
  await client.subscribe('stat/bulb/RESULT');
  client.on('message', (topic, packet) => {
    if (topic === 'stat/bulb/RESULT') {
      state = JSON.parse(packet);
    }
  });
});

client.on('error', console.error);

app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/mqtt/update', (req, res) => {
  client.publish(req.query.topic, req.query.data);
  res.status(200).send();
});

app.get('/mqtt/state', (req, res) => {
  res.status(200).send(state);
});

app.get('/auth', (req, res) => {
  const [ username, passwd ] = Buffer.from(
    (req.headers['authorization'] || '').slice(6),
    'base64'
  ).toString().split(':');

  if (username === config.username && passwd === config.passwd) {
    res.status(200).json({ username, passwd });
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="login"');
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
});

app.listen(config.port, () =>
  console.log('Listening to port', config.port)
);

if (process.env.NODE_ENV === 'development') {
  require('./webpack.js');
}