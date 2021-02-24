import  React, { Component, Fragment,useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DateTimePicker from 'react-datetime-picker';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const axios = require('axios')
const qs = require('querystring')
const moment=require('moment')
export default function StudentDetailForm(){
    const location = useLocation();
    const history = useHistory();
    /*if(!location.state){
      history.push('/sign-in');
    }*/
    var token="";
    if(location.state){
    token = location.state.params;
    }
    console.log(token);
    
    const [student_name, setTrainName] = useState("");
    const [sl_coach_count, setSlCoachCount] = useState(0);
    const [ac_coach_count, setAcCoachCount] = useState(0);
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

    function checkPermission(){
        return true;
    }
    function handleLogout(){
      token="";
      history.push('/sign-in');
    }
    function handlePageSwitch(){
      history.push('/passenger-list',{params:token});
    }
    function handleSubmit(event) {
        event.preventDefault();
        const requestBody = {
          train_name: fathers_name,
          ac_coach_count: ac_coach_count,
          sl_coach_count: sl_coach_count,
          schedule_date: moment(DOB).format('YYYY-MM-DD HH:mm:ss')
        }
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': token
          }
        }
        axios.post('https://railway-reservation-project.herokuapp.com/api/v1/admin/create_train', qs.stringify(requestBody), config)
        .then(function (response) {
          
            console.log(response);
            if(response.status==400){
              console.log("Server Error");
              alert("An Error Occoured");
            }
            else{
              alert("Train Successfully Added");
            }
        
        })
        .catch(err =>{
          console.log(err);
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          }
        })
      }
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Railway Reservation Project</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li>
            <Button onClick={handlePageSwitch} className="btn btn-block">Check Passenger List</Button>
            </li>
              <li>
              <Button onClick={handleLogout} className="btn btn-block">Logout</Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <Form onSubmit={handleSubmit}>
            <h3>Add Train</h3>
        
        
        <Form.Group size="lg" controlId="sl-coach-count">
        <Form.Label>Sleeper Coach Count</Form.Label>
        <Form.Control
        autoFocus
            type="sl-coach-count"
            value={sl_coach_count}
            onChange={(e) => setSlCoachCount(e.target.value)}
        />
        </Form.Group>
        
        <Form.Group size="lg" controlId="ac-coach-count">
        <Form.Label>AC Coach Count</Form.Label>
        <Form.Control
        autoFocus
            type="ac-coach-count"
            value={ac_coach_count}
            onChange={(e) => setAcCoachCount(e.target.value)}
        />
        </Form.Group>
        <DateTimePicker
        onChange={onChangeDOB}
        value={DOB}
        />
        <Form.Group controlId="institute">
        <Form.Label>Select Institute</Form.Label>
        <Form.Control as="select" value={institute} onChange={(e) => setInstitute(e.target.value)}>
          <option value="iit-bombay">IIT Bombay</option>
          <option value="iit-ropar">IIT Ropar</option>
          <option value="iit-delhi">IIT Delhi</option>
          <option value="iit-kanpur">IIT Kanpur</option>
          <option value="iit-kharagpur">IIT Kharagpur</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="branch">
        <Form.Label>Select Branch</Form.Label>
        <Form.Control as="select" value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="computer-science">Computer Science</option>
          <option value="electrical">Electrical</option>
          <option value="mechanical">Mechanical</option>
          <option value="mathematics-and-computing">Mathematics and Computing</option>
          <option value="civil">Civil</option>
          <option value="chemical">Chemical</option>
          <option value="metallurgy">Metallurgy</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="degree">
        <Form.Label>Select Degree</Form.Label>
        <Form.Control as="select" value={degree} onChange={(e) => setDegree(e.target.value)}>
          <option value="btech">BTech</option>
          <option value="mtech">MTech</option>
          <option value="phd">PhD</option>
          <option value="btech-dual">Integrated BTech and MTech</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="profile">
        <Form.Label>Select Profile</Form.Label>
        <Form.Control as="select" value={profile} onChange={(e) => setProfile(e.target.value)}>
          <option value="core">Core</option>
          <option value="non-core">Non Core</option>
          <option value="software">Software</option>
          
        </Form.Control>
      </Form.Group>
      <Form.Group size="lg" controlId="fathers_name">
        <Form.Label>Fathers Name</Form.Label>
        <Form.Control
            
            type="fathers-name"
            value={fathers_name}
            onChange={(e) => setFathersName(e.target.value)}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="mothers_name">
        <Form.Label>Mothers Name</Form.Label>
        <Form.Control
            
            type="mothers-name"
            value={mothers_name}
            onChange={(e) => setMothersName(e.target.value)}
        />
        </Form.Group>
        <Form.Group size="lg" controlId="mothers_name">
        <Form.Label>Entry No</Form.Label>
        <Form.Control
            
            type="entry-no"
            value={entry_no}
            onChange={(e) => setEntryNo(e.target.value)}
        />
        </Form.Group>
        <Form.Group controlId="technical_skills">
      <Form.Label>Technical Skills</Form.Label>
      <Form.Control as="textarea" rows={3}  value={technical_skills}
      onChange={(e) => setTechnicalSkills(e.target.value)}/>
      </Form.Group>
        <Button block size="lg" type="submit" disabled={!checkPermission()} className="btn btn-primary btn-block">
        Add Train
        </Button>
        </Form>
        </div>
    );

    
}