import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestAllPolls } from '../actions/polls';
import PollSummary from '../components/PollSummary';
import './Home.css';

const Hero = () => (
  <div className="Hero">
    <h1>Welcome to Pollster!</h1>
    <p>Pollster is a quick and easy voting app. Create and share polls with
    friends, family, and followers. <Link to="/login">Log in</Link> to get
    started creating new polls, and check out the polls below for inspiration!</p>
  </div>
);

const AuthHero = () => (
  <div className="Hero">
    <h1>Welcome back to Pollster!</h1>
    <p>Use the buttons above to create a <Link to="/poll/new">new</Link> poll
    or <Link to="/profile">view</Link> your existing polls. Check out polls from
    other users below!</p>
  </div>
);

class Home extends React.Component {
  componentDidMount() {
    this.props.getAllPolls();
  }

  render() {
    const { user, polls } = this.props;

    return (
      <div>
        { user ? <AuthHero /> : <Hero /> }

        <div className="Polls">
          { polls.map((poll, idx) => <PollSummary poll={poll} key={idx} />) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  polls: state.polls
});

const mapDispatchToProps = (dispatch) => ({
  getAllPolls() { dispatch(requestAllPolls()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
