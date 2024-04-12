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
// import '../styles/Page.css';

// function ButtonBar() {
//   return (
//     <div className="button-bar">
//       <Button className="corpus-button">Corpus</Button>
//       <Button className="concordancer-button" href="/concordance">Concordancer</Button>
//       <Dropdown>
//         <Dropdown.Toggle className="sort-button" id="sort-dropdown">
//           Sort by
//         </Dropdown.Toggle>
//         <Dropdown.Menu>
//           <Dropdown.Item>Date</Dropdown.Item>
//           <Dropdown.Item>Name</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// }

// export default ButtonBar;
