import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fab from "@mui/material/Fab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import "../styles/InputConcordance.css";

function InputConcordance() {
  const fileName = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
    { title: 'The Good, the Bad and the Ugly' },
    { title: 'Fight Club' },
    
  ];
  return (
    <div className="InputConcordancePage">
      <div className="header">
        <ArrowBackIcon id="backArrow" />
        <div className="headerContext">Concordance</div>
      </div>
      <hr id="line" />
      <div className="body">
        <div className="choosefile">
        <Autocomplete
  multiple
  id="checkboxes-tags-demo"
  options={fileName}
  limitTags={1}
  disableCloseOnSelect
  getOptionLabel={(option) => option.title}
  renderOption={(props, option, { selected }) => (
    <li {...props}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
      />
      {option.title}
    </li>
  )}
  style={{ width: 500 }}
  renderInput={(params) => (
    <TextField {...params} label="Choose File" placeholder="File" />
  )}
/>

        </div>
        <hr id="midLine" />
        <div className="searchWord">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>

          </Paper>
        </div>
      </div>
      <div className="footer">
        <Fab style={{ background: "#ffcc00" }} variant="extended">
          <ArrowForwardIcon sx={{ mr: 1 }} />
          Next
        </Fab>
      </div>
    </div>
  );
}

export default InputConcordance;
