import React, { Component, Fragment,useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const axios = require('axios')
const qs = require('querystring')
//const FormData=require('FormData')
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile_no, setMobileNo] = useState("");
    const history = useHistory();
    function validateForm() {
        if(email.length > 0 && password.length > 0 && name.length>0){
            return true;
        }
        else return false;
    }
    const useStyles = makeStyles((theme) => ({
      root: {
        height: '100vh',
      },
      image: {
        backgroundImage: 'url(https://app.joinsuperset.com/images/login_abstract_1.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', 
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
    const classes = useStyles();
        
        
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email,password);

        let data = new FormData();
        console.log('boundary:', data._boundary);
    data.set('email', email);
        data.set('password', password);
        data.set('name', name);
        data.set('address', address);
        data.set('mobile_no', mobile_no);
        axios({
          method: 'post',
          url: 'https://powerset-backend.herokuapp.com/auth/users/',
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          data : data,
          
        })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          alert("Account Created Successfully");
          history.push("/login");
        })
        .catch(function (err) {
          console.log(err);
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            alert("Either details are not right or account already exists");
          }        }
        );
      }

        return (
          <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              
              <Typography component="h1" variant="h5" >
                Sign Up

              </Typography>
            <Form onSubmit={handleSubmit}>

                <Form.Group size="lg" controlId="Name">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
                autoFocus
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>
            
            <Form.Group size="lg" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
                autoFocus
                type="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            </Form.Group>

            <Form.Group size="lg" controlId="address">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
                autoFocus
                type="mob_no"
                value={mobile_no}
                onChange={(e) => setMobileNo(e.target.value)}
            />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()} color="primary">
            Sign Up
            </Button>
                
            <p className="forgot-password text-right">
                Already registered <a href="/login">Sign in?</a>
            </p>
            </Form>
            </div>
            
      </Grid>
    </Grid>
        );
    
}