import React from 'react';
import styled from 'styled-components';
import NavBar from "./NavBar";
import Scrollspy from 'react-scrollspy';
import ScrollspyNav from "react-scrollspy-nav";
import PageProgress from "react-page-progress";
import Form1 from "./StudentDetailsPage1";
import Form2 from "./StudentDetailsPage2";
import Form3 from "./StudentDetailsPage3";
import Form4 from "./StudentDetailsPage4";


export default function ProfilePage() {
    return (
        <div>
            <PageProgress color={'skyblue'} height={10} />
            <NavBar></NavBar>
            <li><a href="#form1">Form1</a></li>
            <li><a href="#form2">Form2</a></li>
            <li><a href="#form3">Form3</a></li>
            <li><a href="#form4">Form4</a></li>
            <Form1></Form1>
            <Form2></Form2>
            <Form3></Form3>
            <Form4></Form4>
        </div>
    );
}