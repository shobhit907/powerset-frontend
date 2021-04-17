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
function App() {

  return (

    <Router>
      <div className="App" style={{ overflow: "scroll", scrollbars: "hidden" }}>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/testapp" component={TestApp} />
          <PrivateRoute exact path="/" component={StudentDashBoard} />
          <PrivateRoute path="/profile" component={ProfilePage} student_id={-1}></PrivateRoute>
          <PrivateRoute path="/auth/activate/" component={ConfirmEmail} />
          <PrivateRoute path="/add-job" component={CreateJob} />
          <PrivateRoute path="/job-profiles" component={JobsList} />
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
