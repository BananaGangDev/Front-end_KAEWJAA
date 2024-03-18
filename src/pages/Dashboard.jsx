import React, { useState } from "react";
import SideBar from "../components/SideBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Dashboard() {
  
  return (
    <SideBar>
    <div className="page">
      <div className="header">
        <div className="headerContext">Dashboard</div>
        
      </div>
      <hr id="line" />
      <div className="body">
        
      </div>
    </div>
    </SideBar>
  );
}

export default Dashboard;
