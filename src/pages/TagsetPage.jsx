import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import TagsetAccordion from '../components/TagsetAccordion';
import CreateTagsetModal from '../components/CreateTagsetModal';
import { BsPlus } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import { v4 as uuidv4 } from 'uuid';
import api from '/src/api.jsx';
import '../styles/Page.css';
import '../styles/Tagset.css';
import '../styles/CreateModal.css';
import axios from 'axios';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Card from '@mui/material/Card';

function TagsetPage({ id, name, description, onUpdate, onDelete, onCreateNestedTagset }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tagsets, setTagsets] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagDescription, setTagDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [totalTagsets, setTotalTagsets] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    const fetchTagsets = async () => {
      try {
        const response = await api.get(`/tagsets/labels?tagset_id=1`);
        if (response.status !== 200) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const tagset = response.data;
        console.log(tagset);

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

        console.log(rootTags);

        setTotalTagsets(tagset.length);
      } catch (error) {
        console.error('Error fetching tagsets:', error);
      }
    };
    fetchTagsets();
  }, []);

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
            <BookmarkBorderOutlinedIcon
              onClick={handleBookmarkClick}
              style={{ color: isBookmarked ? '#FC5B5C' : 'inherit' }}
              />
              <EditOutlinedIcon />
              <DeleteOutlinedIcon />
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


  const createTagset = async (tagName, tagDescription) => {
    try {
      const response = await axios.post('/tagsets/labels/create', {
        label_name: tagName,
        label_description: tagDescription,
        label_level: 0,
        label_parent: 'ROOT',
        created_in_tagset: 0,
        created_by: 0,
        created_date: new Date().toISOString(),
      });
      if (response.status === 200) {
        alert('Tagset created successfully!');
        // ดึงข้อมูล Tagset ใหม่หลังจากสร้างเสร็จ
        fetchTagsets();
      } else {
        throw new Error(`Failed to create tagset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating tagset:', error);
      alert('Failed to create tagset. Please try again later.');
    }
  };
  
  // ฟังก์ชั่นสำหรับการแก้ไข Tagset
  const updateTagset = async (tagsetId, tagName, tagDescription) => {
    try {
      const response = await axios.put('/tagsets/update', {
        tagset_id: tagsetId,
        tagset_name: tagName,
        description: tagDescription,
      });
      if (response.status === 200) {
        alert('Tagset updated successfully!');
        // ดึงข้อมูล Tagset ใหม่หลังจากแก้ไขเสร็จ
        fetchTagsets();
      } else {
        throw new Error(`Failed to update tagset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating tagset:', error);
      alert('Failed to update tagset. Please try again later.');
    }
  };
  
  // ฟังก์ชั่นสำหรับการลบ Tagset
  const deleteTagset = async (tagsetId) => {
    try {
      const response = await axios.delete(`/tagsets/labels/delete?label_id=${tagsetId}`);
      if (response.status === 200) {
        alert('Tagset deleted successfully!');
        // ดึงข้อมูล Tagset ใหม่หลังจากลบเสร็จ
        fetchTagsets();
      } else {
        throw new Error(`Failed to delete tagset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting tagset:', error);
      alert('Failed to delete tagset. Please try again later.');
    }
  };
  
  // อัปเดตฟังก์ชั่น handleCreateClick เพื่อใช้งาน createTagset
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
  
  // อัปเดตฟังก์ชั่น handleEditClick ใน TagsetPage เพื่อใช้งาน updateTagset
  const handleEditClick = async (tagsetId, newTagName, newTagDescription) => {
    try {
      await updateTagset(tagsetId, newTagName, newTagDescription);
    } catch (error) {
      console.error('Error updating tagset:', error);
    }
  };
  
  // อัปเดตฟังก์ชั่น handleDeleteClick ใน TagsetPage เพื่อใช้งาน deleteTagset
  const handleDeleteClick = async (tagsetId) => {
    try {
      await deleteTagset(tagsetId);
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
          <CreateTagsetModal
            show={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            onCreateTagset={handleCreateClick}
            tagName={tagName}
            setTagName={setTagName}
            tagDescription={tagDescription}
            setTagDescription={setTagDescription}
          />
        </div>
      </Container>
      <div className='tagset-accordion'>
        {tags.length > 0 ? (
          tags.map(rootTag => renderTags(rootTag))
        ) : (
          <p style={{ textAlign: "center" }}>Loading Tagset...</p>
        )}
      </div>
    </SideBar>
  );
}

export default TagsetPage;