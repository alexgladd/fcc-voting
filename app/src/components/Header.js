import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
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

          { user &&
            <Button type="Primary" onClick={onNewPoll}>
              <FontAwesomeIcon icon={faPlus} /> New Poll
            </Button> }

          { user ?
            <Button onClick={onLogout}>Logout</Button> :
            <Button onClick={onLogin}>Login</Button>
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
