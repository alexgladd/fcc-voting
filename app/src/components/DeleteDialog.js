import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from './Button';
import './DeleteDialog.css';

const DeleteDialog = ({ poll, onCancel, onConfirm }) => {
  return (
    <Modal>
      <div className="DeleteDialog">
        <div>
          <h3>Are you sure?</h3>
        </div>
        <div>
          Deleting your poll <em>{`"${poll.subject}"`}</em> cannot be undone
        </div>
        <div className="Buttons">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="Warning" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </Modal>
  );
}

DeleteDialog.propTypes = {
  poll: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default DeleteDialog;
