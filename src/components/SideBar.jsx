import { useState } from "react";
import { motion } from "framer-motion";
import profile from "../assets/Profile.jpg";
import Item from "./Item";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';

function sidebar(props) {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  // การกำหนดตัวแปรและโครงสร้างขององค์ประกอบและสถานะการเปิด-ปิดของ Sidebar
  const sideContainerVariants = {
    open: {
      width: "15rem",
    },
    closed: {
      width: "5rem",
    },
  };

  const sidebarVariants = {
    open: {},
    closed: {
      width: "3rem",
    },
  };

  const profileVariants = {
    open: {
      alignSelf: "center",
      width: "4rem",
    },
    closed: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
  };

  return (
    <div className="Sidebar">

    
    <div className="App">
      <motion.div
      data-open={open}
      variants={sideContainerVariants}      
      initial="open"
      animate={open ? "open" : "closed"}
      className="sidebar_container"
>
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          >
            <ArrowForwardIosIcon />
          </motion.div>
          {/* profile */}
          <motion.h3
            animate={{ opacity: open ? 1 : 0, 
            height: open ? "auto" : 0, 
            width: open ? "auto" : 0 }}
          >
                <motion.div
                  layout
                  initial={`${open}`}
                  animate={`${open}`}
                  variants={profileVariants}
                  className="profile"
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    backdropFilter: "blur(5.5px)",
                    WebkitBackdropFilter: "blur(5.5px)",
                    border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    cursor: "pointer",
                  }}
                  >
                  <img
                    className="profile"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    // src={profile}
                    alt="profile_img"
                  />
                </motion.div>
          </motion.h3>
          

          <div className="groups">
            {/* group 1 */}
            <div className="group ">
              <motion.h3
                animate={{ opacity: open ? 1 : 0, 
                height: open ? "auto" : 0, 
                width: open ? "auto" : 0 }}
                className="UserDetail"
              >
                {/* <div className="UserDetail_container">NAME:</div> */}
                <div className="UserDetail_container">USERNAME:</div>
              </motion.h3>

              <Item icon={<DashboardIcon />} name="Dashboard" to="/dashboard" />
              <Item icon={<DescriptionIcon />} name="Document" to="/document" />
              <Item icon={<LocalOfferIcon />} name="Tagset" to="/tagset" />
              
            </div>
            <div className="group ">
            
            <Item icon={<LockResetIcon />} name="Reset Password" to="/reset-password" />
            <Item icon={<LogoutIcon />} name="Logout" to="/" />
          </div>
          </div>
          
        </motion.div>
      </motion.div>

      <div className={`body_container${open ? "" : "-closed"}`}>
        {props.children}
      </div>

    </div>
    </div>
  );
}

export default sidebar;
