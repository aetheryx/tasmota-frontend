import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor () {
    super();

    this.state = {
      opened: false
    };
  }

  render () {
    return (
      <nav className="navbar has-background-grey-darker">
        <div className="navbar-brand">
          <a
            onClick={() => this.setState(prev => ({ opened: !prev.opened }))}
            role="button"
            className={`navbar-burger burger${this.state.opened ? ' is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
    
        <div className={`navbar-menu has-background-grey-darker${this.state.opened ? ' is-active' : ''}`}>
          <div className="navbar-start">
            <NavLink exact to="/" activeClassName="active" className="navbar-item">
              Hi
            </NavLink>
            <NavLink to="/aa" activeClassName="active" className="navbar-item">
              Hi
            </NavLink>
            <NavLink to="/sdf" activeClassName="active" className="navbar-item">
              Hi
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}