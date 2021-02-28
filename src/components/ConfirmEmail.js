import React, { Component, Fragment,useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const axios = require('axios')
const qs = require('querystring')

export default function ConfirmEmail(){
    var pathArray = window.location.pathname.split('/');
    let uid=pathArray[3];
    let token=pathArray[4];
    let data=new FormData();
    const [output,setOutput]=useState("There was some problem while verifying your account, please try again");
    data.set('uid',uid);
    data.set('token',token);
    axios({
        method: 'post',
        url: 'https://powerset-backend.herokuapp.com/auth/users/activation/',
        headers:{
          'Content-Type': 'multipart/form-data',
        },
        data : data,
        
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setOutput("Your Email has been confirmed, now you can sign in");

      })
      .catch(function (err) {
        console.log(err);
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          }
      }
      );
    console.log(pathArray);
    return(
        <p>{output}</p>
    );
}