import React, { Component, Fragment,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
export default function Form3() {
    const [dummy,setDummy]=useState(0);
    const [projects, setProjects] = useState([{ title: "", start: "",end: "",description:"" }]);
    const [noOfProjects,setNoOfProjects]=useState(1);
    const [awards, setAwards] = useState([{ title: "", description: "",issuer: "",date:"" }]);
    const [noOfAwards,setNoOfAwards]=useState(1);
    const [work_experience, setWorkExperience] = useState([{ jobTitle: "",company:"",location:"",stipend:"", start: "",end: "",description:"" }]);
    const [noOfWorkExperience,setNoOfWorkExperience]=useState(1);
    const [por, setPor] = useState([{ title: "", from: "",to: "",organisation:"",description:"" }]);
    const [noOfPor,setNoOfPor]=useState(1);
    const [courses, setCourses] = useState([{ code:"",title: "",grade:""}]);
    const [noOfCourses,setNoOfCourses]=useState(1);

    const handleInputChange = (e, index,field) => {
        const { name, value } = e.target;
        
        switch(field){
            case 1:
                const list = [...projects];
                list[index][name] = value;
                setProjects(list);
                break;
            case 2:
                const list2 = [...awards];
                list2[index][name] = value;
                setAwards(list2);
                break;
            case 3:
                const list3 = [...work_experience];
                list3[index][name] = value;
                setWorkExperience(list3);
                break;
            case 4:
                const list4 = [...por];
                list4[index][name] = value;
                setPor(list4);
                break;
            case 5:
                const list5 = [...courses];
                list5[index][name] = value;
                setCourses(list5);
                break;
        }
        
      };
    const handleAddClick = (field) => {
         switch(field){
             case 1:
                setProjects([...projects, { title: "", start: "",end: "",description:"" }]);
                setNoOfProjects(noOfProjects+1);
                break;
            case 2:
                setAwards([...awards, { title: "", description: "",issuer: "",date:"" }]);
                setNoOfAwards(noOfAwards+1);
                break;
            case 3:
                setWorkExperience([...work_experience, { jobTitle: "",company:"",location:"",stipend:"", start: "",end: "",description:"" }]);
                setNoOfWorkExperience(noOfWorkExperience+1);
                break;
            case 4:
                setPor([...por, { title: "", from: "",to: "",organisation:"",description:"" }]);
                setNoOfProjects(noOfPor+1);
                break;
            case 5:
                setCourses([...courses, { code:"",title: "",grade:""}]);
                setNoOfCourses(noOfCourses+1);
                break;
        }
    
    };
    const handleRemoveClick = (index,field) => {
        
        switch(field){
            
            case 1:
                const list = [...projects];
                list.splice(index, 1);
                setProjects(list);
                setNoOfProjects(noOfProjects-1);
                break;
            case 2:
                const list2 = [...awards];
                list2.splice(index, 1);
                setAwards(list2);
                setNoOfAwards(noOfAwards-1);
                break;
            case 3:
                const list3 = [...work_experience];
                list3.splice(index, 1);
                setWorkExperience(list3);
                setNoOfWorkExperience(noOfWorkExperience-1);
                break;
            case 4:
                const list4 = [...por];
                list4.splice(index, 1);
                setPor(list4);
                setNoOfPor(noOfPor-1);
                break;
            case 5:
                const list5 = [...courses];
                list5.splice(index, 1);
                setCourses(list5);
                setNoOfCourses(noOfCourses-1);
                break;
        }
    
    };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter your Details
      </Typography>
      
      {projects.map((x,i)=>{
        return(
          
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="title"
            name="title"
            label="Project Title"
            value={x.title}
            onChange={(e) => handleInputChange(e,i,1)}
          />
          </Grid>
        <Grid item xs={12} sm={6}>
        {projects.length !== 1 && <Button
          color="primary"
          onClick={() => handleRemoveClick(i,1)}>Remove Project</Button>}
          </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="start"
            name="start"
            label="Start Date"
            value={x.start}
            onChange={(e) => handleInputChange(e,i,1)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="end"
            name="end"
            label="End Date"
            value={x.end}
            onChange={(e) => handleInputChange(e,i,1)}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        id="description"
        label="Describe the project"
        name="description"
        multiline
        rows={4}
        fullWidth
        value={x.description}
        onChange={(e) => handleInputChange(e,i,1)}
        />
        </Grid>
        {projects.length - 1 === i && <Button color="primary" onClick={()=>handleAddClick(1)} className="btn ">Add Project</Button>}

      </Grid>
          )
      })}


      {awards.map((x,i)=>{
        return(
          
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="title"
            name="title"
            label="Award Title"
            value={x.title}
            onChange={(e) => handleInputChange(e,i,2)}
          />
          </Grid>
        <Grid item xs={12} sm={6}>
        {awards.length !== 1 && <Button
          color="primary"
          onClick={() => handleRemoveClick(i,2)}>Remove Award</Button>}
          </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="start"
            name="date"
            label="Date"
            value={x.date}
            onChange={(e) => handleInputChange(e,i,2)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="end"
            name="issuer"
            label="Issuer"
            value={x.issuer}
            onChange={(e) => handleInputChange(e,i,2)}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        id="description"
        label="Describe the Award"
        name="description"
        multiline
        rows={4}
        fullWidth
        value={x.description}
        onChange={(e) => handleInputChange(e,i,2)}
        />
        </Grid>
        {awards.length - 1 === i && <Button color="primary" onClick={()=>handleAddClick(2)} >Add Award</Button>}

      </Grid>
          )
      })}

    </React.Fragment>
  );
}