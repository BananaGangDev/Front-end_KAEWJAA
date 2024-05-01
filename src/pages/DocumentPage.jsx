import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { BsPlus, BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import '/src/styles/Page.css';
import '/src/styles/CreateModal.css';
import '/src/styles/DropdownMenu.css';
import api from '/src/api.jsx';

// import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextIncreaseOutlinedIcon from '@mui/icons-material/TextIncreaseOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import Swal from 'sweetalert2';

function DocumentPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [ShowAddcorpusModal, setShowAddcorpusModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [files, setFiles] = useState([]);
  const [updateFile, setUpdateFile] = useState([]);

  let [corpusstatus, setCorpusStatus] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  useEffect(() => {
    fetchfileAll();
  }, []);

  const fetchfileAll = async()=>{
    try {
      const response = await api.get(`/sys/paths?in_corpus=`+corpusstatus);
      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const fileall = response.data.paths;
      setFiles(fileall);
    } catch (error) {
      console.error('Error fetching tagsets:', error);
    }
  }

  // const handleCreate = (name, description) => {
  //   const newItem = {
  //     id: Date.now(),
  //     name: name,
  //     description,
  //     type: showCreateModal ? 'file' : 'folder',
  //     createdAt: new Date().toLocaleString(),
  //   };
  //   setItems([...items, newItem]);
  //   setShowCreateModal(false);
  // };

  const handleaddcorpusclick = async (item) => {
    setSelectedItem(item);
    setShowAddcorpusModal(true);
  };

  const handleeditclick = async (item) =>{
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handledeleteclick = async (item) =>{
      setSelectedItem(item);
      setShowDeleteModal(true);
  };

  const handleAddCorpus = async (item) => {
    try {
      await addcorpus(selectedItem, updateFile);
      setShowAddcorpusModal(false);
    } catch (error) {
      console.error('Error add Corpus file:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await editfile(selectedItem, updateFile);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletefile(selectedItem);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const addcorpus = async ()=> {
    try {
      // const f = selectedItem.split('.').pop()
      // console.log(selectedItem, new_name+'.'+f);
      const res = await api.post('/sys/tokenize?file_name='+selectedItem)
        if (res.status === 200){
          Toast.fire({
            icon: "success",
            title: "This file has been added to corpus successfully!"
          });
          setSelectedItem([]);
          fetchfileAll();
        }
      
    } catch (error) {
      console.error('Error adding file:', error);
    }
  }
  const editfile = async (old_name, new_name) => {
    try {
      const f = selectedItem.split('.').pop()
      // console.log(selectedItem, new_name+'.'+f);
      const res = await api.put('/sys/change-blob-name?old_name='+selectedItem +'&new_name='+new_name+'.'+f)
        if (res.status === 200){
          Toast.fire({
            icon: "success",
            title: "File name updated successfully!"
          });
          setSelectedItem([]);
          fetchfileAll();
        }
      
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const deletefile = async (filename) => {
    try {
      const res = await api.delete('/sys/delete-file?file_name='+filename)
        if (res.status === 200){
          Toast.fire({
            icon: "success",
            title: "Delete file successfully!"
          });
          setSelectedItem([]);
          fetchfileAll();
        }
      
    } catch (error) {
      console.error('Error delete file:', error);
    }
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const corpus = () => {
    if(corpusstatus == false){
      setCorpusStatus(true);
      fetchfileAll();
    } else {
      setCorpusStatus(false);
      fetchfileAll();
    }
  }
  return (
    <SideBar>
      <Container>
        <Row>
          <Col>
            <h1 className="document-title">Document</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="button-bar">
              <Button className="corpus-button" onClick={corpus}>Corpus</Button>
              <Button className="concordancer-button" href="/concordance">Concordancer</Button>
              {/* <Dropdown>
                <Dropdown.Toggle className="sort-button" id="sort-dropdown">
                  Sort by
                  <FilterAltIcon className="small-filter-alt-icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Date</Dropdown.Item>
                  <Dropdown.Item>Name</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          </Col>
              <Button className="new-button" href="/import">
                <BsPlus />
              </Button>
        </Row>

        <Row className="item-list">
          {files.map((item, index) => (
            <Col key={index} className="file-item">
              <div className="item-icon">
                <InsertDriveFileIcon />
                {/* {item.type === 'file' ? <BsFileEarmarkText /> : <BsFolderPlus />} */}
              </div>
              <div className="item-details">
                <div className="file-name">{item}</div>
                {/* <div className="item-date">{item.createdAt}</div> */}
              </div>
              <div className="item-actions">
                <DriveFileRenameOutlineOutlinedIcon onClick={() => handleeditclick(item)}/>
                <DeleteOutlineOutlinedIcon onClick={() => handledeleteclick(item)}/>
                {corpusstatus == false ? (
                  <TextIncreaseOutlinedIcon onClick={() => handleaddcorpusclick(item)}/>
                ) : (
                '')}
                </div>      
              <div>

                {/* <Button
                  variant="link"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowEditModal(true);
                  }}
                >
                  <BsPencil />
                </Button> */}
                {/* <Button
                  variant="link"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowDeleteModal(true);
                  }}
                >
                  <BsTrash />
                </Button> */}
              </div>
            </Col>
          ))}
        </Row>

        {/* <Modal className='create-modal' show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header>
            <Modal.Title>Create New File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl placeholder="Name" />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl placeholder="Description" as="textarea" rows={3} />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleCreate('New Item', 'Description goes here');
              }}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal> */}

        <Modal className='create-modal' show={ShowAddcorpusModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <Modal.Title>Add Corpus File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to add "{selectedItem}" to corpus ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddcorpusModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleAddCorpus}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal className='create-modal' show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header>
            <Modal.Title>Edit file name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="New file name"
                onChange={(e) => setUpdateFile(e.target.value)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleEdit()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal className='create-modal' show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <Modal.Title>Delete File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete "{selectedItem}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </SideBar>
  );
}

export default DocumentPage;
