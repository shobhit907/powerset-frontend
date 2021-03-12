import React, { useState } from 'react';
import './bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import MainPage from "./components/StudentDetailsMainPage"
import ConfirmEmail from "./components/ConfirmEmail"
import CreateJob from './components/CreateJob';
import JobsList from "./components/JobsList";
import PrivateRoute from "./components/PrivateRoute";
function App() {

  return (

    <Router>
      <div className="App" style={{ overflow: "scroll", scrollbars: "hidden" }}>

        <Switch>
          <Route path="/navbar"></Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute path="/auth/activate/" component={ConfirmEmail} />
          <PrivateRoute path="/add-job" component={CreateJob} />
          <PrivateRoute path="/apply" component={JobsList} />
        </Switch>
      </div>

    </Router>



  )
}

export default App;
