import React, { Component, Fragment,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const axios = require('axios')
const qs = require('querystring')
const moment=require('moment')


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
      },
    },
    
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  }));
  
export default function CreateJob(){
    const [job_title,setJobTitle]=useState("");
    const [domain,setDomain]=useState("");
    const [description,setDescription]=useState("");
    const [minCgpa,setMinCgpa]=useState(0.0);
    const [minCtc,setMinCtc]=useState(0);
    const [maxCtc,setMaxCtc]=useState(0);
    const [lastDate,setLastDate]=useState(new Date());
    const [eligibleBatches,setEligibleBatches]=useState({firstYear:false,secondYear:false,thirdYear:false,fourthYear:false});
    const [eligibleBranches,setEligibleBranches]=useState({cs:false,elec:false,mech:false,chem:false,civil:false,met:false});
    const classes = useStyles();

    const handleBatch = (event) => {
      setEligibleBatches({ ...eligibleBatches, [event.target.name]: event.target.checked });
    };
    const handleBranch = (event) => {
      setEligibleBranches({ ...eligibleBranches, [event.target.name]: event.target.checked });
    };

    return(
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Enter Job Details
          </Typography>
          <Grid container spacing={3} alignContent="center">
          <Grid item xs={12} sm={6}>
          <TextField
            
            id="jobTitle"
            name="jobTitle"
            label="Enter Job Title"
            autoComplete="Job Title"
            value={job_title}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          </Grid>
          <Grid item xs={12} sm={6} alignContent="center">
          <InputLabel id="demo-simple-select-label">Select Domain</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputProps={{ 'aria-label': 'Without label' }}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
        <MenuItem value={""}>Select.. </MenuItem>
          <MenuItem value={"software"}>Software/IT</MenuItem>
          <MenuItem value={"non-core"}>Non Core (Banking/Finance etc)</MenuItem>
          <MenuItem value={"core"}>Core Engineering</MenuItem>
          <MenuItem value={"consulting"}>Consulting</MenuItem>
        </Select>
          </Grid>
        
          <Grid item xs={12}>
          <TextField
            
            id="description"
            name="description"
            label="Add description about the job"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            
            id="minCTC"
            name="minCTC"
            label="Minimum CTC"
            value={minCtc}
            onChange={(e) => setMinCtc(e.target.value)}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
            
            id="maxCTC"
            name="maxCTC"
            label="Maximum CTC"
            value={maxCtc}
            onChange={(e) => setMaxCtc(e.target.value)}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
            
            id="minCG"
            name="minCG"
            label="Minimum CGPA"
            value={minCgpa}
            onChange={(e) => setMinCgpa(e.target.value)}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
        <TextField
        id="LastDate"
        label="Last Date to Apply"
        type="date"
        defaultValue="2021-10-10"
        InputLabelProps={{
        shrink: true,
        }}
        value={lastDate}
        onChange={(e) => setLastDate(e.target.value)}
        />
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputLabel>Select Eligible Batches</InputLabel>
        <FormGroup column>
      <FormControlLabel
        control={<Checkbox checked={eligibleBatches.firstYear} onChange={handleBatch} name="firstYear" />}
        label="First Year"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBatches.secondYear} onChange={handleBatch} name="secondYear" />}
        label="Second Year"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBatches.thirdYear} onChange={handleBatch} name="thirdYear" />}
        label="Third Year"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBatches.fourthYear} onChange={handleBatch} name="fourthYear" />}
        label="Fourth Year"
      />

      </FormGroup>
        </Grid>


        <Grid item xs={12} sm={6}>
        <InputLabel>Select Eligible Branches</InputLabel>
        <FormGroup column>
      <FormControlLabel
        control={<Checkbox checked={eligibleBranches.cs} onChange={handleBranch} name="cs" />}
        label="Computer Science"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBranches.elec} onChange={handleBranch} name="elec" />}
        label="Electrical"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBranches.mech} onChange={handleBranch} name="mech" />}
        label="Mechanical"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBranches.chem} onChange={handleBranch} name="chem" />}
        label="Chemical"
      />
      <FormControlLabel
      control={<Checkbox checked={eligibleBranches.civil} onChange={handleBranch} name="civil" />}
      label="Civil"
    />
    <FormControlLabel
        control={<Checkbox checked={eligibleBranches.meta} onChange={handleBranch} name="meta" />}
        label="Metallurgy"
      />
      </FormGroup>
        </Grid>

          </Grid>
        </Paper>
        </main>
    </React.Fragment>
    );
}