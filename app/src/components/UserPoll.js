import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle, faCheckSquare, faClock, faEdit, faTrash
} from '@fortawesome/fontawesome-free-solid';
import { PieChart } from 'react-chartkick';
import Button from './Button';
import moment from 'moment';
import pluralize from 'pluralize';
import './UserPoll.css';

const pollBgs = [ 'Red', 'Yellow', 'Green' ];
const chartOptions = {
  legend: {
    display: true,
    position: 'left',
    labels: {
      fontColor: '#fff'
    }
  }
};

const UserPoll = ({ poll }) => {
  const timeStr = moment(poll.createdAt).format('LLL');
  const timeAgo = moment(poll.createdAt).fromNow();
  const randBgIdx = Math.floor(Math.random() * pollBgs.length);
  const classes = `UserPoll ${pollBgs[randBgIdx]}`;
  const chartData = poll.options.reduce((acc, opt) => {
    return { ...acc, [opt.value]: opt.votes };
  }, {});

  return (
    <div className={classes}>
      <div className="Buttons">
        <Button onClick={() => {}}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Button onClick={() => {}}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </Button>
      </div>
      <div className="Summary">
        <h3><FontAwesomeIcon icon={faQuestionCircle} /> { poll.subject }</h3>
        <div title={timeStr}><FontAwesomeIcon icon={faClock} /> Started { timeAgo }</div>
        <div><FontAwesomeIcon icon={faCheckSquare} /> { poll.voteCount } total { pluralize('vote', poll.voteCount) }</div>
      </div>
      <div className="Results">
        <PieChart data={chartData} library={chartOptions} width="100%" />
      </div>
    </div>
  );
}

UserPoll.propTypes = {
  poll: PropTypes.object.isRequired
};

export default UserPoll;
