import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { BsPlus, BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import '/src/styles/Page.css';
import '/src/styles/CreateModal.css';
import '/src/styles/DropdownMenu.css';
import '../styles/Tagset.css';
import api from '/src/api.jsx';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';

import FolderIcon from '@mui/icons-material/Folder';
import Swal from 'sweetalert2';

function ChooseTagsetPage () {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [tags, setTags] = useState([]);
  const [selectedTagset, setSelectedTagset] = useState('');
  const [selectedTagsetId, setSelectedTagsetId] = useState('');
  const [selectedTagsetname, setSelectedTagsetname] = useState('');
  const [totalTagsets, setTotalTagsets] = useState(0);

  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');



  useEffect(() => {
    fetchTagsetsAll();
  }, []);

  const fetchTagsetsAll = async()=>{
    try { 
      const response = await api.get(`/tagsets/all`);
      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const tagsetall = response.data;
      // console.log(tagsetall);
      setTags(tagsetall);
      setTotalTagsets(tagsetall.length);
    } catch (error) {
      console.error('Error fetching tagsets:', error);
    }
  }

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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleCreateClick = async () => {

    const trimmedFolderName = folderName.trim();
    const trimmedFolderDescription = folderDescription.trim();
  
    if (trimmedFolderName && trimmedFolderDescription) {
      handleCreate(trimmedFolderName, trimmedFolderDescription);
    } else {
      alert('Please enter valid folder name and description.');
    }
  };

  const handleEditModalShow = (tagData) => {
    // console.log(tagData);
    setSelectedTagset(tagData);
    setShowEditModal(true);
  };

  const handleDeleteModalShow = (tagsetId, tagName) => {
    setSelectedTagsetId(tagsetId);
    setSelectedTagsetname(tagName);
    setShowDeleteModal(true);
  };
  
  const handleEditConfirm = async () => {
    try {
      // console.log(selectedTagset.tagset_id, editedName, editedDescription);
      await updateTagset(selectedTagset.tagset_id, editedName, editedDescription);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating tagset:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTagset(selectedTagsetId, selectedTagsetname);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting tagset:', error);
    }
  };

  const handleCreate = async (foldername, folderdescription) => {
    try {
      // console.log(foldername, folderdescription);
      const response = await api.post('/tagsets/create', {
        tagset_name: foldername,
        description: folderdescription,
        created_by: 1,
        created_date: new Date().toISOString().split('T')[0],
      });
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Tagset created successfully!"
        });
        setFolderName('');
        setFolderDescription('');
        fetchTagsetsAll();
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
    setShowCreateModal(false);
  };

  const updateTagset = async (tagsetId, tagName, tagDescription) => {
    try {
      // console.log(tagsetId, tagName, tagDescription);
      const response = await api.put('tagsets/update', {
        tagset_id: tagsetId,
        tagset_name: tagName,
        description: tagDescription,
      });
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Tagset updated successfully!"
        });
        fetchTagsetsAll();
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

  const deleteTagset = async (tagset_id, tagset_name) => {
    try {
      // console.log(tagset_id, tagset_name);
      const response = await api.delete(`/tagsets/delete?tagset_name=${tagset_name}&tagset_id=${tagset_id}`);
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Tagset deleted successfully!"
        });
        fetchTagsetsAll();
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


  return (
    <SideBar>
      <Container>
        <Row>
            <Col>
              <h1 className="document-title">Tagset</h1>
            </Col>
        </Row>
        <Row>
          <BsPlus 
            className="new-button"
            onClick={() => setShowCreateModal(true)} 
          />
        </Row>
        <Row className="tagset-header">
          <Col className="header-column">Name</Col>
          <Col className="header-column-description">Description</Col>
          <Col className="header-column">Total tagset: {totalTagsets}</Col>
        </Row>
        <Row className="item-list">
          <div className='tagset-accordion'>
            {tags.map((item) => (
              <Card key={item.tagset_id} style={{ backgroundColor: "#E7E5FF", marginBottom: "15px", textAlign: "center"}}>
                  <AccordionSummary>
                    <div className='tagset-content'>{item.tagset_name}</div>
                    <div className='tagset-content'>{item.description}</div>
                    <div className='tagset-button'>
                        {/* <BookmarkBorderOutlinedIcon
                        style={{ color: isBookmarked ? '#FC5B5C' : 'inherit' }}
                        /> */}
                        <EditOutlinedIcon onClick={() => handleEditModalShow(item)}/>
                        <DeleteOutlinedIcon onClick={() => handleDeleteModalShow(item.tagset_id, item.tagset_name)}/>
                    </div>
                  </AccordionSummary>
                </Card >
              ))}
          </div>
            {/* {tags.map((item) => (
              <Col key={item.tagset_id} className="file-item">
                <div className="tagset-icon">
                  <FolderIcon style={{color:"9EDCFF", width:"5em", height:"5em"}} />
                </div>
                <div className="item-details">
                  <div className="item-name" style={{textAlign:"center"}}>{item.tagset_name}</div>
                  <div className="item-date" style={{textAlign:"center"}}>{item.created_date}</div>
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
            ))} */}
        </Row>

        <Modal className='create-modal' show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header>
            <Modal.Title>Create New File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Name" 
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl 
                type='text'
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                placeholder="Description" 
                as="textarea" 
                rows={3} 
              />
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

        <Modal className='create-modal' show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header>
            <Modal.Title>Edit "{selectedTagset.tagset_name}"</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                type='text'
                placeholder="New Tagset Name"
                // value={selectedTagset.tagset_name}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                // value={selectedTagset.description}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="New Tagset Description" 
                as="textarea" 
                rows={3} 
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditConfirm}>
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

export default ChooseTagsetPage;