import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploadComponent from '/src/components/FileComponent.jsx';
import LinkUploadComponent from '/src/components/LinkComponent.jsx';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import '/src/styles/ImportDefualt.css';
import SideBar from "/src/components/SideBar.jsx";

function ImportFilePage() {
  const [uploadType, setUploadType] = useState('file'); // file หรือ link
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/document');
  };

  return (
    <SideBar>
      <div className='ImportFilePage'>
        <div className='import-header'>
          {/* <ArrowBackIcon className='import-back-icon' onClick={handleBackClick} /> */}
          <div className='h1-class'>
            <h1>Import File</h1>
          </div>
          <div className='ButtonFrame'>
            {/* <button className={`FileMode ${uploadType === 'file' ? 'active' : ''}`} onClick={() => setUploadType('file')}>File</button>
          <button className={`LinkMode ${uploadType === 'link' ? 'active' : ''}`} onClick={() => setUploadType('link')}>Link</button> */}
          </div>
          {uploadType === 'file' ? <FileUploadComponent /> : <LinkUploadComponent />}
        </div>
      </div>
    </SideBar>
  );
}

export default ImportFilePage;
