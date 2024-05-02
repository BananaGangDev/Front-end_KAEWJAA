import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import CreateTagsetModal from '../components/CreateTagsetModal';
import CreateRootTagsetModal from '../components/CreateRootTagsetModal';
import { BsPlus } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import { v4 as uuidv4 } from "uuid";
import api from "/src/api.jsx";
import "../styles/Page.css";
import "../styles/Tagset.css";
import "../styles/CreateModal.css";


import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

function TagsetPage({
  id,
  name,
  description,
  onUpdate,
  onDelete,
  onCreateNestedTagset,
}) {
  const [showCreateRootModal, setShowCreateRootModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [tagsets, setTagsets] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagset_id, setTagset_id] = useState('');
  const [totalTagsets, setTotalTagsets] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedTagsetId, setSelectedTagsetId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedLevel, setEditedLevel] = useState("");
  const [editedParent, setEditedParent] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagLevel, setTagLevel] = useState("");
  // const [tagParent, setTagParent] = useState('');
  const [tagParent_Name, setTagParent_Name] = useState('');
  const [tagDescription, setTagDescription] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();

  // const handleBookmarkClick = () => {
  //   setIsBookmarked(!isBookmarked);
  // };

  const handleShowCreateModal = (tagData) => {
    setShowCreateModal(true);
    const label_level = tagData.label_level;
    const label_parent_name = tagData.label_name;
    setTagLevel(label_level);
    setTagParent_Name(label_parent_name);
  };

  const handleEditModalShow = (tagData) => {
    setSelectedTagsetId(tagData.label_id);
    setEditedName(tagData.label_name);
    setEditedLevel(tagData.label_level);
    setEditedParent(tagData.label_parent);
    setEditedDescription(tagData.label_description);
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
      const tagset_id = searchParams.get('tagset_id');
      setTagset_id(tagset_id);
      // console.log(tagset_id);
      const response = await api.get(`/tagsets/labels?tagset_id=`+ tagset_id);
      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const tagset = response.data;
      const nestedTags = {};
      tagset.forEach((tag) => {
        nestedTags[tag.label_name] = { ...tag, children: [], isOpen: false };
      });

      tagset.forEach((tag) => {
        if (tag.label_parent !== "ROOT" && nestedTags[tag.label_parent]) {
          nestedTags[tag.label_parent].children.push(
            nestedTags[tag.label_name]
          );
        }
      });
      const rootTags = tagset
        .filter((tag) => tag.label_parent === "ROOT")
        .map((tag) => nestedTags[tag.label_name]);
      setTags(rootTags);
      setTotalTagsets(tagset.length);
    } catch (error) {
      console.error("Error fetching tagsets:", error);
    }
  };

  const toggleTag = (tag) => {
    // ตรวจสอบว่าคลิกเกิดขึ้นที่ไอคอน <ExpandMoreIcon /> เท่านั้น
    // if (!event.target.classList.contains('MuiSvgIcon-root')) {
    //   return;
    // }
  
    tag.isOpen = !tag.isOpen;
    setTags([...tags]);
  };

  const renderTags = (tagData) => {
    return (
      <div key={tagData.label_id}>
        <div className='label-button'
          
          style={{ backgroundColor: "#E7E5FF", marginBottom: "15px"}}>
          <div className='tagset-content'>
            <div>
            {tagData.children.length > 0 && <ExpandMoreIcon style={{cursor: "pointer"}} onClick={() => toggleTag(tagData)}/>} {tagData.label_name} - {tagData.label_description}
            </div>
            <div className='tagset-action-button'>
              <AddBoxOutlinedIcon onClick={() => handleShowCreateModal(tagData)}/>
              <EditOutlinedIcon onClick={() => handleEditModalShow(tagData)} />
              <DeleteOutlinedIcon
                onClick={() =>
                  handleDeleteModalShow(tagData.label_id, tagData.label_name)
                }
              />
            </div>
          </div>
        </div>
        {tagData.isOpen && tagData.children.length > 0 && (
          <div style={{ marginLeft: "40px" }}>
            {tagData.children.map((child) => renderTags(child))}
          </div>
        )}
      </div>

      // <div key={tagData.label_id}>
      //   <div className='label-button' style={{ backgroundColor: "#E7E5FF", marginBottom: "15px"}}>
      //     <div className='tagset-content'>
      //       <div>{tagData.children.length > 0 && <ExpandMoreIcon style={{cursor: "pointer"}} onClick={() => toggleTag(tagData)}/>} {tagData.label_name}</div>
      //       <div className='label-description'>{tagData.label_description}</div>
      //       <div className='tagset-action-button'>
      //         <AddBoxOutlinedIcon onClick={() => handleShowCreateModal(tagData)}/>
      //         <EditOutlinedIcon onClick={() => handleEditModalShow(tagData)} />
      //         <DeleteOutlinedIcon onClick={() => handleDeleteModalShow(tagData.label_id, tagData.label_name)} />
      //       </div>
      //     </div>
      //   </div>
      //   {tagData.isOpen && tagData.children.length > 0 && (
      //     <div style={{ marginLeft: '40px' }}>
      //       {tagData.children.map(child => renderTags(child))}
      //     </div>
      //   )}
      // </div>

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
    },
  });

  const createRootTagset = async (tagset_id, tagName, tagDescription) => {
    try {
      // console.log(tagset_id, tagName, tagDescription);
      const response = await api.post('/tagsets/labels/create', {
        label_name: tagName,
        label_description: tagDescription,
        label_level: 0,
        label_parent: 'ROOT',
        created_in_tagset: tagset_id,
        created_by: 1,
        created_date: new Date().toISOString().split("T")[0],
      });
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Tag label created successfully!"
        });
        fetchTagsets();
      } else {
        throw new Error(`Failed to create tag label: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error creating tagset:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to create tag label. Please try again later."
      });
    }
  };

  const createTagset = async (tagset_id, tagName, tagDescription, tagParent_Name, parentLabelLevel) => {
    try {
      const response = await api.post('/tagsets/labels/create', {
        label_name: tagName,
        label_description: tagDescription,
        label_level: parentLabelLevel + 1,
        label_parent: tagParent_Name,
        created_in_tagset: tagset_id,
        created_by: 1,
        created_date: new Date().toISOString().split("T")[0],
      });
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Tag label created successfully!"
        });
        fetchTagsets();
      } else {
        throw new Error(`Failed to create tagset: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating tag label:', error);
      Toast.fire({
        icon: "error",
        title: "Failed to create tag label. Please try again later."
      });
    }
  };

  const updateTagset = async (
    tagsetId,
    tagName,
    tagLevel,
    tagParent,
    tagDescription
  ) => {
    try {
      // console.log(tagsetId, tagName, tagLevel, tagParent, tagDescription);
      const response = await api.put("tagsets/labels/update", {
        label_id: tagsetId,
        label_name: tagName,
        label_level: tagLevel,
        label_parent: tagParent,
        label_description: tagDescription,
      });
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Tag label updated successfully!"
        });
        fetchTagsets();
      } else {
        throw new Error(`Failed to update tag label: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating tag label:', error);
      Toast.fire({
        icon: "error",
        title: "Failed to update tag label. Please try again later."
      });
    }
  };

  const deleteTagset = async (tagsetId) => {
    try {
      const response = await api.delete(
        `/tagsets/labels/delete?label_id=${tagsetId}`
      );
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Tag label deleted successfully!"
        });
        fetchTagsets();
      } else {
        throw new Error(`Failed to delete tag label: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting tag label:', error);
      Toast.fire({
        icon: "error",
        title: "Failed to delete tag label. Please try again later."
      });
    }
  };

  const handleCreateRootClick = async (parentTagsetData) => {
    if (
      typeof tagName === "string" &&
      tagName.trim() !== "" &&
      typeof tagDescription === "string" &&
      tagDescription.trim() !== ""
    ) {
      try {
        const parentLabelLevel = parentTagsetData.label_level;
        const parentTagsetId = parentTagsetData.label_id;
        await createRootTagset(tagset_id, tagName.trim(), tagDescription.trim(), parentTagsetId, parentLabelLevel);
      } catch (error) {
        console.error('Error creating tag label:', error);
      }
      setShowCreateRootModal(false);
      setTagName("");
      setTagDescription("");
    } else {
      alert('Please enter valid label name and description.');
    }
  };

  const handleCreateClick = async (parentTagsetData) => {
    if (!parentTagsetData) {
      alert('Please select a parent label.');
      return;
    }

    if (
      typeof tagName === "string" &&
      tagName.trim() !== "" &&
      typeof tagDescription === "string" &&
      tagDescription.trim() !== ""
    ) {
      try {
        await createTagset(tagset_id, tagName.trim(), tagDescription.trim(), tagParent_Name, tagLevel);
      } catch (error) {
        console.error('Error creating tag label:', error);
      }
      setShowCreateModal(false);
      setTagName("");
      setTagLevel("");
      setEditedParent("");
      setTagDescription("");
    } else {
      alert('Please enter valid label name and label description.');
    }
  };

  const handleEditConfirm = async () => {
    try {
      await updateTagset(
        selectedTagsetId,
        editedName,
        editedLevel,
        editedParent,
        editedDescription
      );
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating tag label:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTagset(selectedTagsetId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting tag label:', error);
    }
  };

  return (
    <SideBar>
      <Container className="tagsetpage">
        <Row>
          <Col>
            <div className="header">
              <div className="headerContext">Tagset</div>
            </div>
            <hr id="line" />
            <div>
              <Button
                className="tagset-create-button"
                variant="primary"
                onClick={() => setShowCreateRootModal(true)}
              >
                <BsPlus />
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="tagset-header">
          <Col className="header-column">Name</Col>
          <Col className="header-column-description">Description</Col>
          <Col className="header-column">Total Tag Label: {totalTagsets}</Col>
        </Row>
        {/* <div>
          <Button className='tagset-create-button' variant="primary" onClick={() => setShowCreateRootModal(true)}>
            <BsPlus />
          </Button>
        </div> */}
      </Container>
      <div className="tagset-accordion">
        {tags.length > 0 ? (
          tags.map((rootTag) => renderTags(rootTag))
        ) : (
          <p style={{ textAlign: "center" }}>No label found</p>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        className="create-modal"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Edit Tag Label</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Label Name</Form.Label>
              <Form.Control
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Edit Tag Label"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Label Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Edit Label Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='tagset-cancel' variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button className='tagset-confirm' variant="primary" onClick={handleEditConfirm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        className="create-modal"
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Delete Tag Label</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button className='tagset-cancel' variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button className='tagset-confirm' variant="danger" onClick={handleDeleteConfirm}>
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

      <CreateRootTagsetModal
        show={showCreateRootModal}
        setShowCreateRootModal={setShowCreateRootModal}
        onCreateTagset={handleCreateRootClick}
        tagName={tagName}
        setTagName={setTagName}
        tagDescription={tagDescription}
        setTagDescription={setTagDescription}
      />
    </SideBar>
  );
}

export default TagsetPage;
