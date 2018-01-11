import React from 'react';
import PropTypes from 'prop-types';
import api from '../util/api';
import pluralize from 'pluralize';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: null
    };
  }

  componentDidMount() {
    const { user } = this.props;

    api.getUserPolls(user).then(polls => {
      this.setState({ polls });
    }).catch(err => {
      console.error('Error retrieving user polls', err);
    });
  }

  render () {
    const { user } = this.props;
    const { polls } = this.state;

    return (
      <div className="Profile">
        <h1>Your Polls</h1>
        { polls && <h3>You've created {polls.length} {pluralize('poll', polls.length)}</h3> }
        <div className="UserPolls">
          { polls ?
            polls.map((poll, idx) =>(<div key={idx}>{poll.subject} - {poll.voteCount}</div>)) :
            'Loading...'
          }
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default Profile;