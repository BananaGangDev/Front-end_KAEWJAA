import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TagsetAccordion from '../components/TagsetAccordion';
import CreateTagsetModal from '../components/CreateTagsetModal';
import { Container, Row, Col } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import { v4 as uuidv4 } from 'uuid';
import '../styles/Page.css';
import '../styles/Tagset.css';
import '../styles/CreateModal.css';

function TagsetPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tagsets, setTagsets] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagDescription, setTagDescription] = useState('');
  const [rootTagsets, setRootTagsets] = useState([]);
  const [nestedTagsets, setNestedTagsets] = useState({});


  const handleCreateClick = () => {
    if (tagName.trim() === '' || tagDescription.trim() === '') {
      alert('Please enter name and description.');
    } else {
      const newTagsetId = uuidv4();
      const newTagset = {
        id: newTagsetId,
        name: tagName,
        description: tagDescription,
        label_parent: 'ROOT', // กำหนด label_parent เป็น 'ROOT' สำหรับ Root Tagsets
      };
      setTagsets([...tagsets, newTagset]);
      if (newTagset.label_parent === 'ROOT') {
        setRootTagsets([...rootTagsets, newTagset]); // เพิ่ม Root Tagset
      } else {
        setNestedTagsets(prevState => ({
          ...prevState,
          [newTagset.label_parent]: [
            ...(prevState[newTagset.label_parent] || []),
            newTagset
          ]
        }));
      }
      setShowCreateModal(false);
      setTagName('');
      setTagDescription('');
    }
  };
  
  
  const handleUpdateTagset = (id, editedName, editedDescription) => {
    const updatedTagsets = tagsets.map(tagset => {
      if (tagset.id === id) {
        return {
          ...tagset,
          name: editedName,
          description: editedDescription,
        };
      }
      return tagset;
    });
    setTagsets(updatedTagsets);
  };
  
  const handleDeleteTagset = (id) => {
    const updatedTagsets = tagsets.filter(tagset => tagset.id !== id);
    setTagsets(updatedTagsets);
  };
  

  const handleCreateNestedTagset = (parentTagsetId) => {
    const newNestedTagsetId = uuidv4();
    const newNestedTagset = {
      id: newNestedTagsetId,
      name: 'Nested Tagset', // กำหนดชื่อ Tagset ของ Nested Tagset
      description: 'Description of Nested Tagset', // กำหนดคำอธิบายของ Nested Tagset
      label_parent: parentTagsetId, // กำหนด label_parent เป็น parentTagsetId
    };
    setTagsets([...tagsets, newNestedTagset]); // เพิ่ม Nested Tagset เข้าไปใน tagsets
    setNestedTagsets(prevState => ({
      ...prevState,
      [parentTagsetId]: [
        ...(prevState[parentTagsetId] || []),
        newNestedTagset
      ]
    }));
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
          <Col className="header-column">Total tagset: {tagsets.length}</Col>
        </Row>
        <div>
          <Button className='tagset-create-button' variant="primary" onClick={() => setShowCreateModal(true)}>
            <BsPlus/>
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
          {/* ส่งฟังก์ชันไปยัง Tagset Accordions */}
          {rootTagsets.map((tagset) => (
            <TagsetAccordion
              key={tagset.id}
              id={tagset.id}
              name={tagset.name}
              description={tagset.description}
              onUpdate={handleUpdateTagset}
              onDelete={handleDeleteTagset} // ส่ง handleDeleteTagset ไปยัง TagsetAccordion
              onCreateNestedTagset={() => handleCreateNestedTagset(tagset.id)}
              nestedTagsets={nestedTagsets[tagset.id] || []}
            />
          ))}
        </div>
      </Container>
    </SideBar>
  );  
}

export default TagsetPage;