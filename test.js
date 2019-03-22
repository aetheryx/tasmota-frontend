const mqtt = require('async-mqtt');
const client = mqtt.connect('tcp://192.168.178.20');

client.on('connect', async () => {
  await client.publish('cmnd/bulb/Color', 'FF0000');
});
