// import { useState, useRef, useEffect } from 'react';
// import '/src/styles/ErrorTag.css';
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { v4 as uuidv4 } from 'uuid';

// function TextEditor() {
//   const textAreaRef = useRef(null);
//   const [text, setText] = useState('Hello world, I am a student from Thammasat University');
//   const [correction, setCorrection] = useState('');
//   const [selectedText, setSelectedText] = useState('');
//   const [startSelection, setStartSelection] = useState(0);
//   const [endSelection, setEndSelection] = useState(0);
//   const [tags, setTags] = useState([]);
//   const highlightColor = '#ffff00';

//   // const textInputRef = useRef(null); // Reference to the text input element

//   // const handleTextChange = (e) => {
//   //   setText(e.target.value);
//   // };
//   const handleMouseDown = () => {
//     if (!textAreaRef.current) return;
//     setStartSelection(textAreaRef.current.selectionStart);
//   };

//   const handleMouseUp = () => {
//     if (!textAreaRef.current) return;
//     setEndSelection(textAreaRef.current.selectionEnd);
//     const selected = text.slice(startSelection, textAreaRef.current.selectionEnd);
//     setSelectedText(selected);
//   };

//   const handleSelectionChange = (e) => {
//     const selectedText = textAreaRef.current.value.slice(textAreaRef.current.selectionStart, textAreaRef.current.selectionEnd);
//     setSelectedText(selectedText);
//   };

//   const handleCorrectionChange = (e) => {
//     setCorrection(e.target.value);
//   };

//   const handleSubmit = () => {
//     // console.log('Text to submit:', text);
//     // console.log('Correction:', correction);
//     // console.log('Selected Text:', selectedText);
//     // // Add the tag to the state
//     // setTags([...tags, { text: selectedText, correction }]);
//     if (selectedText) {
//       const newTag = { id: uuidv4(), text: selectedText, correction };
//       setTags(prevTags => [...prevTags, newTag]);
//       setCorrection('');
//       setSelectedText('');
//     }
//   };

//   const handleSave = () => {
//     if (text.length > 0) {

//       const savedText = text;
//       console.log('Saved text:', savedText);
  
//       if (tags.length > 0) {
//         const savedTags = tags;
//         console.log('Saved tags:', savedTags);
//       }
  
//       alert('Text saved successfully!');
//     } else {
//       alert('No text to save!');
//     }
//   };

//   const handleExport = () => {
//     if (text.length > 0) {

//       const exportedText = text;
//       console.log('Exported text:', exportedText);
  
//       // แปลงแท็ก (ถ้ามี) เป็นรูปแบบที่ต้องการ
//       if (tags.length > 0) {
//         const exportedTags = tags;
//         console.log('Exported tags:', exportedTags);
//       }
  
//       alert('Text exported successfully! Please download the file.');
//     } else {
//       alert('No text to export!');
//     }
//   };

//   // const logTag = (selectedText, correction) => {
//   //   const timestamp = new Date().toISOString();
//   //   setTagHistory([...tagHistory, {
//   //     selectedText,
//   //     correction,
//   //     timestamp,
//   //   }]);
//   // };

//   const handleRemoveTag = (tagId) => {
//     // setCorrection('');
//     // Additional remove logic if needed
//     setTags(tags.filter(tag => tag.id !== tagId));
//   };

//   const displayHighlightedText = (text, selectedText) => {
//     const parts = text.split(new RegExp(`(${selectedText})`, 'gi'));
//     return parts.map((part, i) =>
//       part.toLowerCase() === selectedText.toLowerCase() ? (
//         <span key={i} style={{ backgroundColor: highlightColor }}>{part}</span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <div className="text-editor">
//       <div className='errortag-header'>
//         <ArrowBackIcon className='errortag-backicon' />
//         <div className='errortag-filename'>file name</div>
//       </div>
//       <div className='main-bar'>
//         <button onClick={handleSave}>Save</button>
//         <button onClick={handleExport}>Export</button>
//         {/* <button>Saved</button> */}
//       </div>
//       <div className='errortag-container'>
//         <textarea
//             className='errortag-text'
//             value={text}
//             readOnly
//             placeholder="Text will be there"
//             ref={textAreaRef}
//             onMouseDown={handleMouseDown}
//             onChange={handleSelectionChange}
//           />
//         <div className="errortag-tagset">Tagset components</div>
//       </div>
//       <div className='errortag-footer'>
//         <input
//           className='correction'
//           type='text'
//           value={correction}
//           onChange={handleCorrectionChange}
//           placeholder="Correction"
//         />
//         <div className='footer-bar'>
//           <button className='errortag-submit-btn' onClick={handleSubmit}>Submit</button>
//           <button className='errortag-remove-btn' onClick={handleRemoveTag}>Remove</button>
//         </div>
//         {/* <span>{correction.length}/100</span> */}
//       </div>
//       {/* {selectedText && ( // Render highlight only if text is selected
//         <span className="text-highlight" style={{ backgroundColor: '#ffff00' }}>
//           {selectedText}
//         </span>
//       )}

//       {tags.length > 0 && ( // Render tags if there are any
//         <div className="errortag-tags">
//           {tags.map((tag) => (
//             <div
//               key={tag.id}
//               className="errortag-tag"
//             >
//               {tag.text}
//               <button onClick={() => handleRemoveTag(tag.id)}>x</button>
//             </div>
//           ))}
//         </div>
//       )} */}
//     </div>
//   );
// }

// export default TextEditor;

import { useState, useRef } from 'react';
import '/src/styles/ErrorTag.css';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as uuidv4 } from 'uuid';

function TextEditor() {
  const [text, setText] = useState('Hello world, I are a student from Thammasat University');
  const [correction, setCorrection] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [highlightRange, setHighlightRange] = useState(null);
  const [tags, setTags] = useState([]);
  const editorRef = useRef(null);
  const highlightColor = '#ffff00';

  const handleSelectText = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const start = range.startOffset;
      const end = range.endOffset;
      if (start !== end) { // Make sure there's a selection
        setSelectedText(selection.toString());
        setHighlightRange({ start, end });
      }
    }
  };

  const handleCorrectionChange = (e) => {
    setCorrection(e.target.value);
  };

  const handleSubmit = () => {
    // if (selectedText) {
    //   const newTag = { id: uuidv4(), text: selectedText, correction };
    //   setTags([...tags, newTag]);
    //   setCorrection('');
    //   setSelectedText('');
    // }
    alert("Successfully edited");
  };

  const displayHighlightedText = () => {
    if (!highlightRange) return text;
    const { start, end } = highlightRange;
    return (
      <>
        {text.substring(0, start)}
        <span style={{ backgroundColor: highlightColor }}>
          {text.substring(start, end)}
        </span>
        {text.substring(end)}
      </>
    );
  };

  return (
    <div className="text-editor">
      <div className='errortag-header'>
        <ArrowBackIcon className='errortag-backicon' />
        <div className='errortag-filename'>file110424</div>
      </div>
      <div className='main-bar'>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={handleSubmit}>Export</button>
      </div>
      <div className='errortag-container'>
        <div
          ref={editorRef}
          contentEditable
          className='errortag-text'
          onMouseUp={handleSelectText}
          style={{ height: '300px', width: '100%', border: '1px solid black', padding: '10px', overflowY: 'auto' }}
        >
          {displayHighlightedText()}
        </div>
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
          <button className='errortag-remove-btn' onClick={handleSubmit}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
