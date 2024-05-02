import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as uuidv4 } from 'uuid';
import SideBar from '../components/SideBar';
import api from '/src/api.jsx';
import '/src/styles/ErrorTag.css';

function TextEditor() {
  const [correction, setCorrection] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectedTag, setSelectedTag] = useState(''); // For storing the selected tag
  const [tags, setTags] = useState([]);
  const [tagsets, setTagsets] = useState([]); // Store all tagsets
  const [selectedRange, setSelectedRange] = useState({ start: 0, end: 0 });
  const [logs, setLogs] = useState([]);
  const [selectedTagsetId, setSelectedTagsetId] = useState(null); // Store selected tagset ID
  const location = useLocation();
  // const { file_name, file_data } = location.state || { formData: null, totalPrice: null };
  const { file_name, file_data } = location.state || {};
  const [text, setText] = useState(file_data);
  const navigate = useNavigate();

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

      const updatedText = text.slice(0, selectedRange.start) +
        `<${selectedTag} corr="${correction}">${selectedText}</${selectedTag}>` +
        text.slice(selectedRange.end);

      setText(updatedText);

      // setText('');
      // setTimeout(() => {
      //   setText(updatedText);
      // }, 0);

      setCorrection('');
      setSelectedText('');
      setSelectedRange({ start: 0, end: 0 });
      setSelectedTag('');
      // Implement logic to store the log (e.g., send to server)
      console.log("Selected text: ", selectedText);
      console.log("Updated text: ", updatedText);
      console.log('Submitted log:', newLog);

      // const updatedText = updateTextWithTag(text, selectedRange, selectedTag, correction);
      // setText(updatedText);
    }
  };


  const handleRemove = () => {
    if (selectedText) {

      const selectRemove = /<[^>]+>(.*?)<\/[^>]+>/g.exec(selectedText)?.[1] ?? selectedText;

      const regex = new RegExp(`<[^>]+>${selectRemove}</[^>]+>`);
      const removedText = text.replace(regex, selectRemove);
      // setText(removedText);
      console.log("Remove text: ", removedText);
      setText(removedText);

      setSelectedText('');
      setSelectedRange({ start: 0, end: 0 });
    }
  };

  const handleSave = async () => {
    if (!selectedTagsetId) {
      alert('Please select a tagset.');
      return;
    }

    // const fileName = 'textfile.txt';
    // const blob = new Blob([text], { type: 'text/plain' });
    // const file = new File([blob], fileName, { type: 'text/plain' });

    // Log file content before uploading
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(`Contents of the file (${fileName}):`, e.target.result);
    };
    reader.readAsText(file);

    const formData = new FormData();
    formData.append('file', file);

    console.log("Tagset id: ", typeof (selectedTagsetId));
    console.log("Blob: ", blob);
    console.log("File : ", file);
    console.log("File name : ", file.name);
    console.log("formData: ", formData)

    try {
      const response = await api.put(`/sys/save-file?tagset_id=${selectedTagsetId}`, file.name);
      if (response.status === 200) {
        alert('File saved successfully!');
      } else {
        alert(`File save failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving file:', error);
      alert('An error occurred while saving the file.');
    }
  };

  const handleExport = async () => {
    
  }

  // Fetch all tagsets
  useEffect(() => {
    const fetchAllTagsets = async () => {
      try {
        const response = await api.get('/tagsets/all');
        if (response.status !== 200) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = response.data;
        setTagsets(data);
      } catch (error) {
        console.error('Error fetching tagsets:', error);
      }
    };
    fetchAllTagsets();
  }, []);

  // Fetch labels for seleected tagset
  useEffect(() => {
    if (selectedTagsetId) {
      const fetchTagsetLabels = async () => {
        try {
          const response = await api.get(`/tagsets/labels?tagset_id=${selectedTagsetId}`);
          if (response.status !== 200) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          const labels = response.data;
          const nestedTags = {};
          labels.forEach(tag => {
            nestedTags[tag.label_name] = { ...tag, children: [], isOpen: false, selectable: !labels.some(t => t.label_parent === tag.label_name) };
          });

          labels.forEach(tag => {
            if (tag.label_parent !== 'ROOT' && nestedTags[tag.label_parent]) {
              nestedTags[tag.label_parent].children.push(nestedTags[tag.label_name]);
            }
          });
          const rootTags = labels.filter(tag => tag.label_parent === 'ROOT').map(tag => nestedTags[tag.label_name]);
          setTags(rootTags);
        } catch (error) {
          console.error('Error fetching labels:', error);
        }
      };
      fetchTagsetLabels();
    }
  }, [selectedTagsetId]);
  // useEffect(() => {
  //   const fetchTagsets = async () => {
  //     try {
  //       const response = await api.get(`/tagsets/labels?tagset_id=1`);
  //       if (response.status !== 200) {
  //         throw new Error(`API request failed with status ${response.status}`);
  //       }
  //       const tagset = response.data;
  //       console.log(tagset);

  //       const nestedTags = {};
  //       tagset.forEach(tag => {
  //         // nestedTags[tag.label_name] = { ...tag, children: [], isOpen: false };
  //         nestedTags[tag.label_name] = { ...tag, children: [], isOpen: false, selectable: !tagset.some(t => t.label_parent === tag.label_name) };
  //       });

  //       tagset.forEach(tag => {
  //         if (tag.label_parent !== 'ROOT' && nestedTags[tag.label_parent]) {
  //           nestedTags[tag.label_parent].children.push(nestedTags[tag.label_name]);
  //         }
  //       });
  //       const rootTags = tagset.filter(tag => tag.label_parent === 'ROOT').map(tag => nestedTags[tag.label_name]);
  //       setTags(rootTags);

  //       console.log(rootTags);

  //     } catch (error) {
  //       console.error('Error fetching tagsets:', error);
  //     }
  //   };
  //   fetchTagsets();
  // }, []);

  const toggleTag = (tag) => {
    tag.isOpen = !tag.isOpen;
    setTags([...tags]);
  }

  const renderTags = (tagData) => {
    return (
      <div key={tagData.label_id}>
        <button
          className='toggle-click'
          onClick={() => {
            if (tagData.selectable) setSelectedTag(tagData.label_name);
            toggleTag(tagData)
          }}>
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
    <div className="text-editor">
      <div className='errortag-header'>
        <ArrowBackIcon 
          id="backArrow"
          onClick={() => navigate('/document')}/>
        <div className='errortag-filename'>{file_name}</div>

      </div>
      <div className='main-bar'>
        <button className="errortag-save" onClick={handleSave}>Save</button>
        <button className="errortag-export" onClick={handleSave}>Export</button>
      </div>
      <div className='errortag-container'>
        <div
          className='errortag-text'
          onMouseUp={handleSelectText}
        // dangerouslySetInnerHTML={{ __html: text }}
        >
          {text}

        </div>
        <div className="errortag-tagset">
          <h3>Tagsets</h3>
          {/* {tags.length > 0 ? (
            tags.map(rootTag => renderTags(rootTag))
          ) : (
            <p>No tagsets found.</p>
          )} */}
          {tagsets.length > 0 ? (
            <div>
              {tagsets.map(tagset => (
                <label key={tagset.tagset_id}>
                  <input
                    type="checkbox"
                    value={tagset.tagset_id}
                    checked={selectedTagsetId === tagset.tagset_id}
                    onChange={() => setSelectedTagsetId(tagset.tagset_id)}
                  />
                  {tagset.tagset_name} - {tagset.description}
                </label>
              ))}
            </div>
          ) : (
            <p>No tagsets found.</p>
          )}
          <div>
            <h3>Labels</h3>
            {tags.length > 0 ? (
              tags.map(rootTag => renderTags(rootTag))
            ) : (
              <p>No labels found.</p>
            )}
          </div>
        </div>
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
  );
}

export default TextEditor;