import { useState } from 'react';
import FileUploadComponent from '/src/components/FileComponent.jsx';
import LinkUploadComponent from '/src/components/LinkComponent.jsx';
import '/src/styles/ImportDefualt.css'

function ImportFilePage() {
  const [uploadType, setUploadType] = useState('file'); // file หรือ link

  return (
    <div className='ImportFilePage'>
       <div>
        <div className='h1-class'>
          <h1>Import File</h1>
        </div>
        <div className='ButtonFrame'>
          <button className={`FileMode ${uploadType === 'file' ? 'active' : ''}`} onClick={() => setUploadType('file')}>File</button>
          <button className={`LinkMode ${uploadType === 'link' ? 'active' : ''}`} onClick={() => setUploadType('link')}>Link</button>
        </div>
        {uploadType === 'file' ? <FileUploadComponent /> : <LinkUploadComponent />}
      </div>
    </div>
  );
}

export default ImportFilePage;