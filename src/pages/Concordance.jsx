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
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
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




function createData(id, detailFile, leftContext, rightContext, pointFocus) {
  return { id, detailFile, leftContext, rightContext, pointFocus };
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
    type: "KWIC",
    lenght: 10,
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
      width: searchData.type === "KWIC" ? 50 :300,
      label: searchData.type,
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

  const handleSearch = () => {
    setSearch(true);
    setData([
      ["641074xxxx.pdf", "The cat climbed", " the top of"],
      ["641074xxxx.pdf", "The students gathere", "protest against the"],
      ["641074xxxx.pdf", "sent a letter", "her grandmother. I"],
      ["641074xxxx.pdf", "into the pool", "cool off. He"],
      ["641074xxxx.pdf", "brings a book ", "read on the"],
      ["641074xxxx.pdf", "They are planning", "move to a"],
      ["641074xxxx.pdf", "planning to move ", "a new city"],
      ["641074xxxx.pdf", "chef added salt", "enhance the flavor"],
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
  };
  

  return (
    <div className="Concordancepage">
      <div className="header">
        <ArrowBackIcon id="backArrow" />
        <div className="headerContext">Concordance</div>
      </div>
      <hr id="line" />
      <div className="body">
        <div className="filter-concordance">
          {/* box analysis */}
          <div className="box data-analysis">
            {/* {`Simple  ${wordFocus} ・${dataAnalysis[0]} ・ ${dataAnalysis[1]} per million token • ${dataAnalysis[2]} `} */}
            {search ? 
              `Simple  ${wordFocus} ・${dataAnalysis[0]} ・ ${dataAnalysis[1]} per million token • ${dataAnalysis[2]} `
              : "No Data"}
            <div className="info-icon">{/* <InfoOutlinedIcon /> */}</div>
          </div>

          {/* input filter */}
          {/* wordSearch ->  searchData.search */}
          <div className="box input-wrapper">
            <AbcOutlinedIcon
              id="search-icon"
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="filled-basic"
              placeholder="Word Search"
              value={searchData.search}
              variant="standard"
              onChange={(event) =>
                setSearchData((prevState) => ({
                  ...prevState,
                  search: event.target.value,
                }))
              }
            />
          </div>

          {/* type(Context/ KWIC) ->  searchData.type */}
          <div className="box input-wrapper">
            <Select
              variant="standard"
              id="option-search"
              className="box input-wrapper"
              value={searchData.type}
              placeholder="Search"
              onChange={(event) =>
                setSearchData((prevState) => ({
                  ...prevState,
                  type: event.target.value,
                }))
              }
            >
              <MenuItem value={"KWIC"}>KWIC</MenuItem>
              <MenuItem value={"Context"}>Context</MenuItem>
            </Select>
          </div>

          {/* Number */}
          {/* length ->  searchData.lenght */}
          <div className="box input-wrapper word-num">
            <Layout>
              <Pre>Number of word: {searchData.lenght}</Pre>

              <CompactNumberInput
                aria-label="Compact number input"
                placeholder="Type a number…"
                value={searchData.lenght}
                min={1}
                onChange={(event, value) =>
                  setSearchData((prevState) => ({
                    ...prevState,
                    lenght: value,
                  }))
                }
              />
            </Layout>
          </div>

          <button 
          className="btn-search"
          onClick={handleSearch}
          >
            <SearchIcon
              id="search-icon"
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            Search
          </button>

          <div className="box folderName">
            <DescriptionOutlinedIcon />
            CN342(666)_TU....
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
