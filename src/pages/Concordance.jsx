import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableVirtuoso } from "react-virtuoso";
import { unstable_useNumberInput as useNumberInput } from "@mui/base/unstable_useNumberInput";
import { styled } from "@mui/system";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Alert, Autocomplete, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Concordance.css";
import API from '/src/api.jsx';


//data
function createData(id, detailFile, leftContext, rightContext, pointFocus) {
  return { id, detailFile, leftContext, rightContext, pointFocus };
}

function checkInput(fileName, pointFocus) {
  console.log(fileName.length !== 0 && pointFocus !== "");
  return fileName.length !== 0 && pointFocus !== "";
}

function Concordance() {
  const [search, setSearch] = useState(false);
  const [wordFocus, setWordFocus] = useState("");
  //amount | perMillion | perCent
  const [dataAnalysis, setDataAnalysis] = useState([]);

  // detail | leftContext | rightContext
  const [data, setData] = useState([[]]);

  const [searchData, setSearchData] = useState({
    search: "",
  });

  const columns = [
    {
      width: 20,
      label: "ID",
      dataKey: "id",
      align: "center",
    },
    {
      width: 90,
      label: "Detail",
      dataKey: "detailFile",
      align: "left",
    },
    {
      width: 300,
      label: "Left Context",
      dataKey: "leftContext",
      align: "right",
    },
    {
      width: 40,
      label: "KWIC",
      dataKey: "pointFocus",
      align: "center",
    },
    {
      width: 300,
      label: "Right Context",
      dataKey: "rightContext",
      align: "left",
    },
  ];

  const rows = Array.from({ length: data.length }, (_, index) => {
    return createData(index + 1, ...data[index], wordFocus);
  });

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  //Header
  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.align}
            style={{ width: column.width }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  //Context
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={column.dataKey} variant="body" align={column.align}>
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }
  const [choosedFile, setChoosedFile] = useState([]);
  const [statusInput, setStatusInput] = useState();

  //clickSearch to link post API
  const clickSearch = async () => {
    // check value
    if (checkInput(choosedFile, searchData.search)) {
      console.log("Pass");
      setSearch(true);
      setWordFocus(searchData.search);
      
      try {
        
        const response = (await API.post(`/concordancer/concordancer?point_focus=${searchData.search}`, choosedFile)).data;

        setWordFocus(response.pointFocus);
        setData(response.Data)
        setDataAnalysis([response.num_words,response.permillion,response.percent])
        console.log('PostAPI', data);
      } catch (error) {
        console.error('Error posting data to API:', error);
      }
      
      
      // setData([
      //   ["641074xxx1.pdf", "The cat climbed", " the top of"],
      //   ["641074xxx2.pdf", "The students gathere", "protest against the"],
      //   ["641074xxx2.pdf", "sent a letter", "her grandmother. I"],
      //   ["641074xxx3.pdf", "into the pool", "cool off. He"],
      //   ["641074xxx4.pdf", "brings a book ", "read on the"],
      //   ["641074xxx5.pdf", "They are planning", "move to a"],
      //   ["641074xxx6.pdf", "planning to move ", "a new city"],
      //   ["641074xxx6.pdf", "chef added salt", "enhance the flavor"],
      //   ["641074xxx7.pdf", "planning to move ", "a new city"],
      //   ["641074xxx7.pdf", "chef added salt", "enhance the flavor"],
      // ]);
    } else {
      setSearch(false);
    }
  };
  

  const [fileName, setFileName] = useState([]);

  //Get file name
  useEffect(() => {
    const fetchFilename = async () => {
      try {
        const response = await API.get(`/concordancer/get_filename`);
        setFileName(response.data.filename)
      } catch (error) {
        console.error('Error fetching filename:', error);
      }
    };
    fetchFilename();
  }, []);
  
  
  // const fileName = [
  //   "641074xxx1.pdf",
  //   "641074xxx2.pdf",
  //   "641074xxx3.pdf",
  //   "641074xxx4.pdf",
  //   "641074xxx5.pdf",
  //   "641074xxx6.pdf",
  //   "641074xxx7.pdf",
  // ];

  //setting alert 5sec
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  const handleFilename = (event, newValue) => {
    if (newValue.includes("All")) {
      setChoosedFile([...fileName]);
    } else {
      setChoosedFile(newValue.filter((option) => option !== "All"));
    }

    setChoosedFile(newValue);
    // console.log("Choosed file name ", choosedFile);
  };

  const isChecked = (option) => {
    return (
      choosedFile.includes(option) ||
      (choosedFile.includes("All") && option !== "All")
    );
  };

  return (
    <div className="Concordancepage">
      <div className="header">
        <Link to="/document">
          <ArrowBackIcon id="backArrow" />
        </Link>
        <div className="headerContext">Concordancer</div>
      </div>
      <hr id="line" />
      <Stack
        id="alert-error-input"
        style={{ display: showAlert && statusInput ? "block" : "none" }}
      >
        <Alert variant="filled" severity="error">
          Data input invalid.
        </Alert>
      </Stack>
      <div className="body">
        <div className="filter-concordance">
          {/* box analysis */}
          <div className="box data-analysis">
            {search ? (
              <>
                Simple
                <div className="focus"> {wordFocus}</div>・{dataAnalysis[0]} ・{" "}
                {dataAnalysis[1]} per million token • {dataAnalysis[2]}
              </>
            ) : (
              "No Data"
            )}
            <div className="info-icon">{/* <InfoOutlinedIcon /> */}</div>
          </div>

          <Autocomplete
            multiple
            className="filename-input"
            options={["All", ...fileName]}
            groupBy={(option) => (option === "All" ? null : "Files")}
            getOptionLabel={(option) => option}
            limitTags={2}
            disableCloseOnSelect
            onChange={handleFilename}
            renderOption={(props, option) => (
              <li {...props}>
                <Checkbox checked={isChecked(option)} />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Choose File" placeholder="File" />
            )}
          />

          <Paper component="form" className="SearchBox">
            <InputBase
              required
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              value={searchData.search}
              onChange={(event) =>
                setSearchData((prevState) => ({
                  ...prevState,
                  search: event.target.value,
                }))
              }
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  clickSearch();
                }
              }}
            />
            <IconButton
              type="button"
              className="btn-search"
              onClick={clickSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <Paper style={{ height: 500, width: "100%" }}>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
    </div>
  );
}

export default Concordance;
