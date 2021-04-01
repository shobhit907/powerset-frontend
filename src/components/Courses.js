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
export default function Courses() {
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
    const [errorText,setErrorText]=useState("");
   // const [id,setId]=useState(0);
    let token=localStorage.getItem('token');
    let id=localStorage.getItem('id');
    const getData =  ()=>{
      
      const headers={
        'Authorization':token,
      }
      
        axios({
          method: 'get',
          
          url:'https://powerset-backend.herokuapp.com/students/'+String(id)+'/courses/',
          headers:{
            'Content-Type':'application/json',
            'Authorization':token,
          },
        })
        .then(function (response) {
          console.log(response);
            console.log(response.data.length);
            var curr_courses=[];
            
            for(var i=0;i<response.data.length;i++){
              var obj=new Object();
              console.log(response.data[i].job_title);
              obj.title=response.data[i].title;
              obj.code=response.data[i].code;
              obj.grade_secured=response.data[i].grade_secured;
              curr_courses=[...curr_courses,obj];
            }
            console.log(curr_courses);
            if(curr_courses.length!=0)
              setCourses(curr_courses);
          

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
        setErrorText("");
      var lettersAndSpaces=new RegExp("^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$");
      var dobRegex=new RegExp("\d{4}-\d{2}-\d{2}$");
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      var decimalOrFloat=/^[+-]?\d+(\.\d+)?$/;
      for(var i=0;i<courses.length;i++){
        if(!lettersAndSpaces.test(courses[i].title)){
          setErrorText("Course "+String(i+1)+": Title must only Contain Letters and Numbers");
          return;
        }
        if(!lettersAndSpaces.test(courses[i].code) && courses[i].code.length>8){
          setErrorText("Course "+String(i+1)+": Code must be only letters and numbers and length < 8");
          return;
        }
        if(!decimalOrFloat.test(courses[i].grade_secured)){
            setErrorText("Course "+String(i+1)+": Grade Secured must be decimal or float");
            return;
        }
      }
      axios({
        method: 'post',
        
        url: 'https://powerset-backend.herokuapp.com/students/'+String(id)+'/courses/',
        headers:{
          'Content-Type':'application/json',
          'Authorization':token,

        },
        data : courses,
        
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
    <div id="courses">
    <React.Fragment>
      <h1>
      Courses
      </h1> 
    {courses.map((x,i)=>{
      return(
        
    <Grid container spacing={3}>
    
      <Grid item xs={12} sm={6}>
        <TextField
          
          id="title"
          name="title"
          label="Course Title"
          value={x.title}
          onChange={(e) => handleInputChange(e,i,5)}
        />
        </Grid>
      <Grid item xs={12} sm={6}>

      {courses.length !== 1 && <Button
        color="primary"
        onClick={() => handleRemoveClick(i,5)}>Remove Course</Button>}
        </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextField
          
          id="code"
          name="code"
          label="Course Code"
          value={x.code}
          onChange={(e) => handleInputChange(e,i,5)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="grade_secured"
          name="grade_secured"
          label="Grade Achieved"
          value={x.grade_secured}
          onChange={(e) => handleInputChange(e,i,5)}
        />
      </Grid>
      
      
      {courses.length - 1 === i && <Button color="primary" onClick={()=>handleAddClick(5)} >Add Course</Button>}

    </Grid>
        )
    })}
    <Grid item sm={12}>
        <p style={{color:"red"}}> {errorText}</p>
        </Grid>
      <Button variant="contained" color="primary" onClick={handleSave}>
      Save
      </Button>
    </React.Fragment>
    </div>
  );
}