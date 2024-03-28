import { useState } from 'react';
// import axios from 'axios'
import '/src/styles/LinkComponent.css'

// function LinkUploadComponent() {
//   const [link, setLink] = useState('');

//   const handleLinkChange = (e) => {
//     setLink(e.target.value);
//   };

//   const handleUpload = () => {
//     // ตรงนี้จะเป็นโค้ดสำหรับการประมวลผล
//   };

//   return (
//     <div className='LinkCom'>
//         <h2 className='h2Link'>Embed link</h2>
//         <input type="text"  value={link} onChange={handleLinkChange} placeholder="Paste your link here" />
//         <button onClick={handleUpload}>Submit</button>
//     </div>
//   );
// }

// export default LinkUploadComponent;

function LinkUploadComponent() {
  const [link, setLink] = useState('');

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleUpload = async () => {
  //   try {
  //     // ที่อยู่ของ server endpoint ที่คุณต้องการส่งข้อมูลไป
  //     const YOUR_SERVER_ENDPOINT = 'https://example.com/upload-link';

  //     // ส่งข้อมูล link ไปยัง server
  //     const response = await axios.post(YOUR_SERVER_ENDPOINT, { link });

  //     // โค้ดที่นี่จะทำงานเมื่อการส่งข้อมูลสำเร็จ
  //     console.log('Response:', response.data);
  //     alert('Link uploaded successfully!');

  //   } catch (error) {
  //     // จัดการกับข้อผิดพลาดที่อาจเกิดขึ้น
  //     console.error('Error uploading link:', error);
  //     alert('Failed to upload link.');
  //   }
  };

  return (
    <div className='LinkCom'>
      <div className='link-header-text'>
        <h2 className='h2Link'>Embed link</h2>
      </div>
      <div className='link-input'>
        <input type="text" value={link} onChange={handleLinkChange} placeholder="Paste your link here" />
      </div>
      <div className='link-submit'>
        <button onClick={handleUpload}>Submit</button>
      </div>
    </div>
  );
}

export default LinkUploadComponent;