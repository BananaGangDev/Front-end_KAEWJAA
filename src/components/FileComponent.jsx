import { useState } from 'react';
import '/src/styles/FileComponent.css';

function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [textValue, setTextValue] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };
  
  const handleUpload = () => {
    // Logic for uploading file and text value goes here
  };

  return (
    <div className='FileCom'>
      <h2 className='h2File'>Upload your file</h2>
      <div className='file-upload-container'>
        <div className='drop-container'>
          <label htmlFor="file-upload" className='file-drag-drop'>
            {file ? file.name : 'Choose file'}
          </label>
        </div>
        <div className='choose-container'>
          <input 
            type="file" 
            id="file-upload" 
            onChange={handleFileChange} 
          />
        </div>
        <h2>OR</h2>
        <div className='file-text-container'>
          <input 
            type="text" 
            value={textValue} 
            onChange={handleTextChange} 
            placeholder="Enter text here" 
          />
        </div>
        <button onClick={handleUpload} className='submit-button'>
          Submit
        </button>
      </div>
    </div>
  );
}

export default FileUploadComponent;