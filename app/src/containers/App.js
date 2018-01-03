import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import Header from '../components/Header';
import Home from './Home';
// import AuthHome from '../components/AuthHome';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Poll from '../components/Poll';
import './App.css';

const FourOhFour = () => (
  <div>
    <h2>Whoops...</h2>
    <p>Looks like you're lost! Click <Link to="/">here</Link> to go home.</p>
  </div>
)

class App extends React.Component {
  render() {
    const { user, logout, history } = this.props;

    return (
      <div className="App">
        <Header user={user} onLogout={() => { logout(); history.push('/'); }} />

        <div className="AppContent">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/poll/:pollId" component={Poll} />

          { /* login and oauth routes */ }
          <Route path="/login/:network?" component={Login} />

          { // profile route
            user &&
            <Route exact path="/profile" render={props => (<Profile user={user} {...props} />)} />
          }

          { /* no match route */ }
          <Route component={FourOhFour} />
        </Switch>
        </div>

        <footer className="Footer">
          Pollster created by <a href="https://github.com/alexgladd/fcc-voting">Alex Gladd <FontAwesomeIcon icon={faGithub} /></a>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  logout() { dispatch(logoutUser()); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
