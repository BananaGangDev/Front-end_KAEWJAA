import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateTagsetModal({ show, setShowCreateModal, onCreateTagset, tagName, setTagName, tagDescription, setTagDescription, parentTagsetData }) {
  const handleCreateClick = async () => {
    // if (!parentTagsetData) {
    //   alert('Please select a parent tagset.');
    //   return;
    // }
  
    const trimmedTagName = tagName.trim();
    const trimmedTagDescription = tagDescription.trim();
  
    if (trimmedTagName && trimmedTagDescription) {
      onCreateTagset(trimmedTagName, trimmedTagDescription, parentTagsetData);
    } else {
      alert('Please enter valid tag name and description.');
    }
  };

  return (
    <Modal className='create-modal' show={show} onHide={() => setShowCreateModal(false)}>
      <Modal.Header>
        <Modal.Title>Create New Tag Label</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="tagName">
            <Form.Label>Label Name</Form.Label>
            <Form.Control
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter Label name"
            />
          </Form.Group>
          <Form.Group controlId="tagDescription">
            <Form.Label>Label Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={tagDescription}
              onChange={(e) => setTagDescription(e.target.value)}
              placeholder="Enter Label description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='tagset-cancel' variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
        <Button className='tagset-confirm' variant="primary" onClick={handleCreateClick}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTagsetModal;
