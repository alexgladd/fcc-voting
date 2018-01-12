import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faCheckSquare, faClock } from '@fortawesome/fontawesome-free-solid';
import { PieChart } from 'react-chartkick';
import api from '../util/api';
import moment from 'moment';
import pluralize from 'pluralize';
import './PollResults.css';

class PollResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      chartOptions: {
        legend: {
          display: true,
          labels: {
            fontSize: 16,
            fontColor: '#fff'
          }
        }
      }
    };
  }

  componentDidMount() {
    const { match } = this.props;

    api.getPollDetails(match.params.pollId).then(poll => {
      this.setState({ poll });
    }).catch(err => {
      console.error('Error retrieving poll details', err);
    });
  }

  render () {
    const { poll, chartOptions } = this.state;

    if (poll) {
      const timeStr = moment(poll.createdAt).format('LLL');
      const timeAgo = moment(poll.createdAt).fromNow();
      const chartData = poll.options.reduce((acc, opt) => {
        return { ...acc, [opt.value]: opt.votes };
      }, {});

      return (
        <div className="PollResults">
          <div className="Subject">
            <h1><FontAwesomeIcon icon={faQuestionCircle} /> { poll.subject }</h1>
            <h3 title={timeStr}><FontAwesomeIcon icon={faClock} /> Started { timeAgo } by { poll.owner.name }</h3>
            <h3><FontAwesomeIcon icon={faCheckSquare} /> { poll.voteCount } total { pluralize('vote', poll.voteCount) }</h3>
          </div>
          <div className="Results">
            <PieChart data={chartData} library={chartOptions} height="55vh" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="PollResults">
          <h1>Loading...</h1>
        </div>
      );
    }
  }
}

export default PollResults;
