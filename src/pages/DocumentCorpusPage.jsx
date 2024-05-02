import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { BsPlus, BsFileEarmarkText, BsFolderPlus, BsPencil, BsTrash } from 'react-icons/bs';
import SideBar from "../components/SideBar";
import '/src/styles/Page.css';
import '/src/styles/CreateModal.css';
import '/src/styles/DropdownMenu.css';
import api from '/src/api.jsx';

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextIncreaseOutlinedIcon from '@mui/icons-material/TextIncreaseOutlined';
import Swal from 'sweetalert2';
import { filledInputClasses } from '@mui/material';


function DocumentCorpusPage() {
  const [showAddcorpusModal, setShowAddcorpusModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [updateFile, setUpdateFile] = useState([]);

  let [corpusstatus, setCorpusStatus] = useState(true);
  const [sortAsc, setSortAsc] = useState(true); // State เพื่อเก็บสถานะการเรียงลำดับไฟล์ A-Z

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
      const response = await api.get(`/sys/paths?in_corpus=${corpusstatus}`);
      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const fileall = response.data.paths;
      // console.log(response.data)
      setFiles(fileall);
    } catch (error) {
      console.error('Error fetching tagsets:', error);
    }
  }

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
  };
  
  const editfile = async (old_name, new_name) => {
    try {
      const f = selectedItem.split('.').pop()
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

  const sortFiles = () => {
    setSortAsc(!sortAsc); // สลับสถานะการเรียงลำดับ A-Z
    const sortedFiles = [...files].sort((a, b) => {
      return sortAsc ? a.localeCompare(b) : b.localeCompare(a); // เรียงลำดับ A-Z หรือ Z-A ตามสถานะ sortAsc
    });
    setFiles(sortedFiles);
  };

  const toerrortagger = async (file_name) => {
    try {
      const res = await api.get('sys/get_string_in_file?file_name='+file_name);
      const file_data = res.data
      // console.log(file_name + ' : ' + res.data);
      navigate('/errortag', { state: { file_name, file_data } });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <SideBar>
      <Container>
        <Row>
          <Col>
            <h1 className="headerContext">Document</h1>
            <hr id="line" />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="button-bar">
              <Button className="corpus-button" href='/document'
              style={{padding:"0.1em 1.0em", border:"none", backgroundColor:"#FC5B5C", borderRadius:"9px"}}
              >Document</Button>
              <Button className="concordancer-button" href="/concordance">Concordancer</Button>
              <Button className='sort-button' onClick={sortFiles}>A-Z <FilterAltOutlinedIcon /></Button>
            </div>
          </Col>
          {/* <Button className="new-button" href="/import">
            <BsPlus />
          </Button> */}
        </Row>

        <Row className="item-list">
          {files.map((item, index) => (
            <Col key={index} className="file-item"> 
              <div className="item-icon" onClick={()=> toerrortagger(item)}>
                <InsertDriveFileIcon style={{fontSize:"100px", color:"A4A4A4", cursor:"pointer"}} />
              </div>
              <div className="item-details">
                <div className="file-name">{item}</div>
              </div>
              <div className="item-actions">
                {/* {corpusstatus ? (
                  ''
                ) : (
                  <TextIncreaseOutlinedIcon style={{cursor:"pointer"}} onClick={() => handleaddcorpusclick(item)}/>
                )} */}
                <DriveFileRenameOutlineOutlinedIcon style={{cursor:"pointer"}} onClick={() => handleeditclick(item)}/> 
                <DeleteOutlineOutlinedIcon style={{cursor:"pointer"}} onClick={() => handledeleteclick(item)}/>
              </div>      
            </Col>
          ))}
        </Row>

        <Modal className='create-modal' show={showAddcorpusModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <Modal.Title>Add Corpus File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to add "{selectedItem}" to corpus ?
          </Modal.Body>
          <Modal.Footer>
            <Button className='tagset-cancel' variant="secondary" onClick={() => setShowAddcorpusModal(false)}>
              Cancel
            </Button>
            <Button className='tagset-confirm' variant="danger" onClick={handleAddCorpus}>
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
            <Button className='tagset-cancel' variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button className='tagset-confirm' variant="primary" onClick={() => handleEdit()}>
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
            <Button className='tagset-cancel' variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button className='tagset-confirm' variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </SideBar>
  );
}

export default DocumentCorpusPage;
