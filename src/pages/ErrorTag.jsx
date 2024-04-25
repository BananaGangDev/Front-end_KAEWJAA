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
  const [tags, setTags] = useState([]);
  const [selectedRange, setSelectedRange] = useState({ start: 0, end: 0 });
  const [logs, setLogs] = useState([]);
  const highlightColor = '#ffff00';

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
    if (selectedText && correction) {
      const newLogId = uuidv4();
      const newLog = {
        id: newLogId,
        text: selectedText,
        correction,
        isHighlighted: false,
      };
      setLogs([...logs, newLog]);
      setCorrection('');
      setSelectedText('');
      setSelectedRange({ start: 0, end: 0 });
      // Implement logic to store the log (e.g., send to server)
      console.log('Submitted log:', newLog);
    }
  };


  const handleRemove = () => {
    if (selectedText) {

      const selectedTextIds = logs.filter((log) => log.text === selectedText).map((log) => log.id);

      const updatedLogs = logs.filter((log) => !selectedTextIds.includes(log.id));
      console.log('Removing log entry with ID:', selectedTextIds);
      setLogs(updatedLogs);
      console.log(updatedLogs);
      // Remove log entries for the selected text
      // const updatedLogs = logs.filter((log) => {
      //   if (log.text === selectedText) {
      //     return false;
      //   }
      //   return true;
      // });
      // setLogs(updatedLogs);

      // Also remove the highlight for the selected text
      setLogs(logs.map((log) => (log.isHighlighted && log.text === selectedText ? { ...log, isHighlighted: false } : log)));

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

  // Fetch tagsets on component mount
  // useEffect(() => {
  //   const fetchTagsets = async () => {
  //     try {
  //       const response = await api.get(`/tagsets/labels?tagset_id=1`);
  //       if (response.status !== 200) {
  //         throw new Error(`API request failed with status ${response.status}`);
  //       }
  //       const tagset = response.data;
  //       const formattedData = JSON.stringify(tagset, null, 2);
  //       console.log('Fetched tagsets:', formattedData);
  //       // const data = await response.json();
  //       setTags(tagset);
  //     } catch (error) {
  //       console.error('Error fetching tagsets:', error);
  //     }
  //   };
  //   fetchTagsets();
  // }, []);
  useEffect(() => {
    const fetchTagsets = async () => {
      try {
        const response = await api.get(`/tagsets/labels?tagset_id=1`);
        if (response.status !== 200) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const tagset = response.data;
        console.log(tagset);

        const nestedTags = {}; // Map to store all tags with key as label_name and value as tag object including children
        tagset.forEach(tag => {
          nestedTags[tag.label_name] = { ...tag, children: [] };
        });

        // Link children with their respective parents
        tagset.forEach(tag => {
          if (tag.label_parent !== 'ROOT' && nestedTags[tag.label_parent]) {
            nestedTags[tag.label_parent].children.push(nestedTags[tag.label_name]);
          }
        });
        const rootTags = tagset.filter(tag => tag.label_parent === 'ROOT').map(tag => nestedTags[tag.label_name]);
        setTags(rootTags);

        console.log(rootTags);

        // create a nested structure
        // const processedTags = {};
        // tagset.forEach(tag => {
        //   if (tag.label_parent === 'ROOT') {
        //     processedTags[tag.label_name] = { ...tag, children: [] };
        //   } else {
        //     if (processedTags[tag.label_parent]) {
        //       processedTags[tag.label_parent].children.push({ ...tag, children: [] });
        //     } else {
        //       // handle case where the parent might not yet be in the processedTags map
        //       processedTags[tag.label_parent] = { children: [{ ...tag, children: [] }] };
        //     }
        //   }
        // });

        // console.log(processedTags);

        // setTags(processedTags);
      } catch (error) {
        console.error('Error fetching tagsets:', error);
      }
    };
    fetchTagsets();
  }, []);

  // Function to recursively render tagset hierarchy
  // const renderTags = (parentLabel, tags) => {
  //   if (!tags || tags.length === 0) {
  //     return null;
  //   }

  //   return (
  //     <ul key={parentLabel}>
  //       {tags.map((tag) => (
  //         <li className='tagset-li' key={tag.label_id}>
  //           {tag.label_name} - {tag.label_description}
  //           {renderTags(tag.label_name, tags.filter((t) => t.label_parent === tag.label_name))}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };
  const renderTags = (tagData) => {
    if (!tagData || tagData.children.length === 0) {
      // return null;
      return <li key={tagData.label_id}>{tagData.label_name} - {tagData.label_description}</li>
    }

    return (
      <ul>
        <li key={tagData.label_id}>
          {tagData.label_name} - {tagData.label_description}
          <ul>
            {tagData.children.map(child => renderTags(child))}
          </ul>
        </li>
      </ul>
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
            {/* <h3>Tagsets</h3>
            {tags.length > 0 ? (
              <ul>
                {tags.map((tag) => (
                  <li className='tagset-li' key={tag.label_id}>{`${tag.label_name} - ${tag.label_description}`}</li>
                ))}
              </ul>
            ) : (
              <p>No tagsets found.</p>
            )} */}
            {/* <h3>Tagsets</h3>
            {tags.length > 0 ? (
              renderTags('ROOT', Object.values(tags)) // Render top-level tags (ROOT children)
            ) : (
              <p>No tagsets found.</p>
            )} */}
            <h3>Tagsets</h3>
            {/* {Object.keys(tags).length > 0 ? (
              Object.values(tags).map(rootTag => renderTags(rootTag))
            ) : (
              <p>No tagsets found.</p>
            )} */}
            <ul>
              {tags.length > 0 ? (
                tags.map(rootTag => renderTags(rootTag))
              ) : (
                <p>No tagsets found.</p>
              )}
            </ul>
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