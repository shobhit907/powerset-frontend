import React from "react";
import Sidebar from "react-sidebar";
import NavBar from "../navbar/NavBar";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import StudentGeneralDetails from "./StudentGeneralDetails";
import WorkExperience from "./WorkExperience";
import Semesters from "./Semesters";
import Projects from "./Projects";
import PositionOfResponsibility from "./PositionsOfResponsibility";
import Courses from "./Courses";
import Awards from "./Awards";

import "./ProfilePage.css";

export default function ProfilePage(props) {
    return (
      <Container >
          <NavBar></NavBar>
        <div class="flex" id="">
          <nav class="sidebar">
            <a href="#student-general-details">
              <i class="fa fa-user fa-lg"></i>
              <span>About</span>
            </a>

            <a href="#work-experience">
              <i class="fa fa-briefcase fa-lg"></i>
              <span>Work Experience</span>
            </a>

            <a href="#projects">
              <i class="fa fa-tasks fa-lg"></i>
              <span>Projects</span>
            </a>

            <a href="#courses">
              <i class="fa fa-certificate fa-lg"></i>
              <span>Courses</span>
            </a>

            <a href="#semesters">
              <i class="fa fa-book fa-lg"></i>
              <span>Education</span>
            </a>

            <a href="#positions-of-responsibility">
              <i class="fa fa-users fa-lg"></i>
              <span>Positions of responsibility</span>
            </a>

            <a href="#awards">
              <i class="fa fa-trophy fa-lg"></i>
              <span>Awards</span>
            </a>

          </nav>
          <div class="contents">
            
            <StudentGeneralDetails {...props}></StudentGeneralDetails>
            <br></br><br></br>
            <WorkExperience {...props}></WorkExperience>
            <br></br><br></br>
            <Projects {...props}></Projects>
            <br></br><br></br>
            <Courses {...props}></Courses>
            <br></br><br></br>
            <Semesters {...props}></Semesters>
            <br></br><br></br>
            <PositionOfResponsibility {...props}></PositionOfResponsibility>
            <br></br><br></br>
            <Awards {...props}></Awards>
            <br></br><br></br>
          </div>
        </div>
        <footer>
          <div class="left">
            Copyright ©2021 Powerset | Team B3 - IIT Ropar
          </div>
          <div class="right">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
        </footer>
      </Container>
    );
}

