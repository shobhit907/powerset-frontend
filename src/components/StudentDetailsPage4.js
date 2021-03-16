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
import { formatMs } from '@material-ui/core';
const axios = require('axios')
const qs = require('querystring')
const moment=require('moment')
export default function Form() {
    const [dummy,setDummy]=useState(0);
    const [projects, setProjects] = useState([{ title: "abc", start_date: "2020-05-06",end_date: "2020-05-07",description:"VFDDFV",domain:"abc" }]);
    const [noOfProjects,setNoOfProjects]=useState(1);
    const [awards, setAwards] = useState([{ title: "", description: "",issuer: "",issue_date:"" }]);
    const [noOfAwards,setNoOfAwards]=useState(1);
    const [work_experience, setWorkExperience] = useState([{ job_title: "",company:"",location:"", start_date: "",end_date: "",description:"",compensation:0 }]);
    const [noOfWorkExperience,setNoOfWorkExperience]=useState(1);
    const [por, setPor] = useState([{ title: "", from_date: "",to_date: "",organization_name:""}]);
    const [noOfPor,setNoOfPor]=useState(1);
    const [courses, setCourses] = useState([{ code:"",title: "",grade_secured:""}]);
    const [noOfCourses,setNoOfCourses]=useState(1);
    const [semesters,setSemesters]=useState([{ sgpa:0.0,backlogs: 0,grade_sheet:[]}]);
    const [noOfSemesters,setNoOfSemesters]=useState(1);

   // const [id,setId]=useState(0);
    let token=localStorage.getItem('token');
    let id=localStorage.getItem('id');
    const getData =  ()=>{
      
      const headers={
        'Authorization':token,
      }
      
        axios({
          method: 'get',
          
          url:'https://powerset-backend.herokuapp.com/students/'+String(id)+'/semesters/',
          headers:{
            'Content-Type':'application/json',
            'Authorization':token,
          },
        })
        .then(function (response) {
          console.log(response);
            console.log(response.data.length);
            var curr_semester=[];
            
            for(var i=0;i<response.data.length;i++){
              var obj=new Object();
              //console.log(response.data[i].job_title);
              obj.sgpa=response.data[i].sgpa;
              obj.backlogs=response.data[i].number_of_backlogs;
              curr_semester=[...curr_semester,obj];
            }
            console.log(curr_semester);
            if(curr_semester.length!=0)
              setSemesters(curr_semester);
          

        })
        .catch(function (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        });
        
        
    }

    React.useEffect(()=>{
      getData();
  },[]);
    
    
    const handleSave=()=>{
      
      for(var i=1;i<=noOfSemesters;i++){
        let data=new FormData();
        data.set('number',i);
        data.set('sgpa',semesters[i-1].sgpa);
        data.set('number_of_backlogs',semesters[i-1].backlogs);
        data.set('file',semesters[i-1].grade_sheet);
      

      //console.log(id);
      let myurl='https://powerset-backend.herokuapp.com/students/'+String(id)+'/semesters/';
      //console.log(myurl);
      axios({
        method: 'post',
        
        url: myurl,
        headers:{
          'Content-Type':'multipart/form-data',
          'Authorization':token,

        },
        data : data,
        
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
      
    }

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
            case 6:
                const list6 = [...semesters];
                list6[index][name] = value;
                setSemesters(list6);
                break;
        }
        
      };
    const handleAddClick = (field) => {
         switch(field){
             case 1:
                setProjects([...projects, { title: "", start_date: "",end_date: "",description:"",domain:"abc" }]);
                setNoOfProjects(noOfProjects+1);
                break;
            case 2:
                setAwards([...awards, { title: "", description: "",issuer: "",issue_date:"" }]);
                setNoOfAwards(noOfAwards+1);
                break;
            case 3:
                setWorkExperience([...work_experience, { job_title: "",company:"",location:"", start_date: "",end_date: "",description:"",compensation:"" }]);
                setNoOfWorkExperience(noOfWorkExperience+1);
                break;
            case 4:
                setPor([...por, { title: "", from_date: "",to_date: "",organization_name:""}]);
                setNoOfProjects(noOfPor+1);
                break;
            case 5:
                setCourses([...courses, { code:"",title: "",grade_secured:""}]);
                setNoOfCourses(noOfCourses+1);
                break;
            case 6:
                setSemesters([...semesters, { sgpa:"",backlogs: "",grade_sheet:""}]);
                setNoOfSemesters(noOfSemesters+1);
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
              case 6:
                const list6 = [...semesters];
                list6.splice(index, 1);
                setSemesters(list6);
                setNoOfSemesters(noOfSemesters-1);
                break;
        }
    
    };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter Semester Details
      </Typography>
      
      {semesters.map((x,i)=>{
        return(
          
      <Grid container spacing={3}>
      
        <Grid item xs={6} >
        <Typography variant="h6" gutterBottom>
        Semester {i+1}:
      </Typography>
      </Grid>
      <Grid item xs={6}>
      <Grid container justify="flex-end">
      
        {semesters.length !== 1 && <Button
          color="primary"
          onClick={() => handleRemoveClick(i,6)}>Remove Entry</Button>}
          
        </Grid>
        </Grid>
      <Grid item xs={4} >
          <TextField
            
            id="sgpa"
            name="sgpa"
            label="SGPA"
            value={x.sgpa}
            onChange={(e) => handleInputChange(e,i,6)}
          />
          </Grid>
        
          <Grid item xs={4}>
          <TextField
            
            id="backlogs"
            name="backlogs"
            label="No of Backlogs"
            value={x.backlogs}
            onChange={(e) => handleInputChange(e,i,6)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            
            id="grade_sheet"
            name="grade_sheet"
            //label="Upload Grade Sheet"
            type="file"
            value={x.grade_sheet}
            onChange={(e) => handleInputChange(e,i,6)}
          />
        </Grid>
      
        {semesters.length - 1 === i && <Button color="primary" onClick={()=>handleAddClick(6)} className="btn ">Add Next Semester</Button>}

      </Grid>
          )
      })}

      <Button variant="contained" color="primary" onClick={handleSave}>
      Save
      </Button>
    </React.Fragment>
  );
}