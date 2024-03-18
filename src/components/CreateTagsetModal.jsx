import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateTagsetModal({ show, setShowCreateModal }) {
  const [tagName, setTagName] = useState('');
  const [tagDescription, setTagDescription] = useState('');

  const handleCreateClick = () => {
    // ตรวจสอบว่าชื่อ Tagset และคำอธิบายไม่เป็นค่าว่าง
    if (tagName.trim() === '' || tagDescription.trim() === '') {
      alert('Please enter name and description.');
    } else {

      const newTagsetId = Math.random().toString(36).substring(7); // สร้าง id สุ่ม

      setNewTagset({
        id: newTagsetId,
        name: tagName,
        description: tagDescription,
      });

      // นำข้อมูลไปสร้าง Tagset จริง ๆ แล้วบันทึกข้อมูลลงในระบบ
      console.log('Creating tagset with name:', tagName, 'and description:', tagDescription);
      // ปิดโมดอล
      setShowCreateModal(false);

      
      // ส่วนที่เหลือคือการสร้าง Tagset จริง ๆ แล้วบันทึกข้อมูลลงในระบบ

      // ตัวอย่าง: 
      // 
      // const response = await fetch('/api/tagsets', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: tagName,
      //     description: tagDescription,
      //   }),
      // });

      // if (response.ok) {
      //   // แสดงข้อความ success
      // } else {
      //   // แสดงข้อความ error
      // }
    }
  };

  return (
    <Modal show={show} onHide={() => setShowCreateModal(false)}>
      <Modal.Header closeButton>
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
        <Button variant="primary" onClick={handleCreateClick}>Create</Button>
        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTagsetModal;
