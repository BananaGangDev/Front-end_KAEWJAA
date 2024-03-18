import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';


function CreateModal({ show, setShowCreateModal, handleCreate }) {
  const [fileName, setFileName] = useState('');

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleCreateClick = () => {
    if (fileName.trim() === '') {
      alert('Please enter a file name.');
    } else {
      handleCreate(fileName, 'Description goes here', type); // ส่งพารามิเตอร์ type ไปยัง handleCreate
      setShowCreateModal(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShowCreateModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New {type === 'file' ? 'File' : 'Folder'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Name"
            value={fileName}
            onChange={handleFileNameChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl placeholder="Description" as="textarea" rows={3} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCreateClick}>
          Create
        </Button>
        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;


// import React, { useState } from 'react';
// import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

// function CreateModal({ show, setShowCreateModal, handleCreate }) {
//   const [fileName, setFileName] = useState('');

//   const handleFileNameChange = (e) => {
//     setFileName(e.target.value);
//   };

//   const handleCreateClick = () => {
//     if (fileName.trim() === '') {
//       alert('Please enter a file name.');
//     } else {
//       handleCreate(fileName, 'Description goes here', type); // ส่งพารามิเตอร์ type ไปยัง handleCreate
//       setShowCreateModal(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={() => setShowCreateModal(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>Create New {type === 'file' ? 'File' : 'Folder'}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <InputGroup className="mb-3">
//           <FormControl
//             placeholder="Name"
//             value={fileName}
//             onChange={handleFileNameChange}
//           />
//         </InputGroup>
//         <InputGroup className="mb-3">
//           <FormControl placeholder="Description" as="textarea" rows={3} />
//         </InputGroup>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="primary" onClick={handleCreateClick}>
//           Create
//         </Button>
//         <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
//           Cancel
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default CreateModal;

// import React, { useState } from 'react';
// import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

// function CreateModal({ show, setShowCreateModal, handleCreate }) {
//   const [fileName, setFileName] = useState('');

//   const handleFileNameChange = (e) => {
//     setFileName(e.target.value);
//   };

//   const handleCreateClick = () => {
//     if (fileName.trim() === '') {
//       alert('Please enter a file name.');
//     } else {
//       handleCreate(fileName.trim(), 'Description goes here'); // ให้ใส่ fileName.trim() แทน fileName เพื่อลบช่องว่างด้านหน้าและด้านหลังของชื่อไฟล์ (ถ้ามี)
//       setShowCreateModal(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={() => setShowCreateModal(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>Create New {show ? 'File' : 'Folder'}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <InputGroup className="mb-3">
//           <FormControl
//             placeholder="Name"
//             value={fileName}
//             onChange={handleFileNameChange}
//           />
//         </InputGroup>
//         <InputGroup className="mb-3">
//           <FormControl placeholder="Description" as="textarea" rows={3} />
//         </InputGroup>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="primary" onClick={handleCreateClick}>
//           Create
//         </Button>
//         <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
//           Cancel
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default CreateModal;
