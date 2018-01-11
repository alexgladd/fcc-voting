import React from 'react';
import PropTypes from 'prop-types';
import api from '../util/api';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: []
    };
  }

  componentDidMount() {
    const { user } = this.props;

    api.getAuthorizedExample(user).then(result => {
      this.setState({ message: result.message });
    }).catch(err => {
      this.setState({ message: 'Error getting profile message' });
    });
  }

  render () {
    const { user } = this.props;

    return (
      <div>
        <h1>Your Polls</h1>
        <ul>
          <li><strong>User name:</strong> {user.name}</li>
          <li><strong>Network:</strong> {user.github ? 'Github' : 'Unknown'}</li>
        </ul>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default Profile;
