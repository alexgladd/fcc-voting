import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Header.css';

class Header extends React.Component {
  render () {
    const { user, onNewPoll, onLogin, onLogout } = this.props;

    return (
      <header className="Header">
        <div className="Brand">
          <Link to="/">Pollster</Link>
        </div>
        <div className="Auth">
          { user && <Link to="/profile">{ user.name }</Link> }
          { user && <Button text="New Poll" type="Primary" onClick={onNewPoll} /> }
          { user ?
            <Button text="Logout" onClick={onLogout} /> :
            <Button text="Login" onClick={onLogin} />
          }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  onNewPoll: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Header;
