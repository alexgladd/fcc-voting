import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle, faCheckSquare, faClock, faEdit, faTrash, faLink
} from '@fortawesome/fontawesome-free-solid';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';
import { PieChart } from 'react-chartkick';
import Button from './Button';
import moment from 'moment';
import pluralize from 'pluralize';
import clipboard from 'clipboard-polyfill';
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

const UserPoll = ({ poll, pollIdx, onEdit, onDelete }) => {
  const timeStr = moment(poll.createdAt).format('LLL');
  const timeAgo = moment(poll.createdAt).fromNow();
  const bgIdx = pollIdx % pollBgs.length;
  const classes = `UserPoll ${pollBgs[bgIdx]}`;
  const chartData = poll.options.reduce((acc, opt) => {
    return { ...acc, [opt.value]: opt.votes };
  }, {});

  const pollUrl = `${window.location.origin}/poll/${poll.id}`;
  const onLinkClick = () => {
    clipboard.writeText(pollUrl);
  }
  const onTwitterClick = () => {
    const txt = `Vote on my poll on Pollster: ${poll.subject}`;
    const tags = 'poll,Pollster';
    const url = `https://twitter.com/intent/tweet?text=${txt}&url=${pollUrl}&hashtags=${tags}`;

    window.open(encodeURI(url), 'Pollster_Twitter');
  }

  return (
    <div className={classes}>
      <div className="Buttons">
        <Button onClick={onEdit}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Button onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </Button>
      </div>
      <div className="Summary">
        <h3><FontAwesomeIcon icon={faQuestionCircle} /> { poll.subject }</h3>
        <div title={timeStr}><FontAwesomeIcon icon={faClock} /> Started { timeAgo }</div>
        <div><FontAwesomeIcon icon={faCheckSquare} /> { poll.voteCount } total { pluralize('vote', poll.voteCount) }</div>
        <div>
          <Button onClick={onLinkClick} tooltip="Copy poll link to clipboard">
            <FontAwesomeIcon icon={faLink} fixedWidth />
          </Button>
          <Button onClick={onTwitterClick} tooltip="Share poll on Twitter">
            <FontAwesomeIcon icon={faTwitter} fixedWidth />
          </Button>
        </div>
      </div>
      <div className="Results">
        <PieChart data={chartData} library={chartOptions} width="100%" />
      </div>
    </div>
  );
}

UserPoll.propTypes = {
  poll: PropTypes.object.isRequired,
  pollIdx: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserPoll;
