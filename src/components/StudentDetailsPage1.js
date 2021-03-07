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
export default function Form1() {
    const [DOB, onChangeDOB] = useState(new Date());
    const [institute,setInstitute]=useState("");
    const [branch,setBranch]=useState("");
    const [profile,setProfile]=useState("");
    const [degree,setDegree]=useState("");
    const [fathers_name,setFathersName]=useState("");
    const [mothers_name,setMothersName]=useState("");
    const [category,setCategory]=useState("");
    const [technical_skills,setTechnicalSkills]=useState("");
    const [entry_no,setEntryNo]=useState("");
    const [volunteer_experience,setVolunteerExperience]=useState("");
    const [career_plans,setCareerPlans]=useState("");
    const [introduction,setIntroduction]=useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter your Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="fathersName"
            name="fathersName"
            label="Father's Name"
            fullWidth
            autoComplete="Father's Name"
            value={fathers_name}
            onChange={(e) => setFathersName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="mothersName"
            name="mothersName"
            label="Mother's Name"
            fullWidth
            autoComplete="Mother's Name"
            value={mothers_name}
            onChange={(e) => setMothersName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="entryno"
            name="entryno"
            label="Entry No"
            fullWidth
            autoComplete="Entry No"
            value={entry_no}
            onChange={(e) => setEntryNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        id="DOB"
        label="Date of Birth"
        type="date"
        defaultValue="2000-05-05"
        InputLabelProps={{
        shrink: true,
        }}
        value={DOB}
        onChange={(e) => onChangeDOB(e.target.value)}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-label">Select Institute</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputProps={{ 'aria-label': 'Without label' }}
          value={institute}
          onChange={(e) => setInstitute(e.target.value)}
        >
        <MenuItem value={""}>Select.. </MenuItem>
          <MenuItem value={"Indian Institute of Technology Bombay"}>Indian Institute of Technology Bombay</MenuItem>
          <MenuItem value={"Indian Institute of Technology Delhi"}>Indian Institute of Technology Delhi</MenuItem>
          <MenuItem value={"Indian Institute of Technology Ropar"}>Indian Institute of Technology Ropar</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-label">Select Degree</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputProps={{ 'aria-label': 'Without label' }}
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        >
        <MenuItem value={""}>Select.. </MenuItem>
          <MenuItem value={"BTech"}>B.Tech</MenuItem>
          <MenuItem value={"MTech"}>M.Tech</MenuItem>
          <MenuItem value={"Dual Degree"}>Dual Degree</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputProps={{ 'aria-label': 'Without label' }}
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
        <MenuItem value={""}>Select.. </MenuItem>
        <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
        <MenuItem value={"Electrical"}>Electrical</MenuItem>
        <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-label">Select Profile</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputProps={{ 'aria-label': 'Without label' }}
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        >
        <MenuItem value={""}>Select.. </MenuItem>
          <MenuItem value={"Software"}>Software</MenuItem>
          <MenuItem value={"Core"}>Core Engineering</MenuItem>
          <MenuItem value={"Non Core"}>Non Core</MenuItem>
          <MenuItem value={"Consulting"}>Consulting</MenuItem>
        </Select>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}