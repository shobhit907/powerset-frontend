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
   // const [id,setId]=useState(0);
    let token=localStorage.getItem('token');
    let id=localStorage.getItem('id');
    const getData =  ()=>{
      
      const headers={
        'Authorization':token,
      }
      
        axios({
          method: 'get',
          
          url:'https://powerset-backend.herokuapp.com/students/'+String(id)+'/work-experiences/',
          headers:{
            'Content-Type':'application/json',
            'Authorization':token,
          },
        })
        .then(function (response) {
          console.log(response);
            console.log(response.data.length);
            var curr_work_ex=[];
            
            for(var i=0;i<response.data.length;i++){
              var obj=new Object();
              console.log(response.data[i].job_title);
              obj.job_title=response.data[i].job_title;
              obj.start_date=response.data[i].start_date;
              obj.end_date=response.data[i].end_date;
              obj.description=response.data[i].description;
              obj.company=response.data[i].company;
              obj.location=response.data[i].location;
              obj.compensation=response.data[i].compensation;
              curr_work_ex=[...curr_work_ex,obj];
            }
            console.log(curr_work_ex);
            if(curr_work_ex.length!=0)
              setWorkExperience(curr_work_ex);
          

        })
        .catch(function (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        });
        
        axios({
          method: 'get',
          url:'https://powerset-backend.herokuapp.com/students/'+String(id)+'/positions-of-responsibilities/',
          headers:{
            'Content-Type':'application/json',
            'Authorization':token,
          },
        })
        .then(function (response) {
          console.log(response);
            console.log(response.data.length);
            var curr_por=[];
            
            for(var i=0;i<response.data.length;i++){
              var obj=new Object();
              console.log(response.data[i].job_title);
              obj.title=response.data[i].title;
              obj.from_date=response.data[i].from_date;
              obj.to_date=response.data[i].to_date;
              obj.organization_name=response.data[i].organization_name;
              curr_por=[...curr_por,obj];
            }
            console.log(curr_por);
            if(curr_por.length!=0)
              setPor(curr_por);
          

        })
        .catch(function (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        });
        
  
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

      //console.log(id);
      let myurl='https://powerset-backend.herokuapp.com/students/'+String(id)+'/work-experiences/';
      //console.log(myurl);
      axios({
        method: 'post',
        
        url: myurl,
        headers:{
          'Content-Type':'application/json',
          'Authorization':token,

        },
        data : work_experience,
        
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      });

      axios({
        method: 'post',
        
        url: 'https://powerset-backend.herokuapp.com/students/'+String(id)+'/positions-of-responsibilities/',
        headers:{
          'Content-Type':'application/json',
          'Authorization':token,

        },
        data : por,
        
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      });

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
    <div id="form3">
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter your Work Experience
      </Typography>
      
      {work_experience.map((x,i)=>{
        return(
          
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="title"
            name="job_title"
            label="Job Title"
            value={x.job_title}
            onChange={(e) => handleInputChange(e,i,3)}
          />
          </Grid>
        <Grid item xs={12} sm={6}>
        {work_experience.length !== 1 && <Button
          color="primary"
          onClick={() => handleRemoveClick(i,3)}>Remove Work Experience</Button>}
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            
            id="company"
            name="company"
            label="Company Name"
            value={x.company}
            onChange={(e) => handleInputChange(e,i,3)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="location"
            name="location"
            label="Location"
            value={x.location}
            onChange={(e) => handleInputChange(e,i,3)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="start_date"
            name="start_date"
            label="Start Date"
            value={x.start_date}
            onChange={(e) => handleInputChange(e,i,3)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="end_date"
            name="end_date"
            label="End Date"
            value={x.end_date}
            onChange={(e) => handleInputChange(e,i,3)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="compensation"
            name="compensation"
            label="Compensation"
            value={x.compensation}
            onChange={(e) => handleInputChange(e,i,3)}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        id="description"
        label="Describe the Work"
        name="description"
        multiline
        rows={4}
        fullWidth
        value={x.description}
        onChange={(e) => handleInputChange(e,i,3)}
        />
        </Grid>
        {work_experience.length - 1 === i && <Button color="primary" onClick={()=>handleAddClick(3)} className="btn ">Add Work Experience</Button>}

      </Grid>
          )
      })}


      <Typography variant="h6" gutterBottom>
        Enter your Positions of Responsibility
      </Typography>

      {por.map((x,i)=>{
        return(
          
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="title"
            name="title"
            label="Title"
            value={x.title}
            onChange={(e) => handleInputChange(e,i,4)}
          />
          </Grid>
        <Grid item xs={12} sm={6}>

        {por.length !== 1 && <Button
          color="primary"
          onClick={() => handleRemoveClick(i,4)}>Remove POR</Button>}
          </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="from_date"
            name="from_date"
            label="From Date"
            value={x.from_date}
            onChange={(e) => handleInputChange(e,i,4)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="to_date"
            name="to_date"
            label="To Date"
            value={x.to_date}
            onChange={(e) => handleInputChange(e,i,4)}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
        id="organization_name"
        label="Name of Club / Organisation"
        name="organization_name"
        fullWidth
        value={x.organization_name}
        onChange={(e) => handleInputChange(e,i,4)}
        />
        </Grid>
        {por.length - 1 === i && <Button color="primary" onClick={()=>handleAddClick(4)} >Add POR</Button>}

      </Grid>
          )
      })}

      <Typography variant="h6" gutterBottom>
      Enter your Courses
    </Typography>

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
      <Button variant="contained" color="primary" onClick={handleSave}>
      Save
      </Button>
    </React.Fragment>
    </div>
  );
}