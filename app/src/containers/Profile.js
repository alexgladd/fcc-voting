import React from 'react';
import PropTypes from 'prop-types';
import api from '../util/api';
import pluralize from 'pluralize';
import UserPoll from '../components/UserPoll';
import DeleteDialog from '../components/DeleteDialog';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: null,
      deleteIdx: null
    };

    this.handleStartDelete = this.handleStartDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  handleStartDelete(idx) {
    this.setState({ deleteIdx: idx });
  }

  handleCancelDelete() {
    this.setState({ deleteIdx: null });
  }

  handleConfirmDelete() {
    const { user } = this.props;
    const { polls, deleteIdx } = this.state;

    api.deletePoll(user, polls[deleteIdx]).then(res => {
      const newPolls = [ ...polls ];
      newPolls.splice(deleteIdx, 1);

      this.setState({ deleteIdx: null, polls: newPolls });
    }).catch(err => {
      console.error('Error deleting poll', err);
    });
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
    const { history } = this.props;
    const { polls, deleteIdx } = this.state;

    return (
      <div className="Profile">
        <h1>Your Polls</h1>
        { polls && <h3>You've created {polls.length} {pluralize('poll', polls.length)}</h3> }
        <div className="UserPolls">
          { polls ?
            polls.map((poll, idx) => (
              <UserPoll poll={poll} pollIdx={idx} key={idx}
                onEdit={ () => history.push(`/poll/${poll.id}/edit`) }
                onDelete={ () => this.handleStartDelete(idx) } />)
            ) :
            'Loading...'
          }
        </div>
        { deleteIdx !== null &&
          <DeleteDialog poll={polls[deleteIdx]}
            onCancel={this.handleCancelDelete} onConfirm={this.handleConfirmDelete}/> }
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default Profile;
