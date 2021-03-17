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
export default function PositionOfResponsibility() {
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
     
    }

    React.useEffect(()=>{
      getData();
  },[]);
    
    
    const handleSave=()=>{
      setErrorText("");
      var lettersAndSpaces=new RegExp("^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$");
      
      var dobRegex=new RegExp("\d{4}-\d{2}-\d{2}$");
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      for(var i=0;i<por.length;i++){
        if(!lettersAndSpaces.test(por[i].title)){
          setErrorText("POR "+String(i+1)+": Title must only Conatin Letters and Numbers");
          return;
        }
        if(!regEx.test(por[i].from_date) && por[i].from_date!=""){
          setErrorText("POR "+String(i+1)+": From Date Must follow yyyy-mm-dd format");
          return;
        }
        if(!regEx.test(por[i].to_date) && por[i].to_date!=""){
          setErrorText("POR "+String(i+1)+": End Date Must follow yyyy-mm-dd format");
          return;
        }
        if(por[i].from_date>por[i].to_date){
          setErrorText("POR "+String(i+1)+": To Date must be after From Date");
          return;
        }
        if(por[i].description.length<30 || por[i].description.length>500){
          setErrorText("POR "+String(i+1)+": Description must be between 30 and 500 characters");
          return;
        }
      }
      
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
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Positions of Responsibility
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
      <Grid item sm={12}>
        <p style={{color:"red"}}> {errorText}</p>
        </Grid>
      <Button variant="contained" color="primary" onClick={handleSave}>
      Save
      </Button>
    </React.Fragment>
  );
}