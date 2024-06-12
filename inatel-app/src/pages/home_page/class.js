import React, { useState } from "react";

import "./css/class.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowRight } from '@fortawesome/free-solid-svg-icons';
function Class() {

  return (
    <div className="class-body">
        <div className="class-img">
            <div  className="img"></div>
        </div>
        <div className="class-content">
            <spam>C214 - B - I16</spam>
            <spam>21:30</spam>
        </div>
        <div className="class-arrow">
            <FontAwesomeIcon  icon={faArrowRight} className="icon-arrow" />

        </div>
        <div className="class-extra-info"></div>
    </div>
  );
}

export default Class;
