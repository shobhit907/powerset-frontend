import React, { useState } from 'react';
import './bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ConfirmEmail from "./components/ConfirmEmail"
import CreateJob from './components/CreateJob';
import JobsList from "./components/JobsList";
import PrivateRoute from "./components/PrivateRoute";
import StudentDashBoard from "./components/student-profile/StudentDashboard";
import ProfilePage from "./components/student-profile/ProfilePage";
import TestApp from './components/TestApp';
import JobsAppliedByStudent from './components/student-profile/JobsAppliedByStudent';
import AppliedStudentsTable from './components/AppliedStudentsList';
import ViewStudent from "./components/ViewStudent";
import JobsListCoordinator from "./components/JobsListCoordinator";
import StudentsListForCoordinator from "./components/StudentsListForCoordinator";
import CoordinatorDashboard from "./components/CoordinatorDashboard";
import ViewJob from "./components/ViewJob";
import TeamPage from "./components/TeamPage";
import EditJobForCoordinator from './components/EditJobForCoordinator';

function App() {

  return (

    <Router>
      <div className="App" style={{ overflow: "scroll", scrollbars: "hidden" ,backgroundColor: '#e1e8e7'}}>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/testapp" component={TestApp} />
          <PrivateRoute exact path="/" component={StudentDashBoard} />
          <Route path="/our-team" component={TeamPage}></Route>
          <PrivateRoute path="/profile" component={ProfilePage} student_id={-1}></PrivateRoute>
          <Route path="/auth/activate/" component={ConfirmEmail} />
          <PrivateRoute path="/add-job" component={CreateJob} />
          <PrivateRoute exact path="/job-profiles" component={JobsList} />
          <PrivateRoute exact path="/coordinator-job-profiles/:job_id" component={EditJobForCoordinator}></PrivateRoute>
          <PrivateRoute exact path="/job-profile/:job_id" component={ViewJob}></PrivateRoute>
          
          <PrivateRoute path="/applicants/" component={AppliedStudentsTable}/>
          <PrivateRoute path="/student/:student_id" component={ViewStudent}></PrivateRoute>
          <PrivateRoute path="/students/" component={StudentsListForCoordinator}/>
          <PrivateRoute path="/jobs-list/" component={JobsListCoordinator}/>
          <PrivateRoute exact path="/coordinator" component={CoordinatorDashboard} />
        </Switch>
      </div>

    </Router>



  )
}

export default App;
