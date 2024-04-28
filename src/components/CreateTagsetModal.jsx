import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateTagsetModal({ show, setShowCreateModal, onCreateTagset, tagName, setTagName, tagDescription, setTagDescription }) {
  const handleCreateClick = async () => {
    const trimmedTagName = tagName.trim();
    const trimmedTagDescription = tagDescription.trim();

    if (trimmedTagName && trimmedTagDescription) {
      onCreateTagset(trimmedTagName, trimmedTagDescription);
    } else {
      alert('Please enter valid tag name and description.');
    }
  };

  return (
    <Modal className='create-modal' show={show} onHide={() => setShowCreateModal(false)}>
      <Modal.Header>
        <Modal.Title>Create New Tagset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tagName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter tagset name"
            />
          </Form.Group>
          <Form.Group controlId="tagDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={tagDescription}
              onChange={(e) => setTagDescription(e.target.value)}
              placeholder="Enter tagset description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleCreateClick}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTagsetModal;
