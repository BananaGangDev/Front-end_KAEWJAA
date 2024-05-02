import React, { StrictMode, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import notfound from '../assets/nopage.png';
import choose from '../assets/choose.png';


// Material-UI Icons
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";

// Material-UI Components
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

// Nivo Components
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";

import API from "/src/api.jsx";

function Dashboard() {
  const Cards = [
    {
      theme: "#FC5B5C",
      label: "Total Document",
      dataKey: "total",
      logo: <DescriptionOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      theme: "#219653",
      label: "Checked Document",
      dataKey: "check",
      logo: <TaskAltOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      theme: "#F98A6C",
      label: "Error Part",
      dataKey: "error",
      logo: <WarningAmberOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    // {
    //   theme: "#5C83E5",
    //   label: "Tagset Root",
    //   dataKey: "tagset",
    //   logo: <TurnedInNotOutlinedIcon sx={{ fontSize: 40 }} />,
    // },
  ];
  const [cardData, setCardData] = useState({});
  // const cardData = {

  // };
  const [tagsetgroup, setTagsetgroup] = useState([]);
  const [tagsetID, setTagsetID] = useState("");
  const [statusFetch, setStatusFetch] = useState('');

  const handleChange = async (event) => {
    const selectedTagsetID = event.target.value;
    setStatusFetch('')
    setCardData({});
    setGraphData([]);
    setTagsetID(selectedTagsetID);
    await fetchTagsetData(selectedTagsetID);
  };

  //API
  useEffect(() => {
    const fetchTagset = async () => {
      // const response = await api.get(`/holiday/check_holiday?holiday_date=${currentTime.toJSON().split('T')[0]}`);
      const response = await API.get(`/tagsets/all`);
      setTagsetgroup(response.data);
    };

    fetchTagset();
  }, []);
  useEffect(() => {});

  const fetchTagsetData = async (ID) => {
    console.log("id: ", tagsetID);
    const responseTagdata = await API.get(
      `/dashboard/get_stat?tagset_id=${ID}`
    );
    // setStatusFetch(responseTagdata.status)

    //change DATA
    if (responseTagdata.status == 200) {
      console.log("status: ", responseTagdata.status);
      setStatusFetch(200);
      setCardData(responseTagdata.data.card_data);
      setGraphData(responseTagdata.data.data);
    }
    if (responseTagdata.status == 204) {
      console.log("status: ", responseTagdata.status);
      setStatusFetch(204);
      setCardData(responseTagdata.data.card_data);
      setGraphData(responseTagdata.data.data);
    }
  };
  // console.log("Data: ",tagsetData)

  const [graphData, setGraphData] = useState([]);

  const dashboard_Data = [
    {
      id: "Lexis (L)",
      label: "Lexis (L) label",
      value: 120,
    },
    {
      id: "Word(W)",
      label: "Word(W)",
      value: 50,
    },
    {
      id: "Infelicities (Z)",
      label: "Infelicities (Z) label",
      value: 100,
    },
    {
      id: "Lexico-G(X)",
      label: "Lexico-G(X)",
      value: 30,
    },
    {
      id: "Grammar (G)",
      label: "Grammar (G)",
      value: 90,
    },
    {
      id: "Form (F)",
      label: "Form (F)",
      value: 102,
    },
  ];

  const pie_Data = graphData ? graphData.map((parent) => ({
    id: parent.root_name,
    value: parent.data
      .reduce((total, child) => total + parseFloat(child.percent), 0)
      .toFixed(2),
    tooltip: parent.data.map((child) => ({
      id: child.child_name,
      description: child.child_description,
      num: child.percent,
    })),
  })) : [];
  

  // const bar_Data = graphData.map((parent) => ({
  //   Value: parent.root_name,
  //   Errortagger: parent.data.reduce((total, child) => total + parseFloat(child.count), 0).toFixed(2),
  //   tooltipBar: parent.data.map(child => ({id: child.child_name, num: child.count}))
  // }));
  const bar_Data = graphData ? graphData.map((parent) => ({
    Root: parent.root_name,
    Errortagger: parent.data
      .reduce((total, child) => total + parseFloat(child.count), 0)
      .toFixed(2),
    tooltipBar: parent.data.map((child) => ({
      id: child.child_name,
      num: child.count,
    })),
  })): [];

  // const line_Data = [
  //   {
  //     id: "Errortager",
  //     data: dashboard_Data.map((item) => ({
  //       x: item.id,
  //       y: item.value,
  //     })),
  //   },
  // ];

  const PieTooltip = ({ datum }) => {
    // ค้นหาข้อมูลของ slice จาก pie_Data โดยใช้ id ของ datum
    const tooltipData = pie_Data.find((item) => item.id === datum.id);

    return (
      <div className="pietooltip">
        <p>{datum.id}</p>
        {/* ถ้าพบข้อมูลใน tooltipData ให้แสดง tooltip */}
        {tooltipData &&
          tooltipData.tooltip.map((child) => (
            <p key={child.id}>
              {child.id} ({child.description} ) :{" "}
              {parseFloat(child.num).toFixed(2)}%
            </p>
          ))}
      </div>
    );
  };

  const BarTooltip = () => {
    const datum = bar_Data;
    return (
      <div className="bartooltip">
        <p>{datum.Value}</p>
      </div>
    );
  };
  // console.log('bar', bar_Data)

  // const MyResponsiveLine = ({ data }) => (
  //   <ResponsiveLine
  //     data={data}
  //     margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  //     xScale={{ type: "point" }}
  //     yScale={{
  //       type: "linear",
  //       min: "auto",
  //       max: "auto",
  //       stacked: true,
  //       reverse: false,
  //     }}
  //     yFormat=" >-.2f"
  //     axisTop={null}
  //     axisRight={null}
  //     axisBottom={{
  //       tickSize: 5,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       legend: "Error",
  //       legendOffset: 36,
  //       legendPosition: "middle",
  //       truncateTickAt: 0,
  //     }}
  //     axisLeft={{
  //       tickSize: 5,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       legend: "Amount",
  //       legendOffset: -40,
  //       legendPosition: "middle",
  //       truncateTickAt: 0,
  //     }}
  //     pointSize={10}
  //     pointColor={{ from: "color", modifiers: [] }}
  //     pointBorderWidth={2}
  //     pointBorderColor={{ from: "serieColor" }}
  //     pointLabelYOffset={-12}
  //     enableTouchCrosshair={true}
  //     useMesh={true}
  //   />
  // );

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
      tooltip={({ datum }) => <PieTooltip datum={datum} />}
    />
  );

  const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={["Errortagger"]}
      indexBy="Root"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Error",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      tooltip={(e) => (
        <div className="bartooltip">
          <p>{e.data.Root}</p>
          <p>{e.data.tooltipBar}</p>
        </div>
      )}
    />
  );

  const loading = () => {
    return statusFetch != 204 ? (
      <div className="loadingDashboard">
        <h1>Loading</h1>
        <CircularProgress id="loadingicon"/>
      </div>
    ) : null;
  };

  const notFound= () => {
    return (
      <div className="notFoundAlert">
       <img src={notfound} alt="No page found" style={{ height: "7em" }} />

        <h2> Data not found. </h2>
      </div>
    )
  }
  const plzChooseTagset= () => {
    return (
      <div className="chooseplzChooseTagset">
       <img src={choose} alt="No page found" style={{ height: "7em" }} />

        <h2>Please choose a tagset.</h2>
      </div>
    )
  }



  return (
    <SideBar>
      <div className="dashboardpage">
        <div className="header">
          <div className="headerContext">Dashboard</div>
        </div>
        <hr id="line" />
        <div className="body">
          <div className="btn-container ">
            <FormControl
              style={{ width: "auto", minWidth: 200, background: "#fff" }}
            >
              <InputLabel id="demo-simple-select-label">Tagset</InputLabel>
              <Select value={tagsetID} label="Tagset" onChange={handleChange}>
                {tagsetgroup.map((option, index) => (
                  <MenuItem key={index} value={option.tagset_id}>
                    {option.tagset_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {tagsetID !== "" ? (
            statusFetch === '' ? (
              loading()
            ) : statusFetch === 200 ? (
              <>
                <div className="cardsGroup">
                  {Cards.map((card, index) => (
                    <Paper
                      key={index}
                      className="card"
                      sx={{ border: `solid 1px ${card.theme}`, width: 250 }}
                    >
                      <div className="cardLogo" style={{ color: card.theme }}>
                        {card.logo}
                      </div>
                      <div className="cardContent">
                        <div className="cardkey">{cardData[card.dataKey]}</div>
                        <div className="cardLabel">{card.label}</div>
                      </div>
                    </Paper>
                  ))}
                </div>
                <div className="PieChart" style={{ height: "400px" }}>
                  <MyResponsivePie data={pie_Data} />
                </div>
                <div className="BarChart" style={{ height: "400px" }}>
                  <MyResponsiveBar data={bar_Data} />
                </div>
              </>
            ) : (
              notFound()
            )
          ) : (
            plzChooseTagset()
          )}
        </div>
      </div>
      {/* {console.log(line_Data)} */}
    </SideBar>
  );
}

export default Dashboard;
