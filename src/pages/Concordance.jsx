import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { unstable_useNumberInput as useNumberInput } from "@mui/base/unstable_useNumberInput";
import { styled } from "@mui/system";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

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

const Layout = styled("div")`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 1rem;
`;

const Pre = styled("pre")`
  font-size: 0.75rem;
`;

// detail | leftContext | rightContext
const DATA = [
  ["641074xxxx.pdf", 159, 6.0],
  ["641074xxxx.pdf", 237, 9.0],
  ["641074xxxx.pdf", 262, 16.0],
  ["641074xxxx.pdf", 305, 3.7],
  ["641074xxxx.pdf", 356, 16.0],
  ["641074xxxx.pdf", 159, 6.0],
  ["641074xxxx.pdf", 237, 9.0],
  ["641074xxxx.pdf", 262, 16.0],
  ["641074xxxx.pdf", 305, 3.7],
  ["641074xxxx.pdf", 356, 16.0],
  ["641074xxxx.pdf", 159, 6.0],
  ["641074xxxx.pdf", 237, 9.0],
  ["641074xxxx.pdf", 262, 16.0],
  ["641074xxxx.pdf", 305, 3.7],
  ["641074xxxx.pdf", 356, 16.0],
];

function createData(id, detailFile, leftContext, rightContext, pointFocus) {
  return { id, detailFile, leftContext, rightContext, pointFocus };
}

function Concordance() {
  //Value Input
  const [optionSearch, setOptionSearch] = useState("KWIC");
  const handelOptionSearch = (event) => {
    setOptionSearch(event.target.value);
  };
  const [wordFocus, setWord] = useState("to");
  const [amount, setAmount] = useState("10,123");
  const [perMillion, setPerMillion] = useState("12,345");
  const [lengthSearch, setLength] = useState(10); // State สำหรับ CompactNumberInput
  let information = `Simple ${wordFocus} ・${amount} ・ ${perMillion} per million token • 1.2% `;

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
      label: optionSearch,
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

  const rows = Array.from({ length: DATA.length }, (_, index) => {
    return createData(index + 1, ...DATA[index], wordFocus);
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
            // align={column.numeric || false ? 'right' : 'left'}
            align={column.align}
            style={{ width: column.width }}
            // sx={{
            //   backgroundColor: '#FBDA80',
            // }}
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

  return (
    <div className="page">
      <div className="header">
        <ArrowBackIcon id="backArrow" />
        <div className="headerContext">Concordance</div>
        
      </div>
      <hr id="line" />
      <div className="body">
        <div className="filter-concordance">
          {/* box analysis */}
          <div className="box data-analysis">
            {information}{" "}
            <div className="info-icon">
              <InfoOutlinedIcon />{" "}
            </div>
          </div>

          {/* input filter */}
          <div className="box input-wrapper">
            <SearchIcon
              id="search-icon"
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="filled-basic"
              placeholder="Search"
              variant="standard"
            />
          </div>

          <div className="box input-wrapper">
            {/* <InputLabel >Age</InputLabel> */}
            <Select
              variant="standard"
              id="option-search"
              className="box input-wrapper"
              value={optionSearch}
              placeholder="Search"
              onChange={handelOptionSearch}
            >
              <MenuItem value={"KWIC"}>KWIC</MenuItem>
              <MenuItem value={"Context"}>Context</MenuItem>
            </Select>
          </div>

          {/* Number */}

          <div className="box input-wrapper">
            <Layout>
              <Pre>Number of word: {lengthSearch ?? " "}</Pre>
              <CompactNumberInput
                aria-label="Compact number input"
                placeholder="Type a number…"
                readOnly
                value={lengthSearch}
                min={0}
                onChange={(event, val) => setLength(val)}
              />
            </Layout>
          </div>

          <button className="btn-search">Search</button>

          <div className="box folderName">
            <DescriptionOutlinedIcon />
            Folder name
          </div>
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
