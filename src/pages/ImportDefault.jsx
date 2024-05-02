import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className='ImportFilePage'>
        {/* <ArrowBackIcon className='import-back-icon' onClick={handleBackClick} /> */}
        <div className="import- header">
          <Link to="/document">
            <ArrowBackIcon id="backArrow" />
          </Link>
          <div className="headerContext">Import File</div>
        </div>
        <hr id="line" />
        <div className='ButtonFrame'>
          {/* <button className={`FileMode ${uploadType === 'file' ? 'active' : ''}`} onClick={() => setUploadType('file')}>File</button>
          <button className={`LinkMode ${uploadType === 'link' ? 'active' : ''}`} onClick={() => setUploadType('link')}>Link</button> */}
        </div>
        {uploadType === 'file' ? <FileUploadComponent /> : <LinkUploadComponent />}
      </div>
  );
}

export default ImportFilePage;
