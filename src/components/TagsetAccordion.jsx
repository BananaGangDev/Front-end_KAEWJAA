// import React, { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import EditIcon from '@mui/icons-material/Edit';
// import Card from '@mui/material/Card';

// function TagsetAccordion({ id, name, description, onUpdate }) {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editedName, setEditedName] = useState(name);
//   const [editedDescription, setEditedDescription] = useState(description);

//   const handleBookmarkClick = () => {
//     setIsBookmarked(!isBookmarked);
//   };

//   const handleEditClick = () => {
//     setEditedName(name);
//     setEditedDescription(description);
//     setShowEditModal(true);
//   };

//   const handleSaveEdit = () => {
//     // Perform update operation here with editedName and editedDescription
//     onUpdate(id, editedName, editedDescription);
//     setShowEditModal(false);
//   };

//   const handleCloseModal = () => {
//     setShowEditModal(false);
//   };

//   return (
//     <div>
//       <Card className='tagset-accordion' style={{ backgroundColor: "#E7E5FF", marginBottom: "15px"}}>
//         <AccordionSummary>
//           <div className='tagset-content'>{name}</div>
//           <div className='tagset-content'>{description}</div>
//           <div className='tagset-button'>
//             <BookmarkIcon
//               onClick={handleBookmarkClick}
//               style={{ color: isBookmarked ? '#FC5B5C' : 'inherit' }}
//             />
//             <EditIcon onClick={handleEditClick} />
//           </div>
//         </AccordionSummary>
//       </Card>

//       {/* Edit Modal */}
//       <Modal className='create-modal' show={showEditModal} onHide={handleCloseModal}>
//         <Modal.Header>
//           <Modal.Title>Edit Tagset</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={editedName}
//                 onChange={(e) => setEditedName(e.target.value)}
//                 placeholder="Edit tagset name"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={editedDescription}
//                 onChange={(e) => setEditedDescription(e.target.value)}
//                 placeholder="Edit tagset description"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveEdit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default TagsetAccordion;

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AccordionSummary from '@mui/material/AccordionSummary';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';



function TagsetAccordion({ id, name, description, onUpdate, onDelete }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleEditClick = () => {
    setEditedName(name);
    setEditedDescription(description);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Perform update operation here with editedName and editedDescription
    onUpdate(id, editedName, editedDescription);
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Perform delete operation here
    onDelete(id);
    setShowDeleteModal(false);
  };  

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <Accordion
        className='tagset-accordion'
        style={{ backgroundColor: "#E7E5FF", marginBottom: "15px"}}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className='tagset-content'>{name}</div>
          <div className='tagset-content'>{description}</div>
          <div className='tagset-button'>
            <BookmarkIcon
              onClick={handleBookmarkClick}
              style={{ color: isBookmarked ? '#FC5B5C' : 'inherit' }}
            />
            <EditIcon onClick={handleEditClick} />
            <DeleteIcon onClick={handleDeleteClick} />
          </div>
        </AccordionSummary>
        <AccordionActions>
          <div className='tagset-child-button'>
            <CreateNewFolderIcon />
            <NoteAddIcon />
          </div>
        </AccordionActions>
      </Accordion>

      {/* Edit Modal */}
      <Modal className='create-modal' show={showEditModal} onHide={handleCloseModal}>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal className='create-modal' show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header>
          <Modal.Title>Delete Tagset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TagsetAccordion;