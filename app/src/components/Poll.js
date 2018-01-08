import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { submitVote } from '../actions/votes';
import api from '../util/api';
import moment from 'moment';
import Button from './Button';
import './Poll.css';

class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      selectedOption: null,
      voted: false
    };

    this.selectOption = this.selectOption.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  selectOption(optionIndex) {
    this.setState({ selectedOption: optionIndex });
  }

  handleVote() {
    const { poll, selectedOption } = this.state;
    const vote = { optionId: poll.options[selectedOption].id };

    this.props.submitVote(poll, vote);
  }

  componentDidMount() {
    const { votes, match } = this.props;
    const pollId = match.params.pollId;

    if (votes[pollId]) {
      // already voted on this poll
      this.setState({ voted: true });
    } else {
      // request poll data
      api.getPollDetails(match.params.pollId).then(poll => {
        this.setState({ poll });
      }).catch(err => {
        console.error('Error retrieving poll details', err);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { votes, match } = this.props;
    const pollId = match.params.pollId;

    if (Object.keys(prevProps.votes).length !== Object.keys(votes).length) {
      // votes changed
      if (votes[pollId]) {
        this.setState({ voted: true });
      }
    }
  }

  render() {
    const { poll, selectedOption, voted } = this.state;

    if (voted) {
      const { location } = this.props;
      return <Redirect to={`${location.pathname}/results`} />;
    } else {
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
            <Button text="Vote" type="Primary" onClick={this.handleVote}
              disabled={selectedOption === null} />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  votes: state.votes
});

const mapDispatchToProps = (dispatch) => ({
  submitVote(poll, vote) { dispatch(submitVote(poll.id, vote)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
