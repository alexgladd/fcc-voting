import React from 'react';
import api from '../util/api';
import './Poll.css';

class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      selectedOption: null
    };

    this.selectOption = this.selectOption.bind(this);
  }

  selectOption(optionIndex) {
    this.setState({ selectedOption: optionIndex });
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

    return (
      <div className="Poll">
        <h1>{ poll ? poll.subject : 'Loading...' }</h1>
        <ul>
          { poll && poll.options.map((opt, idx) => {
              const classes = ( idx === selectedOption) ? 'Option Selected' : 'Option';
              const select = () => { this.selectOption(idx) };
              return <li className={classes} onClick={select} key={idx}>{ opt.value }</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default Poll;
