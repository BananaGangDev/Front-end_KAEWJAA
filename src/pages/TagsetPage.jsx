import React, { useState, useEffect } from 'react';
import CreateTagsetModal from '../components/CreateTagsetModal';
import TagsetAccordion from '../components/TagsetAccordion';
import { Container, Row, Col, Button, Dropdown, FormControl, InputGroup, Modal, Form } from 'react-bootstrap';
import { BsPlus, BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';
import '../styles/Page.css';

function TagsetPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tagsets, setTagsets] = useState([]); // เก็บข้อมูล Tagsets ทั้งหมด
  const [newTagset, setNewTagset] = useState(null); // เก็บ Tagset ใหม่ที่ถูกสร้าง

  const fetchTagsets = async () => {
    // ปรับแต่ง API call นี้ให้เหมาะกับระบบของคุณ
    const response = await fetch('https://documentation.softwareag.com/webmethods/compendiums/v10-11/C_API_Management/api-mgmt-comp/co-api_tagging.html');
    const data = await response.json();

    setTagsets(data);
  };

  useEffect(() => {
    fetchTagsets();
  }, []);

  useEffect(() => {
    if (newTagset && newTagset.id) {
      // เพิ่ม Tagset ใหม่เข้าไปใน array `tagsets`
      setTagsets([...tagsets, newTagset]);

      // Reset state `newTagset`
      setNewTagset(null);
    }
  }, [newTagset]);

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
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="tagset-title">Tagset</h1>
        </Col>
      </Row>
      <div>
        <Button className='tagset-create-button' variant="primary" onClick={() => setShowCreateModal(true)}>+</Button>
        <CreateTagsetModal
          show={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
        {/* แสดง Tagsets ทั้งหมด */}
        {tagsets.map((tagset) => (
          <TagsetAccordion key={tagset.id} name={tagset.name} description={tagset.description} />
        ))}
        {newTagset && newTagset.id && (
          <TagsetAccordion key={newTagset.id} name={newTagset.name} description={newTagset.description} />
        )}
      </div>
    </Container>
  );
}

export default TagsetPage;
