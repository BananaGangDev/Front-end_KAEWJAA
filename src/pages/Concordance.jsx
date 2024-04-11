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
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CompactNumberInput = React.forwardRef(function CompactNumberInput(
  props,
  ref
) {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value,
  } = useNumberInput(props);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <StyledInputRoot {...getRootProps()}>
      <StyledStepperButton className="increment" {...getIncrementButtonProps()}>
        <ArrowDropUpRoundedIcon />
      </StyledStepperButton>
      <StyledStepperButton className="decrement" {...getDecrementButtonProps()}>
        <ArrowDropDownRoundedIcon />
      </StyledStepperButton>
      <HiddenInput {...inputProps} />
    </StyledInputRoot>
  );
});

const StyledInputRoot = styled("div")(
  ({ theme }) => `
    display: grid;
    grid-template-columns: 2rem;
    grid-template-rows: 2rem 2rem;
    grid-template-areas:
      "increment"
      "decrement";
    row-gap: 1px;
    overflow: auto;
    border-radius: 8px;
    border-style: solid;
    border-width: 1px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
  `
);

const HiddenInput = styled("input")`
  visibility: hidden;
  position: absolute;
`;

const StyledStepperButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: nowrap;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  box-sizing: border-box;
  border: 0;
  padding: 0;
  color: inherit;
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &.increment {
    grid-area: increment;
  }

  &.decrement {
    grid-area: decrement;
  }
`
);

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
  const [dataAnalysis, setDataAnalysis] = useState([null, null, null]);

  // detail | leftContext | rightContext
  const [data, setData] = useState([[]]);

  const [searchData, setSearchData] = useState({
    search: "",
  });
  let information = `Simple ${wordFocus} ・${dataAnalysis[0]} ・ ${dataAnalysis[1]} per million token • ${dataAnalysis[2]} `;

  const columns = [
    {
      width: 50,
      label: "ID",
      dataKey: "id",
      align: "center",
    },
    {
      width: 100,
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
      width: 50,
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
  const [checkedValues, setCheckedValues] = useState([]);
  const [statusInput, setStatusInput] = useState();

  const clickSearch = () => {
    setStatusInput(checkInput(checkedValues, searchData.search))
    //check value
    if (statusInput) {
      console.log("Pass");
      setSearch(true);
      setWordFocus(searchData.search);
      // set data ส่งให้API
      setData([
        ["641074xxxx.pdf", "The cat climbed", " the top of"],
        ["641074xxxx.pdf", "The students gathere", "protest against the"],
        ["641074xxxx.pdf", "sent a letter", "her grandmother. I"],
        ["641074xxxx.pdf", "into the pool", "cool off. He"],
        ["641074xxxx.pdf", "brings a book ", "read on the"],
        ["641074xxxx.pdf", "They are planning", "move to a"],
        ["641074xxxx.pdf", "planning to move ", "a new city"],
        ["641074xxxx.pdf", "chef added salt", "enhance the flavor"],
      ]);
      setWordFocus(searchData.search);
    } else {
      setSearch(false);
    }
  };

  const fileName = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "12 Angry Men",
    "Schindler's List",
    "Pulp Fiction",
  ];

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
    setCheckedValues(newValue);
    console.log("Chhosed file name ", checkedValues);
  };
  return (
    <div className="Concordancepage">
      <div className="header">
        <ArrowBackIcon id="backArrow" />
        <div className="headerContext">Concordance</div>
      </div>
      <hr id="line" />
      <Stack
        id="alert-error-input"
        style={{ display: showAlert&&statusInput ? "block" : "none" }}
      >
        <Alert variant="filled" severity="error">
          Data input invalid.
        </Alert>
      </Stack>
      <div className="body">
        <div className="filter-concordance">
          {/* box analysis */}
          <div className="box data-analysis">
            {search
              ? `Simple  ${wordFocus} ・${dataAnalysis[0]} ・ ${dataAnalysis[1]} per million token • ${dataAnalysis[2]} `
              : "No Data"}
            <div className="info-icon">{/* <InfoOutlinedIcon /> */}</div>
          </div>

          <Autocomplete
            multiple
            className="filename-input"
            options={["All", ...fileName]}
            limitTags={2}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            onChange={handleFilename}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
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
