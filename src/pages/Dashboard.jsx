import React, { StrictMode } from "react";
import SideBar from "../components/SideBar";
import Fab from '@mui/material/Fab';
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Paper from "@mui/material/Paper";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";

function Dashboard() {
  const Cards = [
    {
      theme: "#FC5B5C",
      label: "Total Document",
      dataKey: "totalDocuments",
      logo: <DescriptionOutlinedIcon />,
    },
    {
      theme: "#219653",
      label: "Checked Document",
      dataKey: "checkedDocuments",
      logo: <TaskAltOutlinedIcon />,
    },
    {
      theme: "#F98A6C",
      label: "Error Part",
      dataKey: "errorParts",
      logo: <WarningAmberOutlinedIcon />,
    },
    {
      theme: "#5C83E5",
      label: "Tagset Root",
      dataKey: "tagsetRoots",
      logo: <TurnedInNotOutlinedIcon />,
    },
  ];

  const data = {
    totalDocuments: 100,
    checkedDocuments: 80,
    errorParts: 10,
    tagsetRoots: 50,
  };

  const dashboard_Data = [
    {
      id: "Lexis (L)",
      label: "Lexis (L)",
      value: 7.5,
    },
    {
      id: "Word(W)",
      label: "Word(W)",
      value: 10.5,
    },
    {
      id: "Infelicities (Z)",
      label: "Infelicities (Z)",
      value: 1.3,
    },
    {
      id: "Lexico-G(X)",
      label: "Lexico-G(X)",
      value: 30,
    },
    {
      id: "Grammar (G)",
      label: "Grammar (G)",
      value: 21.8,
    },
    {
      id: "Form (F)",
      label: "Form (F)",
      value: 26.3,
    },
  ];

  const line_Data = [
    {
      id: "Errortager",
      data: dashboard_Data.map((item) => ({
        x: item.id,
        y: item.value,
      })),
    },

  ];

  const bar_Data = dashboard_Data.map((item) => ({
    Value: item.id,
    Errortagger: item.value,
   }))


  const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Error",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  );

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
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
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
    />
  );

  const MyResponsiveBar = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={["Errortagger"]}
      indexBy="Value"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      axisTop={null}
      axisRight={null}
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
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in Value: " + e.indexValue
      }
    />
  );

  return (
    <SideBar>
      <div className="dashboardpage">
        <div className="header">
          <div className="headerContext">Dashboard</div>
        </div>
        <hr id="line" />
        <div className="body">
          <div className="btn-container">
            <Fab variant="extended" className="filter-btn">
              <FilterAltOutlinedIcon sx={{ mr: 1 }} />
              Add Filter
            </Fab>
          </div>

          <div className="cardsGroup">
            {Cards.map((card, index) => (
              <Paper
                key={index}
                className="card"
                sx={{ border: `solid 1px ${card.theme}`, width: 220 }}
              >
                <div className="cardLogo" style={{ color: card.theme }}>
                  {card.logo}
                </div>
                <div className="cardContent">
                  <div className="card">{data[card.dataKey]} </div>
                  <div className="cardLabel">{card.label} </div>
                </div>
              </Paper>
            ))}
          </div>
          <StrictMode>
            <div className="PieChart" style={{ height: "400px" }}>
              <MyResponsivePie data={dashboard_Data} />
            </div>
            <div className="Line" style={{ height: "400px" }}>
              <MyResponsiveLine data={line_Data} />
            </div>
            <div className="BarChart" style={{ height: "400px" }}>
              <MyResponsiveBar data={bar_Data} />
            </div>
          </StrictMode>
        </div>
      </div>
      {console.log(line_Data)}
    </SideBar>
  );
}

export default Dashboard;
