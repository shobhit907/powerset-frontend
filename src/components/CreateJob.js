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
import NavBar from "./navbar/NavBar";
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
    const [company,setCompany]=useState("");
    const [placement, setPlacement]=useState("");
    const [domain,setDomain]=useState("");
    const [description,setDescription]=useState("");
    const [minCgpa,setMinCgpa]=useState(0.0);
    const [maxBacklogs,setMaxBacklogs]=useState(0);
    const [minCtc,setMinCtc]=useState(0.0);
    const [maxCtc,setMaxCtc]=useState(0.0);
    const [lastDate,setLastDate]=useState(new Date());
    const [startDate,setStartDate]=useState(new Date());
    const [eligibleBatches,setEligibleBatches]=useState({firstYear:false,secondYear:false,thirdYear:false,fourthYear:false});
    const [eligibleBranches,setEligibleBranches]=useState({CSE:false,EE:false,ME:false,MNC:false,CE:false,MME:false}); // replace mnc with chem
    const [eligibleGenders,setEligibleGenders]=useState({M:false,F:false,O:false});
    const [salaryBreakup,setSalaryBreakup]=useState("");
    const [additionalInfo, setAdditionalInfo]=useState("");
    const classes = useStyles();
    let token=localStorage.getItem('token');
    const handleBatch = (event) => {
      setEligibleBatches({ ...eligibleBatches, [event.target.name]: event.target.checked });
    };
    const handleBranch = (event) => {
      setEligibleBranches({ ...eligibleBranches, [event.target.name]: event.target.checked });
    };
    const handleGender =(event)=>{
      setEligibleGenders({...eligibleGenders,[event.target.name]:event.target.checked});
    }
    const handleSubmit=()=>{
      var branches=[];
      for(const [key,value] of Object.entries(eligibleBranches)){
        if(value==true){
          branches=[...branches,key];
          
        }

        //console.log(key);
      }
      var genders=[]
      for(const [key,value] of Object.entries(eligibleGenders)){
        if(value==true){
          genders=[...genders,key];
          
        }

        //console.log(key);
      }
      //console.log(branches);

      let data=new FormData();
      data.set('company',company);
      data.set('placement',placement);
      data.set('title',job_title);
      data.set('domain',domain);
      data.set('min_cgpa',minCgpa);
      data.set('description',description);
      data.set('min_ctc',minCtc);
      data.set('max_ctc',maxCtc);
      data.set('start_date',startDate);
      data.set('end_date',lastDate);
      data.set('max_backlogs',maxBacklogs);
      data.set('branches_eligible', JSON.stringify(branches));
      data.set('salary_breakup',salaryBreakup);
      data.set('gender_allowed',JSON.stringify(genders));
      data.set('extra_data',additionalInfo);
      console.log(token);
      axios({
        method: 'post',
        url:'https://powerset-backend.herokuapp.com/placements/job-profiles/',
        headers:{
          'Content-Type':'multipart/form-data',
          'Authorization':token,
    
        },
        data:data,
        
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      });
      
    }
    return(
      <div>
        <NavBar></NavBar>
    <React.Fragment>
      <CssBaseline />
      
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Enter Job Details
          </Typography>
          <Grid container spacing={4} alignContent="center">

          <Grid item xs={12} sm={6}>
          <TextField
            
            id="company"
            name="company"
            label="Enter Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          </Grid>
          <Grid>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputProps={{ 'aria-label': 'Without label' }}
          value={placement}
          onChange={(e) => setPlacement(e.target.value)}
          fullWidth
        >
        <MenuItem value={""}>Select.. </MenuItem>
          <MenuItem value={"Intern"}>Internship</MenuItem>
          <MenuItem value={"Placement"}>Placement</MenuItem>
        </Select>
          </Grid>
        
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
          fullWidth
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
            
            id="maxBacklogs"
            name="maxBacklogs"
            label="Max Backlogs Allowed"
            value={maxBacklogs}
            onChange={(e) => setMaxBacklogs(e.target.value)}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
          id="StartDate"
          label="Application Start Date"
          // type="date"
          // defaultValue="2021-10-10"
          InputLabelProps={{
          shrink: true,
          }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          />
          </Grid>

          <Grid item xs={12} sm={6}>
        <TextField
        id="LastDate"
        label="Last Date to Apply"
        // type="date"
        // defaultValue="2021-10-10"
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
        control={<Checkbox checked={eligibleBranches.cs} onChange={handleBranch} name="CSE" />}
        label="Computer Science"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBranches.elec} onChange={handleBranch} name="EE" />}
        label="Electrical"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBranches.mech} onChange={handleBranch} name="ME" />}
        label="Mechanical"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleBranches.chem} onChange={handleBranch} name="MNC" />} // change here
        label="Chemical"
      />
      <FormControlLabel
      control={<Checkbox checked={eligibleBranches.civil} onChange={handleBranch} name="CE" />}
      label="Civil"
    />
    <FormControlLabel
        control={<Checkbox checked={eligibleBranches.meta} onChange={handleBranch} name="MME" />}
        label="Metallurgy"
      />
      </FormGroup>
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <InputLabel>Select Eligible Genders</InputLabel>
        <FormGroup column>
      <FormControlLabel
        control={<Checkbox checked={eligibleGenders.M} onChange={handleGender} name="M" />}
        label="Male"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleGenders.F} onChange={handleGender} name="F" />}
        label="Female"
      />
      <FormControlLabel
        control={<Checkbox checked={eligibleGenders.O} onChange={handleGender} name="O" />}
        label="Others"
      />
     
      </FormGroup>
        </Grid>
        

        <Grid item xs={12} sm={6}>
          <TextField
            
            id="salary breakup"
            name="salary_breakuo"
            label="Add Salary Breakup information"
            fullWidth
            multiline
            rows={4}
            value={salaryBreakup}
            onChange={(e) => setSalaryBreakup(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            
            id="additional_info"
            name="additional_info"
            label="Add Additional information, or link to google form you want students to fill"
            fullWidth
            multiline
            rows={4}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </Grid>
        <Grid xs={12} justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={handleSubmit}>
        Submit
        </Button>
        </Grid>
          </Grid>
          
          
        </Paper>
        </main>
    </React.Fragment>
    </div>
    );
}