import React from 'react';
import { ChromePicker } from 'react-color';

const mqtt = require('async-mqtt');
const client = mqtt.connect('tcp://192.168.178.20');

export default class ColorView extends React.PureComponent {
  constructor () {
    super();

    this.client = null;
    this.ref = React.createRef();
    this.state = {
      color: '#ff0000'
    };
  }

  onChange (color) {
    document.querySelector('#app').style.backgroundColor = color.hex;
    this.setState({ color: color.hex });
  }

  updateColor () {
    client.publish('cmnd/bulb/Color', this.state.color.slice(1));
    this.client.publish('cmnd/bulb/Color');
  }

  updateDimmer () {
    client.publish('cmnd/bulb/Dimmer', this.ref.current.value);
  }

  render () {
    return (
      <div className="section">
        <div className="container colorview">
          <input
            type="range"
            orient="vertical"
            onMouseUp={this.updateDimmer.bind(this)}
            ref={this.ref}
          />
          <div onMouseUp={this.updateColor.bind(this)}>
            <ChromePicker
              disableAlpha={true}
              color={this.state.color}
              onChange={this.onChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}