import { useState } from 'react';
import api from '/src/api.jsx';
import '/src/styles/FileComponent.css';
// import { frameData } from 'framer-motion';

function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [textValue, setTextValue] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log("formData: ", formData);

      try {
        const response = await api.post(`/sys/upload`, formData);
        if (response.status === 200) {
          alert('File uploaded successfully!');
          console.log(response.data);
        } else {
          alert(response.data);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    } else if (textValue) {
      try {

        const file_name = `text_file_${Date.now()}`;
        const blob = new Blob([textValue], { type: 'text/plain' });
        const file = new File([blob], file_name, { type: 'text/plain' });

        const reader = new FileReader();
        reader.onload = function (e) {
          console.log(`Contents of the file (${file_name}):`, e.target.result);
        };
        reader.readAsText(file);        

        console.log("Text: ", textValue);

        const response = await api.post(`/sys/upload/text?text=${textValue}&file_name=${file_name}`, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert('Text uploaded successfully!');
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading text:', error);
        alert('Failed to upload text.');
      }
    }
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
        <div className='submit-button'>
          <button onClick={handleUpload}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadComponent;