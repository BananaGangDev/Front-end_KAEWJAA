// import React, { useState } from 'react';

// function FileUploadComponent() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     // ตรงนี้จะเป็นโค้ดสำหรับอัพโหลดไฟล์
//   };

//   return (
//     <div className='FileCom'>
//         <h2 className='h2File'>Upload Your File</h2>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Submit</button>
//     </div>
//   );
// }

// export default FileUploadComponent;

import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
import '/src/styles/FileComponent.css';
// import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

function FileUploadComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const onDrop = (acceptedFiles) => {
  //   setFile(acceptedFiles[0]);
  // };

  // // ใช้ useDropzone hook จาก react-dropzone
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  const handleUpload = () => {
    // Logic for uploading file goes here
  };

  return (
    <div className='FileCom'>
      <h2 className='h2File'>Upload your file</h2>
      <div className='file-upload-container'>
        <div className='drop-container'>
        {/* {...getRootProps()}  */}
          {/* <input {...getInputProps()} id="file-upload" /> */}
          <label htmlFor="file-upload" className='file-drag-drop'>
            {/* <FolderSpecialIcon className='fileIcon'/> */}
            {file ? file.name : 'Drop your file here or Browse'}
          </label>
        </div>
        <div className='choose-container'>
          <input 
            type="file" 
            id="file-upload" 
            onChange={handleFileChange} 
            // hidden
            ></input>
        </div>
        <button onClick={handleUpload} className='submit-button'>
          Submit
        </button>
      </div>
    </div>
  );
}

export default FileUploadComponent;