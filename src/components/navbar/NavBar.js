import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "reactjs-navbar";
import logo from "../../images/powerset-logo.jpeg";
import { Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import {
  faUsers,
  faBookOpen,
  faGlobe,
  faChartPie,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

const NavBar = () => {
  const history = useHistory();

  return (
    <Container style={{ margin: 0, padding: 0 }} fluid>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <b>Powerset</b>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse my-powerset-navbar" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/job-profiles">
                Job Profiles
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">
                My Profile
              </a>
            </li>
            {/* <li class="nav-item">
              <a class="nav-link" href="/interviews">
                Interviews
              </a>
            </li> */}
            <li class="nav-item">
              <a class="nav-link" href="/coordinator">
                Coordinator View
              </a>
            </li>
          </ul>

          <button
            class="btn btn-outline-danger my-2 my-sm-0"
            type="submit"
            style={{ float: 'right' }}
            onClick={()=>{
              localStorage.removeItem('token');
              history.push('/login');
            }}
          >
            Log out
          </button>
        </div>
      </nav>
    </Container>
  );
};
export default NavBar;
