import React, { Component, Fragment,useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const axios = require('axios')
const qs = require('querystring')

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    function validateForm() {
        return email.length > 0 && password.length > 0;
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
        data.set('email', email);
        data.set('password', password);
        let token="";
        axios({
          method: 'post',
          url: 'https://powerset-backend.herokuapp.com/auth/token/login/',
          headers:{
            'Content-Type': 'multipart/form-data',
          },
          data : data,
          
        })
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          token="Token "+response.data.auth_token;
          console.log("Logged in");
          console.log(token);
          localStorage.setItem('token',token);
          const headers = {
            'Authorization': token,
            
        };
          axios.get('https://powerset-backend.herokuapp.com/students/me/',{headers})
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          }
        })
        history.push('/edit-details');
        })
        .catch(function (err) {
          console.log(err);
          alert("Wrong Email or Password");
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          }
        }
        );
        

      
      }
    
    
        return (
          <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={!validateForm}
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
        );
    
}