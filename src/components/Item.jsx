import React from 'react'
import {motion} from 'framer-motion'
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { useState } from "react";

import './Item.css'
function Item({to,icon, name}) {

    const [selectedTab, setSelectedTab] = useState("");
    const subheading ={
        true:{
            opacity: 1
        },
        false:{
            opacity: 0,
            display: 'none',
            width: 0
        }
    }
  return (
    <NavLink 
    to={to}
    // activeClassName="selected"
        // onClick={() => setSelectedTab(name)}
    >
    <motion.div className='item'
    // {`item ${name === selectedTab ? "selected" : ""}`}
    whileHover = {{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(5.5px)",
        WebkitBackdropFilter: "blur(5.5px)",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        cursor: 'pointer'
    }}
    transition={{
        type:'none', duration: 0.1
    }} 
    >   
        <motion.div className='icon' >{icon}</motion.div>
        <motion.span variants={subheading}> {name} </motion.span>
    </motion.div>
    </NavLink>

  )
}

export default Item

