import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import '/src/styles/CreateModal.css';


function CreateModal({ show, setShowCreateModal, handleCreate }) {
  const [fileName, setFileName] = useState('');

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleCreateClick = () => {
    if (fileName.trim() === '') {
      alert('Please enter a file name.');
    } else {
      handleCreate(fileName, 'Description goes here', type); // ส่งพารามิเตอร์ type ไปยัง handleCreate
      setShowCreateModal(false);
    }
  };


  return (
    <Modal className='modal-dialog' show={show} onHide={() => setShowCreateModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New {type === 'file' ? 'File' : 'Folder'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Name"
            value={fileName}
            onChange={handleFileNameChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl placeholder="Description" as="textarea" rows={3} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;

