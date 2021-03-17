import React from "react";
import Sidebar from "react-sidebar";
import NavBar from "./NavBar";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import Form1 from "./StudentDetailsPage1";
import Form2 from "./StudentDetailsPage2";
import Form3 from "./StudentDetailsPage3";
import Form4 from "./StudentDetailsPage4";

const MyStyledDiv = styled.div`
    .sidenav {
        height: 100%;
        width: 160px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 20px;
        margin-top: 50px;
      }
      
      .sidenav a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
      }
      
      .sidenav a:hover {
        color: #f1f1f1;
      }
      
      .main {
        margin-left: 160px; /* Same as the width of the sidenav */
        padding: 0px 10px;
      }
      @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
      }
}
`;

class TestApp extends React.Component {
    render() {
        return (
            <div>
                <MyStyledDiv>
                    <Container style={{ margin: 0, padding: 0 }} fluid>
                        <Row><div><NavBar></NavBar></div></Row>
                        <Row>
                            <div class="sidenav">
                                <a href="#form1">Form1</a>
                                <a href="#form2">Form2</a>
                                <a href="#form3">Form3</a>
                                <a href="#form4">Form4</a>
                            </div>

                            <div class="main">
                                <Form1></Form1>
                                <Form2></Form2>
                                <Form3></Form3>
                                <Form4></Form4>
                                {/* <h2>Sidebar</h2>
                    <p>This sidebar is of full height (100%) and always shown.</p>
                    <p>Scroll down the page to see the result.</p>
                    <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
                    <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
                    <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
                    <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p> */}
                            </div>
                        </Row>
                    </Container>
                </MyStyledDiv>
                {/* <div class="container-fluid">
                    <div class="row row-offcanvas row-offcanvas-left">
                        <div class="col-xs-1 col-sm-1 sidebar-offcanvas" id="sidebar" role="navigation">
                            <div class="sidebar-nav">
                                <ul class="nav">

                                    <li class="active"><a href="#">Link</a></li>
                                    <li><a href="#">Link</a></li>
                                    <li><a href="#">Link</a></li>
                                    <li class="nav-divider"></li>
                                    <li><a href="#">Link</a></li>
                                    <li><a href="#">Link</a></li>
                                    <li><a href="#">Link</a></li>
                                    <li class="nav-divider"></li>
                                    <li><a href="#">Link</a></li>
                                    <li><a href="#">Link</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-xs-11 col-sm-11">
                            <br />
                            <div class="jumbotron">
                                <a href="#" class="visible-xs" data-toggle="offcanvas"><i class="fa fa-lg fa-reorder"></i></a>
                                <h1>Hello, world!</h1>
                                <p>This is an example to show the potential of an offcanvas layout pattern in Bootstrap. Try some responsive-range viewport sizes to see it in action.</p>
                            </div>
                            <div class="row">
                                <div class="col-6 col-sm-6 col-lg-4">
                                    <h2>Heading</h2>
                                    <p>Bootstrap is a front-end framework that uses CSS and JavaScript to facilitate responsive Web design. Bootply is a playground for Bootstrap that enables developers and designers to test, prototype and create mockups using Bootstrap
                        friendly HTML, CSS and Javascript.</p>
                                    <p><a class="btn btn-default" href="#">View details »</a></p>
                                </div>
                                <div class="col-6 col-sm-6 col-lg-4">
                                    <h2>Heading</h2>
                                    <p>Bootply is a playground for Bootstrap that enables developers and designers to test, prototype and create mockups using Bootstrap friendly HTML, CSS and Javascript. Bootstrap is a front-end framework that uses CSS and JavaScript to
                        facilitate responsive Web design. </p>
                                    <p><a class="btn btn-default" href="#">View details »</a></p>
                                </div>

                                <div class="col-6 col-sm-6 col-lg-4">
                                    <h2>Heading</h2>
                                    <p>Bootstrap is a front-end framework that uses CSS and JavaScript to facilitate responsive Web design. Bootply is a playground for Bootstrap that enables developers and designers to test, prototype and create mockups using Bootstrap
                        friendly HTML, CSS and Javascript.</p>
                                    <p><a class="btn btn-default" href="#">View details »</a></p>
                                </div>
                                <div class="col-6 col-sm-6 col-lg-4">
                                    <h2>Heading</h2>
                                    <p>Bootstrap is a front-end framework that uses CSS and JavaScript to facilitate responsive Web design. Bootply is a playground for Bootstrap that enables developers and designers to test, prototype and create mockups using Bootstrap
                        friendly HTML, CSS and Javascript.</p>
                                    <p><a class="btn btn-default" href="#">View details »</a></p>
                                </div>
                            </div>
                        </div></div></div> */}
            </div>
        );
    }
}

export default TestApp;