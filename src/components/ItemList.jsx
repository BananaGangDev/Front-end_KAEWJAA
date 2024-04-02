// import React from 'react';
// import { Col, Button } from 'react-bootstrap';
// import { BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';

// function ItemList({
//   items,
//   setSelectedItem,
//   setShowEditModal,
//   setShowDeleteModal,
// }) {
//   return (
//     <div className="item-list">
//       {items.map((item) => (
//         <Col key={item.id} className="item">
//           <div className="item-icon">
//               {/* <img src={src} alt="FileIcon" /> */}
//             {item.type === 'file' ? <BsFileEarmarkText /> : <BsFolderPlus />}
//           </div>
//           <div className="item-details">
//             <div className="item-name">{item.name}</div>
//             <div className="item-date">{item.createdAt}</div>
//           </div>
//           <div className="item-actions">
//             <Button
//               variant="link"
//               onClick={() => {
//                 setSelectedItem(item);
//                 setShowEditModal(true);
//               }}
//             >
//               <BsPencil />
//             </Button>
//             <Button
//               variant="link"
//               onClick={() => {
//                 setSelectedItem(item);
//                 setShowDeleteModal(true);
//               }}
//             >
//               <BsTrash />
//             </Button>
//           </div>
//         </Col>
//       ))}
//     </div>
//   );
// }

// export default ItemList;


import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';


function ItemList({
  items,
  setSelectedItem,
  setShowEditModal,
  setShowDeleteModal,
}) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Col key={item.id} className="item">
          <div className="item-icon">
            {item.type === 'file' ? <BsFileEarmarkText /> : <BsFolderPlus />}
          </div>
          <div className="item-details">
            <div className="item-name">{item.name}</div>
            <div className="item-date">{item.createdAt}</div>
          </div>
          <div className="item-actions">
            <Button
              variant="link"
              onClick={() => {
                setSelectedItem(item);
                setShowEditModal(true);
              }}
            >
              <BsPencil />
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setSelectedItem(item);
                setShowDeleteModal(true);
              }}
            >
              <BsTrash />
            </Button>
          </div>
        </Col>
      ))}
    </div>
  );
}

export default ItemList;