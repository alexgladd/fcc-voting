import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faPlus } from '@fortawesome/fontawesome-free-solid';
import Button from '../components/Button';
import { connect } from 'react-redux';
import api from '../util/api';
import './EditPoll.css';

class EditPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      poll: null,
      subject: '',
      options: ['', '']
    };

    this.startEdit = this.startEdit.bind(this);
    this.startCreate = this.startCreate.bind(this);
    this.onSubjectChange = this.onSubjectChange.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.onAddOption = this.onAddOption.bind(this);
    this.onSavePoll = this.onSavePoll.bind(this);
    this.getValidOptions = this.getValidOptions.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  startEdit() {
    const { match } = this.props;

    api.getPollDetails(match.params.pollId).then(poll => {
      this.setState({
        editing: true,
        poll,
        subject: '',
        options: []
      });
    }).catch(err => {
      console.error('Error retrieving poll details', err);
    });
  }

  startCreate() {
    this.setState({
      editing: false,
      poll: null,
      subject: '',
      options: ['', '']
    });
  }

  onSubjectChange(e) {
    this.setState({ subject: e.target.value });
  }

  onOptionChange(e, idx) {
    const { options } = this.state;
    const newOptions = [ ...options ];
    newOptions[idx] = e.target.value;

    this.setState({ options: newOptions });
  }

  onAddOption() {
    const { options } = this.state;
    const newOptions = [ ...options, '' ];

    this.setState({ options: newOptions });
  }

  onSavePoll() {
    const { editing, poll, subject } = this.state;
    const { user, history } = this.props;

    const options = this.getValidOptions();

    if (editing) {
      api.updatePoll(user, poll, { newOptions: options }).then(updatedPoll => {
        history.push('/profile');
      }).catch(err => {
        console.error('Error updating poll', err);
      });
    } else {
      api.createPoll(user, { subject, options }).then(newPoll => {
        history.push(`/poll/${newPoll.id}`);
      }).catch(err => {
        console.error('Error creating poll', err);
      });
    }
  }

  getValidOptions() {
    const { options } = this.state;

    return options.reduce((acc, opt) => {
      const option = opt.trim();
      if (option) {
        acc.push({ value: option });
      }

      return acc;
    }, []);
  }

  validateInputs() {
    const { editing, subject } = this.state;
    const validOptions = this.getValidOptions().length;

    if (editing) {
      // need at least one new option while editing
      if (validOptions >= 1) {
        return true;
      } else {
        return false;
      }
    } else {
      // need subject and at least two options while creating
      if (!subject.trim()) {
        return false;
      } else if (validOptions >= 2) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params.pollId) {
      this.startEdit();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.pollId && !this.props.match.params.pollId) {
      this.startCreate();
    } else if (!prevProps.match.params.pollId && this.props.match.params.pollId) {
      this.startEdit();
    }
  }

  render () {
    const { match } = this.props;
    const { editing, poll, subject, options } = this.state;
    const inputsValid = this.validateInputs();

    return (
      <div className="EditPoll">
        <h1>{ match.params.pollId ? 'Edit your poll' : 'Create a new poll' }</h1>
        <div className="Form">
          <div className="FormFields">
            <div className="Subject">
              <label><FontAwesomeIcon icon={faQuestionCircle} /></label>
              { editing ?
                poll.subject :
                <span>
                  <input type="text" placeholder="Enter a poll subject"
                    value={subject} onChange={this.onSubjectChange} />
                </span>
              }
            </div>
            <div className="Options">
              { editing &&
                <ul>
                  { poll.options.map((opt, idx) => <li key={idx}>{opt.value}</li>) }
                </ul>
              }

              { options.map((opt, idx) => {
                  const onOptChange = (e) => this.onOptionChange(e, idx);
                  return (
                    <input type="text" placeholder="Enter a poll option" key={idx}
                      value={options[idx]} onChange={onOptChange} />
                  );
                })
              }
            </div>
          </div>
          <div className="Buttons">
            <Button onClick={this.onAddOption}>
              <FontAwesomeIcon icon={faPlus} /> Add option
            </Button>
            <br />
            <Button type="Primary" onClick={this.onSavePoll} disabled={!inputsValid}>
              { editing ? 'Update poll' : 'Create poll' }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, null)(EditPoll);
