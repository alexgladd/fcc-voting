import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/fontawesome-free-solid';
import './PollSummary.css';

const pollBgs = [ 'Red', 'Yellow', 'Green' ];

const PollSummary = ({ poll }) => {
  const timeStr = moment(poll.createdAt).format('LLL');
  const timeAgo = moment(poll.createdAt).fromNow();
  const randBgIdx = Math.floor(Math.random() * pollBgs.length);
  const classes = `PollSummary ${pollBgs[randBgIdx]}`;

  return (
    <Link to={`/poll/${poll.id}`}>
      <div className={classes}>
        <div className="Subject">
          <h3>{ poll.subject }</h3>
        </div>
        <div className="Created" title={timeStr}>
          <small>Started { timeAgo } by { poll.ownerName }</small>
        </div>
        <div className="Votes">
          <FontAwesomeIcon icon={faCheckSquare} /> { poll.voteCount }
        </div>
      </div>
    </Link>
  );
}

PollSummary.propTypes = {
  poll: PropTypes.object.isRequired
};

export default PollSummary;
