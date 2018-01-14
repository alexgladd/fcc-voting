import React from 'react';
import PropTypes from 'prop-types';
import api from '../util/api';
import './EditPoll.css';

const FormModes = {
  create: 'CREATE_POLL',
  edit:   'EDIT_POLL'
};

class EditPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: FormModes.create,
      poll: null
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params.pollId) {
      api.getPollDetails(match.params.pollId).then(poll => {
        this.setState({ mode: FormModes.edit, poll });
      }).catch(err => {
        console.error('Error retrieving poll details', err);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.pollId && !this.props.match.params.pollId) {
      this.setState({ mode: FormModes.create, poll: null });
    }
  }

  render () {
    const { mode, poll } = this.state;

    let formTitle;
    if (mode === FormModes.create) {
      formTitle = 'Create Poll';
    } else if (mode === FormModes.edit) {
      formTitle = 'Edit Poll';
    } else {
      formTitle = 'Loading...';
    }

    return (
      <div className="EditPoll">
        <h1>{ formTitle }</h1>
        <div className="Form">
          <div className="FormFields">
            { /* TODO build out poll form */ }
          </div>
        </div>
      </div>
    );
  }
}

export default EditPoll;
