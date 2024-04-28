import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import CreateTagsetModal from '../components/CreateTagsetModal';
import { BsPlus } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import { v4 as uuidv4 } from 'uuid';
import api from '/src/api.jsx';
import '../styles/Page.css';
import '../styles/Tagset.css';
import '../styles/CreateModal.css';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Card from '@mui/material/Card';
import Swal from 'sweetalert2';

function TagsetPage({ id, name, description, onUpdate, onDelete, onCreateNestedTagset }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagsets, setTagsets] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagDescription, setTagDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [totalTagsets, setTotalTagsets] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedTagsetId, setSelectedTagsetId] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleEditModalShow = (tagsetId, tagName, tagDescription) => {
    setSelectedTagsetId(tagsetId);
    setEditedName(tagName);
    setEditedDescription(tagDescription);
    setShowEditModal(true);
  };

  const handleDeleteModalShow = (tagsetId, tagName) => {
    setSelectedTagsetId(tagsetId);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    fetchTagsets();
  }, []);

  const fetchTagsets = async () => {
    try {
      const response = await api.get(`/tagsets/labels?tagset_id=1`);
      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const tagset = response.data;
      const nestedTags = {};
      tagset.forEach(tag => {
        nestedTags[tag.label_name] = { ...tag, children: [], isOpen: false };
      });

      tagset.forEach(tag => {
        if (tag.label_parent !== 'ROOT' && nestedTags[tag.label_parent]) {
          nestedTags[tag.label_parent].children.push(nestedTags[tag.label_name]);
        }
      });
      const rootTags = tagset.filter(tag => tag.label_parent === 'ROOT').map(tag => nestedTags[tag.label_name]);
      setTags(rootTags);
      setTotalTagsets(tagset.length);
    } catch (error) {
      console.error('Error fetching tagsets:', error);
    }
  };

  const toggleTag = (tag) => {
    tag.isOpen = !tag.isOpen;
    setTags([...tags]);
  }

  const renderTags = (tagData) => {
    return (
      <div key={tagData.label_id}>
        <div className='tagset-button'
          onClick={() => toggleTag(tagData)}
          style={{ backgroundColor: "#E7E5FF", marginBottom: "15px", textAlign: "center" }}>
          <div className='tagset-content'>
            {tagData.children.length > 0 && <ExpandMoreIcon />} {tagData.label_name} - {tagData.label_description}
            <div className='tagset-action-button'>
              {/* <BookmarkBorderOutlinedIcon
                onClick={handleBookmarkClick}
                style={{ color: isBookmarked ? '#FC5B5C' : 'inherit' }}
              /> */}
              <EditOutlinedIcon onClick={() => handleEditModalShow(tagData.label_id, tagData.label_name, tagData.label_description)} />
              <DeleteOutlinedIcon onClick={() => handleDeleteModalShow(tagData.label_id, tagData.label_name)} />
            </div>
          </div>
        </div>
        {tagData.isOpen && tagData.children.length > 0 && (
          <div style={{ marginLeft: '40px' }}>
            {tagData.children.map(child => renderTags(child))}
          </div>
        )}
      </div>
    );
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const createTagset = async (tagName, tagDescription) => {
    try {
      const response = await api.post('/tagsets/labels/create', {
        label_name: tagName,
        label_description: tagDescription,
        label_level: 0,
        label_parent: 'ROOT',
        created_in_tagset: 1,
        created_by: 1,
        created_date: new Date().toISOString().split('T')[0],
      });
      if (response.status === 201) {
        // alert('Tagset created successfully!');
        Toast.fire({
          icon: "success",
          title: "Tagset created successfully!"
        });
        fetchTagsets();

      } else {
        throw new Error(`Failed to create tagset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating tagset:', error);
      Toast.fire({
        icon: "error",
        title: "Failed to create tagset. Please try again later."
      });
    }
  };

  const updateTagset = async (tagsetId, tagName, tagDescription) => {
    try {
      const response = await api.put('tagsets/labels/update', {
        label_id: tagsetId,
        label_name: tagName,
        label_level: 0,
        label_parent: "ROOT",
        label_description: tagDescription,
      });
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Tagset updated successfully!"
        });
        fetchTagsets();
      } else {
        throw new Error(`Failed to update tagset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating tagset:', error);
      Toast.fire({
        icon: "error",
        title: "Failed to update tagset. Please try again later."
      });
    }
  };

  const deleteTagset = async (tagsetId) => {
    try {
      const response = await api.delete(`/tagsets/labels/delete?label_id=${tagsetId}`);
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Tagset deleted successfully!"
        });
        fetchTagsets();
      } else {
        throw new Error(`Failed to delete tagset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting tagset:', error);
      Toast.fire({
        icon: "error",
        title: "Failed to delete tagset. Please try again later."
      });
    }
  };

  const handleCreateClick = async () => {
    if (typeof tagName === 'string' && tagName.trim() !== '' && typeof tagDescription === 'string' && tagDescription.trim() !== '') {
      try {
        await createTagset(tagName.trim(), tagDescription.trim());
      } catch (error) {
        console.error('Error creating tagset:', error);
      }
      setShowCreateModal(false);
      setTagName('');
      setTagDescription('');
    } else {
      alert('Please enter valid tag name and description.');
    }
  };

  const handleEditConfirm = async () => {
    try {
      await updateTagset(selectedTagsetId, editedName, editedDescription);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating tagset:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTagset(selectedTagsetId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting tagset:', error);
    }
  };

  return (
    <SideBar>
      <Container>
        <Row>
          <Col>
            <h1 className="tagset-title">Tagset</h1>
          </Col>
        </Row>
        <Row className="tagset-header">
          <Col className="header-column">Name</Col>
          <Col className="header-column-description">Description</Col>
          <Col className="header-column">Total tagset: {totalTagsets}</Col>
        </Row>
        <div>
          <Button className='tagset-create-button' variant="primary" onClick={() => setShowCreateModal(true)}>
            <BsPlus />
          </Button>
        </div>
      </Container>
      <div className='tagset-accordion'>
        {tags.length > 0 ? (
          tags.map(rootTag => renderTags(rootTag))
        ) : (
          <p style={{ textAlign: "center" }}>Loading Tagset...</p>
        )}
      </div>

      {/* Edit Modal */}
      <Modal className='create-modal' show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Tagset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Edit tagset name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Edit tagset description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal className='create-modal' show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <Modal.Title>Delete Tagset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <CreateTagsetModal
        show={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        onCreateTagset={handleCreateClick}
        tagName={tagName}
        setTagName={setTagName}
        tagDescription={tagDescription}
        setTagDescription={setTagDescription}
      />
    </SideBar>
  );
}

export default TagsetPage;