import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { BsPlus, BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';
import '../styles/Page.css';

function DocumentPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [items, setItems] = useState([]);

  const handleCreate = (name, description) => {
    const newItem = {
      id: Date.now(),
      name,
      description,
      type: showCreateModal ? 'file' : 'folder',
      createdAt: new Date().toLocaleString(),
    };
    setItems([...items, newItem]);
    setShowCreateModal(false);
  };

  const handleEdit = (name) => {
    selectedItem.name = name;
    setShowEditModal(false);
  };

  const handleDelete = () => {
    const updatedItems = items.filter((item) => item.id !== selectedItem.id);
    setItems(updatedItems);
    setShowDeleteModal(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="document-title">Document</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="button-bar">
            <Button className="corpus-button">Corpus</Button>
            <Button className="concordancer-button" onClick={() => setShowImportModal(true)}>
              Concordancer
            </Button>
            <Dropdown>
              <Dropdown.Toggle className="sort-button" id="sort-dropdown">
                Sort by
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Date</Dropdown.Item>
                <Dropdown.Item>Name</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
        <Col className="text-right">
          <Button className="new-button" onClick={() => setShowCreateModal(true)}>
            <BsPlus />
          </Button>
        </Col>
      </Row>
      {/* เริ่มต้นแถบตัวเลือกสร้างไฟล์หรือโฟลเดอร์ */}
      <Modal show={showCreateModal || showImportModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{showCreateModal ? 'Create New File' : 'Create New Folder'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl placeholder="Name" />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl placeholder="Description" as="textarea" rows={3} />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCreate('New Item', 'Description goes here');
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {/* สิ้นสุดแถบตัวเลือกสร้างไฟล์หรือโฟลเดอร์ */}
      <Row className="item-list">
        {items.map((item) => (
          <Col key={item.id} className="item">
            <div className="item-icon">
              {item.type === 'file' ? <BsFileEarmarkText /> : <BsFolderPlus />}
            </div>
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="item-date">{item.createdAt}</div>
            </div>
            <div className="item-actions">
              <Button
                variant="link"
                onClick={() => {
                  setSelectedItem(item);
                  setShowEditModal(true);
                }}
              >
                <BsPencil />
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedItem(item);
                  setShowDeleteModal(true);
                }}
              >
                <BsTrash />
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      {/* เริ่มต้นแถบตัวเลือกแก้ไขไฟล์หรือโฟลเดอร์ */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {selectedItem.type === 'file' ? 'File' : 'Folder'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Name"
              defaultValue={selectedItem.name}
              onChange={(e) => (selectedItem.name = e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleEdit(selectedItem.name)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* สิ้นสุดแถบตัวเลือกแก้ไขไฟล์หรือโฟลเดอร์ */}
      
      {/* เริ่มต้นแถบตัวเลือกลบไฟล์หรือโฟลเดอร์ */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {selectedItem.type === 'file' ? 'File' : 'Folder'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedItem.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DocumentPage;