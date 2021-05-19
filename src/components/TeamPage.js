import React, { Component, Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { Row } from "reactstrap";
import { Col } from "@themesberg/react-bootstrap";


export default function TeamPage(){
    return (
        <Container style={{marginTop:"100px", display:"flex", justifyContent:"center"}}>
            <Row>
                <Col>Meet the team</Col>
            </Row>
            <Row>
                <Col>Member 1</Col>
                <Col>Member 2</Col>
                <Col>Member 3</Col>
            </Row>
        </Container>
    )
};