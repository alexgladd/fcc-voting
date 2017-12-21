import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Home.css';

class Home extends React.Component {
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
          This is the new home container
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Home);
