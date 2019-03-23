import React from 'react';
import { ChromePicker } from 'react-color';

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
    fetch('/mqtt/update?topic=cmnd/bulb/Color&data=' + this.state.color.slice(1));
  }

  updateDimmer () {
    fetch('/mqtt/update?topic=cmnd/bulb/Dimmer&data=' + this.ref.current.value);
  }

  render () {
    return (
      <div className="section">
        <div className="container colorview">
          <input
            type="range"
            orient="vertical"
            onChange={this.updateDimmer.bind(this)}
            ref={this.ref}
          />
          <ChromePicker
            disableAlpha={true}
            color={this.state.color}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}