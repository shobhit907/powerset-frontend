import React, { useState } from 'react';
import axios from 'axios';
import './bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import MainPage from "./components/StudentDetailsMainPage"
import ConfirmEmail from "./components/ConfirmEmail"
import Form2 from "./components/StudentDetailsPage2"
import Particles from 'react-particles-js';
import particlesConfig from './Config/particlesConfig';
import CreateJob from './components/CreateJob';
import JobsList from "./components/JobsList"
function App() {
  
  return (
    
    <Router>
    <div className="App" style={{  overflow: "scroll", scrollbars:"hidden" }}>
        
          <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/edit-details" component={MainPage} />
          <Route path="/auth/activate/" component={ConfirmEmail} />
          <Route path="/add-job" component={CreateJob}/>
          <Route path="/apply" component={JobsList}/>
          </Switch>
        </div>
      
    </Router>
    
    
    
  )
}

export default App;
