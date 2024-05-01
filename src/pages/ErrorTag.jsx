import React, { useState, useEffect } from 'react';
// import ArrowBackIcon from "@mui/icons-material/ArrowBackIcon";
import { v4 as uuidv4 } from 'uuid';
import SideBar from '../components/SideBar';
import api from '/src/api.jsx';
import '/src/styles/ErrorTag.css';

function TextEditor() {
  const [text, setText] = useState('I am a student from Thammasat University');
  const [correction, setCorrection] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); // For storing the selected tag
  const [tags, setTags] = useState([]);
  const [selectedRange, setSelectedRange] = useState({ start: 0, end: 0 });
  const [logs, setLogs] = useState([]);
  // const highlightColor = '#ffff00';

  const handleSelectText = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const start = range.startOffset;
      const end = range.endOffset;
      if (start !== end) {
        setSelectedText(selection.toString());
        setSelectedRange({ start, end });
      } else {
        setSelectedText('');
        setSelectedRange({ start: 0, end: 0 });
      }
    }
  };

  const handleCorrectionChange = (e) => {
    setCorrection(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedText && selectedTag && correction) {
      const newLogId = uuidv4();
      const newLog = {
        id: newLogId,
        text: selectedText,
        correction,
        tag: selectedTag,
        // isHighlighted: false,
      };
      setLogs([...logs, newLog]);
      setCorrection('');
      setSelectedText('');
      setSelectedRange({ start: 0, end: 0 });
      setSelectedTag('');
      // Implement logic to store the log (e.g., send to server)
      console.log('Submitted log:', newLog);

      const updatedText = updateTextWithTag(text, selectedRange, selectedTag, correction);
      setText(updatedText);
    }
  };


  const handleRemove = () => {
    if (selectedText) {

      const updatedText = removeTagFromText(text, selectedRange);
      setText(updatedText);

      console.log(updatedText);

      setSelectedText('');
      setSelectedRange({ start: 0, end: 0 });
    }
  };


  const handleSave = () => {
    // Implement logic to save the logs
    console.log('Saving logs...');
    localStorage.setItem('errorTagLogs', JSON.stringify(logs));
    alert('Logs saved successfully!');
  };

  useEffect(() => {
    const fetchTagsets = async () => {
      try {
        const response = await api.get(`/tagsets/labels?tagset_id=1`);
        if (response.status !== 200) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const tagset = response.data;
        console.log(tagset);

        const nestedTags = {}; 
        tagset.forEach(tag => {
          nestedTags[tag.label_name] = { ...tag, children: [], isOpen: false };
        });

        tagset.forEach(tag => {
          if (tag.label_parent !== 'ROOT' && nestedTags[tag.label_parent]) {
            nestedTags[tag.label_parent].children.push(nestedTags[tag.label_name]);
          }
        });
        const rootTags = tagset.filter(tag => tag.label_parent === 'ROOT').map(tag => nestedTags[tag.label_name]);
        setTags(rootTags);

        console.log(rootTags);

      } catch (error) {
        console.error('Error fetching tagsets:', error);
      }
    };
    fetchTagsets();
  }, []);

  const toggleTag = (tag) => {
    tag.isOpen = !tag.isOpen;
    setTags([...tags]);
  }

  const renderTags = (tagData) => {
    return (
      <div key={tagData.label_id}>
        <button className='toggle-click' onClick={() => toggleTag(tagData)}>
          {tagData.label_name} - {tagData.label_description}
        </button>
        {tagData.isOpen && tagData.children.length > 0 && (
          <div style={{ marginLeft: '40px' }}>
            {tagData.children.map(child => renderTags(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <SideBar>
      <div className="text-editor">
        <div className='errortag-header'>
          {/* <ArrowBackIcon className='errortag-backicon' /> */}
          <div className='errortag-filename'>file110424</div>
        </div>
        <div className='main-bar'>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleSave}>Save</button>
        </div>
        <div className='errortag-container'>
          <div
            className='errortag-text'
            onMouseUp={handleSelectText}
          // dangerouslySetInnerHTML={{ __html: text }}
          >
            {selectedRange.start > 0 && selectedRange.end > 0 && (
              <>
                {text.slice(0, selectedRange.start)}
                <span style={{ backgroundColor: highlightColor }}>
                  {text.slice(selectedRange.start, selectedRange.end)}
                </span>
                {text.slice(selectedRange.end)}
              </>
            )}
            {text}
          </div>
          <div className="errortag-tagset">
            <h3>Tagsets</h3>
              {tags.length > 0 ? (
                tags.map(rootTag => renderTags(rootTag))
              ) : (
                <p>No tagsets found.</p>
              )}
          </div>
          <div className='errortag-footer'>
            <input
              className='correction'
              type='text'
              value={correction}
              onChange={handleCorrectionChange}
              placeholder="Enter correction"
            />
            <div className='footer-bar'>
              <button className='errortag-submit-btn' onClick={handleSubmit}>Submit</button>
              <button className='errortag-remove-btn' onClick={handleRemove}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </SideBar >
  );
}

export default TextEditor;