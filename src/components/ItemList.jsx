// import React from 'react';
// import { Col, Button } from 'react-bootstrap';
// import { BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';

// // const src = '../images/FolderIcon.png';

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

// Import your custom images at the top of the file
// import FileIcon from 'public/images/FileIcon.png';
// import FolderIcon from 'public/images/FolderIcon.png';

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



// import React from 'react';
// import { Col, Button } from 'react-bootstrap';

// // Import your custom images at the top of the file
// import FileIcon from 'public/images/FileIcon.png';
// import FolderIcon from 'public/images/FolderIcon.png';

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
//             {/* Use your custom images based on item.type */}
//             {item.type === 'file' ? (
//               <img src={FileIcon} alt="FileIcon" />
//             ) : (
//               <img src={FolderIcon} alt="FolderIcon" />
//             )}
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



// import React from 'react';
// import { Col, Button } from 'react-bootstrap';
// import { BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';

// function ItemList({
//   items,
//   setSelectedItem,
//   setShowEditModal,
//   setShowDeleteModal,
//   setShowCreateModal, // เพิ่ม setShowCreateModal
// }) {
//   return (
//     <div className="item-list">
//       {items.map((item) => (
//         <Col key={item.id} className="item">
//           <div className="item-icon">
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
//             <Button
//               variant="link"
//               onClick={() => {
//                 setSelectedItem(item);
//                 setShowCreateModal(true, 'file'); // ส่งพารามิเตอร์ type ไปยัง setShowCreateModal
//               }}
//             >
//               <BsPlus />
//             </Button>
//           </div>
//         </Col>
//       ))}
//     </div>
//   );
// }

// export default ItemList;
