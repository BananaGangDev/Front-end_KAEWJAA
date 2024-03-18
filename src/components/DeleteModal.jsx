import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteModal({
  show,
  setShowDeleteModal,
  selectedItem,
  handleDelete,
}) {
  return (
    <Modal show={show} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {selectedItem.type === 'file' ? 'File' : 'Folder'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {selectedItem.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
