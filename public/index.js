import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../../services/api'

import { FaUserCog } from "react-icons/fa";

//_Layout CSS
import '.././res/css/_layout.css'


function Root() {
    return (
    <>
    <FaUserCog />
    <div id="rootao"></div>
    
    </>
  );
}

export default Root;
