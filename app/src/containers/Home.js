import React from 'react';
import { connect } from 'react-redux';
import { requestAllPolls } from '../actions/polls';
import './Home.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.getAllPolls();
  }

  renderHero() {
    return (
      <div className="Hero">
        <h1>Welcome to Pollster!</h1>
        <p>Pollster is a quick and easy voting app. Create and share polls with
        friends, family, and followers. Log in to get started creating new polls,
        and check out the polls below for inspiration!</p>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        { !user && this.renderHero() }

        <div className="Polls">
          This is the polls container
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
