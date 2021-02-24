import React, { Component, Fragment,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';  
import Checkbox from '@material-ui/core/Checkbox';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const axios = require('axios')
const qs = require('querystring')
const moment=require('moment')
export default function Form2() {
    const [technical_skills,setTechnicalSkills]=useState("");
    const [volunteer_experience,setVolunteerExperience]=useState("");
    const [career_plans,setCareerPlans]=useState("");
    const [introduction,setIntroduction]=useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter your Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            
            id="intro"
            name="intro"
            label="Tell us about yourself"
            fullWidth
            multiline
            rows={4}  
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            
            id="plans"
            name="plans"
            label="Tell us your career plans"
            fullWidth
            multiline
            rows={4}
            value={career_plans}
            onChange={(e) => setCareerPlans(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tech_skills"
            name="tech_skills"
            label="List your Technical Skills"
            fullWidth
            multiline
            rows={4}
            value={technical_skills}
            onChange={(e) => setTechnicalSkills(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        id="volunteer"
        label="Enter your Volunteer Experience"
        multiline
        rows={4}
        fullWidth
        value={volunteer_experience}
        onChange={(e) => setVolunteerExperience(e.target.value)}
        />
        </Grid>
        

      </Grid>
    </React.Fragment>
  );
}