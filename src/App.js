import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './services/api';

import Routes from './routes'

//_Layout CSS
import './pages/res/css/_layout.css'
import './pages/Login/login.css'

const App = () => <Routes />

export default App;