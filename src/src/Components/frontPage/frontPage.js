import React from "react";
import { NavLink } from "react-router-dom";
import loginstyle from "./frontPage.module.css";

// Loginstyle for background and 2 element for table and web bar

function FrontPage(){
    return(
        
          <div className={loginstyle.login}>
            <div className = {loginstyle.icon}/>
            <h1 className={loginstyle.string}>INSTAI</h1>
            <button className={loginstyle.button_common }>
            <NavLink to="/Login">
                Login
            </NavLink>
            </button>
        
            <button className={loginstyle.button_common}>
            <NavLink to="/signup">
                Register
            </NavLink>
            </button>
            <div style={{color :'white'}}> A test web for processing image and model for visual identify,
            and provide the function of AWS and Stable diffusion
            </div>
          </div>
       
    );
}

export default FrontPage;
