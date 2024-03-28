import { useState } from 'react';
import '/src/styles/ErrorTag.css';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TextEditor() {
  const [text, setText] = useState('');
  const [correction, setCorrection] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCorrectionChange = (e) => {
    setCorrection(e.target.value);
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log('Text to submit:', text);
    console.log('Correction:', correction);
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Text saved:', text);
  };

  const handleExport = () => {
    // Implement export logic here
    console.log('Text exported:', text);
  };

  const handleRemove = () => {
    setCorrection('');
    // Additional remove logic if needed
  };

  return (
    <div className="text-editor">
      <div className='errortag-header'>
        <ArrowBackIcon className='errortag-backicon' />
        <div className='errortag-filename'>file name</div>
      </div>
      <div className='main-bar'>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleExport}>Export</button>
        {/* <button>Saved</button> */}
      </div>
      <div className='errortag-container'>
        <input
          className='errortag-text'
          type='text'
          value={text}
          onChange={handleTextChange}
          placeholder="Text will be there"
        />
        <div className="errortag-tagset">Tagset components</div>
      </div>
      <div className='errortag-footer'>
        <input
          className='correction'
          type='text'
          value={correction}
          onChange={handleCorrectionChange}
          placeholder="Correction"
        />
        <div className='footer-bar'>
          <button className='errortag-submit-btn' onClick={handleSubmit}>Submit</button>
          <button className='errortag-remove-btn' onClick={handleRemove}>Remove</button>
        </div>
        {/* <span>{correction.length}/100</span> */}
      </div>
    </div>
  );
}

export default TextEditor;