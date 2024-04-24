import { useState } from 'react';
import CreateTagsetModal from '../components/CreateTagsetModal';
import TagsetAccordion from '../components/TagsetAccordion';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import '../styles/Page.css';
import '../styles/Tagset.css';
import '../styles/CreateModal.css';
import SideBar from "../components/SideBar";

function TagsetPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tagsets, setTagsets] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagDescription, setTagDescription] = useState('');
  const [nestedTagsetName, setNestedTagsetName] = useState('');
  const [nestedTagsetDescription, setNestedTagsetDescription] = useState('');


  const handleCreateClick = () => {
    if (tagName.trim() === '' || tagDescription.trim() === '') {
      alert('Please enter name and description.');
    } else {
      const newTagsetId = Math.random().toString(36).substring(7);

      const newTagset = {
        id: newTagsetId,
        name: tagName,
        description: tagDescription,
      };

      setTagsets([...tagsets, newTagset]);
      setShowCreateModal(false);
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
          {tagsets.map((tagset) => (
            <TagsetAccordion
              key={tagset.id}
              id={tagset.id}
              name={tagset.name}
              description={tagset.description}
              onUpdate={handleUpdateTagset}
              onDelete={handleDeleteTagset}
            />
          ))}
        </div>
      </Container>
    </SideBar>
  );
}

export default TagsetPage;