import React from 'react';
import api from '../util/api';
import moment from 'moment';
import Button from './Button';
import './Poll.css';

class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      selectedOption: null
    };

    this.selectOption = this.selectOption.bind(this);
    this.submitVote = this.submitVote.bind(this);
  }

  selectOption(optionIndex) {
    this.setState({ selectedOption: optionIndex });
  }

  submitVote() {
    const { poll, selectedOption } = this.state;
    const vote = { optionId: poll.options[selectedOption].id };

    api.voteOnPoll(poll, vote).then(poll => {
      this.setState({ poll });
    }).catch(err => {
      console.error('Error voting on poll', err);
    });
  }

  componentDidMount() {
    const { match } = this.props;
    // request poll data
    api.getPollDetails(match.params.pollId).then(poll => {
      this.setState({ poll });
    }).catch(err => {
      console.error('Error retrieving poll details', err);
    });
  }

  render() {
    const { poll, selectedOption } = this.state;
    const timeAgo = poll ? moment(poll.createdAt).fromNow() : null;

    return (
      <div className="Poll">
        <h1>{ poll ? poll.subject : 'Loading...' }</h1>
        <h3>{ poll && `Started by ${poll.owner.name} ${timeAgo}` }</h3>
        <ul>
          { poll && poll.options.map((opt, idx) => {
              const classes = ( idx === selectedOption) ? 'Option Selected' : 'Option';
              const select = () => { this.selectOption(idx) };
              return <li className={classes} onClick={select} key={idx}>{ opt.value }</li>;
            })
          }
        </ul>
        <div className="Btn">
          <Button text="Vote" type="Primary" onClick={this.submitVote}
            disabled={selectedOption === null} />
        </div>
      </div>
    );
  }
}

export default Poll;
