import React from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

function EditModal({
  show,
  setShowEditModal,
  selectedItem,
  handleEdit,
}) {
  return (
    <Modal show={show} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
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
  );
}

export default EditModal;


// import React from 'react';
// import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

// function EditModal({ showEditModal, setShowEditModal, selectedItem, handleEdit }) {
//   return (
//     <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>Edit {selectedItem.type === 'file' ? 'File' : 'Folder'}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <InputGroup className="mb-3">
//           <FormControl
//             placeholder="Name"
//             defaultValue={selectedItem.name}
//             onChange={(e) => (selectedItem.name = e.target.value)}
//           />
//         </InputGroup>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={() => handleEdit(selectedItem.name)}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default EditModal;
