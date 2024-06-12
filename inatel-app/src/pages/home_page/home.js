import React, { useState } from "react";
import Swal from 'sweetalert2';

import "./css/home.css";
import Class from "./class";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';

function HomePage() {


    

  return (
    <div className="home-body">
      <div className="home-card">
        <div className="home-title">
          <FontAwesomeIcon icon={faBars} className="icon" />
          <spam>Inatel</spam>
          <FontAwesomeIcon icon={faBell} className="icon" />
        </div>
        <div className="home-classes">
            <div className="home-classes-title">
                Today's Classes
              </div>
            <div className="home-classes-body">
              
              <Class></Class>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
