import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { BsPlus, BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import '/src/styles/Page.css';
import '/src/styles/CreateModal.css';
import '/src/styles/DropdownMenu.css';

import FilterAltIcon from '@mui/icons-material/FilterAlt';


function DocumentPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreate = (name, description) => {
    const newItem = {
      id: Date.now(),
      name: name,
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

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  return (
    <SideBar>
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
              <Button className="concordancer-button" href="/concordance">Concordancer</Button>
              <Dropdown>
                <Dropdown.Toggle className="sort-button" id="sort-dropdown">
                  Sort by
                  <FilterAltIcon className="small-filter-alt-icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Date</Dropdown.Item>
                  <Dropdown.Item>Name</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Dropdown show={showDropdown} onClose={() => setShowDropdown(false)}>
            <Dropdown.Toggle
              className="new-button"
              id="dropdown-basic"
              onClick={() => setShowDropdown(!showDropdown)}
              onSelect={handleDropdownClose} // Close the dropdown when an option is selected
            >
              <BsPlus />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setShowCreateModal(true);
                  handleDropdownClose(); // Close the dropdown when Create File is clicked
                }}
              >
                Create File
              </Dropdown.Item>
              <Dropdown.Item href="/import" onSelect={handleDropdownClose}>Import File</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Modal className='create-modal' show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header>
            <Modal.Title>Create New File</Modal.Title>
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
        <Row className="item-list">
          {items.map((item) => (
            <Col key={item.id} className="file-item">
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


        <Modal className='create-modal' show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header>
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


        <Modal className='create-modal' show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header>
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
    </SideBar>
  );
}

export default DocumentPage;
