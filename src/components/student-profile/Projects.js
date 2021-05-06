import React, { Component, Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const axios = require("axios");
const qs = require("querystring");
const moment = require("moment");
export default function Projects(props) {
  console.log(props);
  const [dummy, setDummy] = useState(0);
  const [projects, setProjects] = useState([
    {
      title: "",
      start_date: "yyyy-mm-dd",
      end_date: "yyyy-mm-dd",
      description: "",
      domain: "",
    },
  ]);
  const [noOfProjects, setNoOfProjects] = useState(1);
  const [is_verified,set_is_verified]=useState("Unverified");
  const [verification_message,set_verification_message]=useState("");
  const [awards, setAwards] = useState([
    { title: "", description: "", issuer: "", issue_date: "" },
  ]);
  const [noOfAwards, setNoOfAwards] = useState(1);
  const [work_experience, setWorkExperience] = useState([
    {
      jobTitle: "",
      company: "",
      location: "",
      stipend_date: "",
      start_date: "",
      end_date: "",
      description: "",
    },
  ]);
  const [noOfWorkExperience, setNoOfWorkExperience] = useState(1);
  const [por, setPor] = useState([
    { title: "", from: "", to: "", organisation: "", description: "" },
  ]);
  const [noOfPor, setNoOfPor] = useState(1);
  const [courses, setCourses] = useState([{ code: "", title: "", grade: "" }]);
  const [noOfCourses, setNoOfCourses] = useState(1);
  const [errorText, setErrorText] = useState("");
  const [student_id, set_student_id] = useState();
  // const [id,setId]=useState(0);
  
  const [student_id, set_student_id] = useState();
  const options = ["Verified", "Unverified", "Rejected"];
  const defaultOption = options[1];

  const getData = () => {
    let token = localStorage.getItem("token");
   let id = localStorage.getItem("id");
    const headers = {
      'Content-Type': "application/json",
      Authorization: token,
    };
    var request_url = "";
    if (props.student_id >= 0) {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        props.student_id.toString() +
        "/projects/";
    } else {
      if(id==null){
        return;
      }
      set_student_id(id);
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        id.toString() +
        "/projects/";
    }
    axios({
      method: "get",

      url:request_url,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        console.log(response);
        console.log(response.data.length);
        var curr_proj = [];

        for (var i = 0; i < response.data.length; i++) {
          var obj = new Object();
          console.log(response.data[i].title);
          obj.title = response.data[i].title;
          obj.start_date = response.data[i].start_date;
          obj.end_date = response.data[i].end_date;
          obj.description = response.data[i].description;
          obj.domain = response.data[i].domain;
          curr_proj = [...curr_proj, obj];
        }
        console.log(curr_proj);
        if (curr_proj.length != 0) setProjects(curr_proj);
        set_is_verified(response.data[0].is_verified);
          set_verification_message(response.data[0].verification_message);
      })
      .catch(function (err) {
        // console.log(err.response.data);
        // console.log(err.response.status);
        // console.log(err.response.headers);
      });
  };

  React.useEffect(() => {
    getData();
  }, [props.student_id,student_id]);

  const handleSave = () => {
    setErrorText("");
    var lettersAndSpaces = new RegExp("^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$");

    var dobRegex = new RegExp("d{4}-d{2}-d{2}$");
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    for (var i = 0; i < projects.length; i++) {
      if (!lettersAndSpaces.test(projects[i].title)) {
        setErrorText(
          "Project " +
            String(i + 1) +
            ": Title must only Conatin Letters and Numbers"
        );
        return;
      }
      if (!regEx.test(projects[i].start_date) && projects[i].start_date != "") {
        setErrorText(
          "Project " +
            String(i + 1) +
            ": Start Date Must follow yyyy-mm-dd format"
        );
        return;
      }
      if (!regEx.test(projects[i].end_date) && projects[i].end_date != "") {
        setErrorText(
          "Project " +
            String(i + 1) +
            ": End Date Must follow yyyy-mm-dd format"
        );
        return;
      }
      // if(projects[i].start_date>projects[i].end_date){
      //   setErrorText("Project "+String(i+1)+": End Date must be after Start Date");
      //   return;
      // }
      // if(projects[i].description.length<30 || projects[i].description.length>500){
      //   setErrorText("Project "+String(i+1)+": Description must be between 30 and 500 characters");
      //   return;
      // }
    }
    //console.log(id);
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
     const headers = {
       'Content-Type': "application/json",
       Authorization: token,
     };
     var request_url = "";
     if (props.student_id >= 0) {
       request_url =
         "https://powerset-backend.herokuapp.com/students/" +
         props.student_id.toString() +
         "/projects/";
     } else {
       if(id==null){
         return;
       }
       set_student_id(id);
       request_url =
         "https://powerset-backend.herokuapp.com/students/" +
         id.toString() +
         "/projects/";
     }
    axios({
      method: "post",

      url: request_url,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: projects,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      });
  };

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;

    switch (field) {
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
    switch (field) {
      case 1:
        setProjects([
          ...projects,
          {
            title: "",
            start_date: "yyyy-mm-dd",
            end_date: "yyyy-mm-dd",
            description: "",
            domain: "",
          },
        ]);
        setNoOfProjects(noOfProjects + 1);
        break;
      case 2:
        setAwards([
          ...awards,
          { title: "", description: "", issuer: "", issue_date: "" },
        ]);
        setNoOfAwards(noOfAwards + 1);
        break;
      case 3:
        setWorkExperience([
          ...work_experience,
          {
            jobTitle: "",
            company: "",
            location: "",
            stipend_date: "",
            start_date: "",
            end_date: "",
            description: "",
          },
        ]);
        setNoOfWorkExperience(noOfWorkExperience + 1);
        break;
      case 4:
        setPor([
          ...por,
          { title: "", from: "", to: "", organisation: "", description: "" },
        ]);
        setNoOfProjects(noOfPor + 1);
        break;
      case 5:
        setCourses([...courses, { code: "", title: "", grade: "" }]);
        setNoOfCourses(noOfCourses + 1);
        break;
    }
  };
  const handleRemoveClick = (index, field) => {
    switch (field) {
      case 1:
        const list = [...projects];
        list.splice(index, 1);
        setProjects(list);
        setNoOfProjects(noOfProjects - 1);
        break;
      case 2:
        const list2 = [...awards];
        list2.splice(index, 1);
        setAwards(list2);
        setNoOfAwards(noOfAwards - 1);
        break;
      case 3:
        const list3 = [...work_experience];
        list3.splice(index, 1);
        setWorkExperience(list3);
        setNoOfWorkExperience(noOfWorkExperience - 1);
        break;
      case 4:
        const list4 = [...por];
        list4.splice(index, 1);
        setPor(list4);
        setNoOfPor(noOfPor - 1);
        break;
      case 5:
        const list5 = [...courses];
        list5.splice(index, 1);
        setCourses(list5);
        setNoOfCourses(noOfCourses - 1);
        break;
    }
  };

  const handleVerify=()=>{
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    var request_url = "";
    if (props.student_id >= 0) {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(props.student_id) +
        "/projects/verify/";
    } else {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(id) +
        "/projects/verify/";
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const data = {
      "is_verified":is_verified,
      "verification_message":verification_message
    }
    console.log(data);
    axios.put(request_url,data,
      {headers:headers}
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <React.Fragment key={props.student_id}>
    <div id="projects">
      <React.Fragment key={props.student_id}>
        <Grid container spacing={1}>
          <Grid item xs={3} sm={3}>
            <h1>Projects</h1>
          </Grid>

          <Grid item xs={4} sm={2}>
              <Dropdown
                disabled={!props.isCoordinator}
                options={options}
                onChange={(e)=>{set_is_verified(e.value)}}
                value={is_verified}
                placeholder="Select an option"
              />
            </Grid>

            <Grid item xs={4} sm={6}>
              <TextField
                disabled={!props.isCoordinator}
                multiline
                rowsMax={4}
                variant="outlined"
                placeholder="Verification Message"
                value={verification_message}
                onChange={(e)=>{
                  set_verification_message(e.target.value)}}
              ></TextField>
            </Grid>

            {props.isCoordinator && (
              <Grid item xs={1} sm={1}>
                <Button variant="outlined" color="primary" onClick={handleVerify}>
                  Save
                </Button>
              </Grid>
            )}
        </Grid>
        {projects.map((x, i) => {
          return (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="title"
                  name="title"
                  label="Project Title"
                  value={x.title}
                  required={true}
                  onChange={(e) => handleInputChange(e, i, 1)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {projects.length !== 1 && (
                  <Button
                    color="primary"
                    onClick={() => handleRemoveClick(i, 1)}
                  >
                    Remove Project
                  </Button>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="start_date"
                  name="start_date"
                  label="Satrt Date"
                  value={x.start_date}
                  onChange={(e) => handleInputChange(e, i, 1)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="end_date"
                  name="end_date"
                  label="End Date"
                  value={x.end_date}
                  onChange={(e) => handleInputChange(e, i, 1)}
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
                  required={true}
                  onChange={(e) => handleInputChange(e, i, 1)}
                />
              </Grid>
              {projects.length - 1 === i && (
                <Button
                  color="primary"
                  onClick={() => handleAddClick(1)}
                  className="btn "
                >
                  Add Project
                </Button>
              )}
            </Grid>
          );
        })}
        <Grid item sm={12}>
          <p style={{ color: "red" }}> {errorText}</p>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </React.Fragment>
    </div>
    </React.Fragment>
  );
}
