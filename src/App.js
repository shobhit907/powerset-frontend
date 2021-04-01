import React, { useState } from 'react';
import './bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import MainPage from "./components/StudentDetailsMainPage"
import ConfirmEmail from "./components/ConfirmEmail"
import CreateJob from './components/CreateJob';
import JobsList from "./components/JobsList";
import PrivateRoute from "./components/PrivateRoute";
import StudentDashBoard from "./components/StudentDashboard";
import ProfilePage from "./components/ProfilePage";
function App() {

  return (

    <Router>
      <div className="App" style={{ overflow: "scroll", scrollbars: "hidden" }}>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          {/* <Route path="/testapp" component={ProfilePage} /> */}
          <PrivateRoute exact path="/" component={StudentDashBoard} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/auth/activate/" component={ConfirmEmail} />
          <PrivateRoute path="/add-job" component={CreateJob} />
          <PrivateRoute path="/job-profiles" component={JobsList} />
        </Switch>
      </div>

    </Router>



  )
}

export default App;
