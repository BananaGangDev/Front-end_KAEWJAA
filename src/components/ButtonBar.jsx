import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

function ButtonBar({ setShowImportModal, setShowCreateModal }) {
  return (
    <div className="button-bar">
      <Button className="corpus-button">Corpus</Button>
      <Button
        className="concordancer-button"
        onClick={() => setShowImportModal(true)}
      >
        Concordancer
      </Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" className="sort-button" id="sort-dropdown">
          Sort by
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Date</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Name</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button
        className="new-button"
        onClick={() => setShowCreateModal(true)}
      >
        <BsPlus />
      </Button>
    </div>
  );
}

export default ButtonBar;



// import React from 'react';
// import { Button, Dropdown } from 'react-bootstrap';
// import { BsPlus } from 'react-icons/bs';

// function ButtonBar({ setShowImportModal, setShowCreateModal }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleCreateClick = (type) => {
//     setShowCreateModal(true, type); // เรียกใช้ setShowCreateModal พร้อมกับส่ง type ของไฟล์หรือโฟลเดอร์
//     setIsDropdownOpen(false); // ปิด dropdown เมื่อคลิกสร้างไฟล์หรือโฟลเดอร์
//   };

//   return (
//     <div className="button-bar">
//       <Button className="corpus-button">Corpus</Button>
//       <Button
//         className="concordancer-button"
//         onClick={() => setShowImportModal(true)}
//       >
//         Concordancer
//       </Button>
//       <Dropdown
//         show={isDropdownOpen}
//         onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
//       >
//         <Dropdown.Toggle variant="success" className="sort-button" id="sort-dropdown">
//           Sort by
//         </Dropdown.Toggle>
//         <Dropdown.Menu>
//           <Dropdown.Item href="#/action-1" onClick={() => handleCreateClick('file')}>Create File</Dropdown.Item>
//           <Dropdown.Item href="#/action-2" onClick={() => handleCreateClick('folder')}>Create Folder</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//       <Button
//         className="new-button"
//         onClick={() => setShowCreateModal(true, 'file')}
//       >
//         <BsPlus />
//       </Button>
//     </div>
//   );
// }

// export default ButtonBar;