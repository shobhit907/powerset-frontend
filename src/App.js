import React, { useState } from 'react';
import axios from 'axios';
import './bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import MainPage from "./components/StudentDetailsMainPage"
import ConfirmEmail from "./components/ConfirmEmail"
import Particles from 'react-particles-js';
import particlesConfig from './Config/particlesConfig';
import CreateJob from './components/CreateJob';
import JobsList from "./components/JobsList";
import AppliedStudentsTable from "./components/AppliedStudentsList";
import StudentsListForCoordinator from "./components/StudentsListForCoordinator";
import JobsListCoordinator from "./components/JobsListCoordinator";
import JobsAppliedByStudent from './components/JobsAppliedByStudent';

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
          <Route path="/coordinator/applicants/" component={AppliedStudentsTable}/>
          <Route path="/coordinator/students/" component={StudentsListForCoordinator}/>
          <Route path="/coordinator/jobs-list/" component={JobsListCoordinator}/>
          <Route path="/jobs-applied/" component={JobsAppliedByStudent}/>
          </Switch>
        </div>
      
    </Router>
    
    
    
  )
}

export default App;
