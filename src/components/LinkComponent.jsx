import { useState } from 'react';
import api from '/src/api.jsx';
import '/src/styles/LinkComponent.css'

function LinkUploadComponent() {
  const [link, setLink] = useState('');

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const YOUR_SERVER_ENDPOINT = 'YOUR_BACKEND_ENDPOINT/upload-link';

      const response = await api.post(YOUR_SERVER_ENDPOINT, { link });

      alert('Link uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading link:', error);
      alert('Failed to upload link.');
    }
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