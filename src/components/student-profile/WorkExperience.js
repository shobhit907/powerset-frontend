import React, { Component, Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const axios = require("axios");
const qs = require("querystring");
const moment = require("moment");
export default function WorkExperience(props) {
  const [dummy, setDummy] = useState(0);
  const [projects, setProjects] = useState([
    {
      title: "abc",
      start_date: "2020-05-06",
      end_date: "2020-05-07",
      description: "VFDDFV",
      domain: "abc",
    },
  ]);
  const [noOfProjects, setNoOfProjects] = useState(1);
  const [awards, setAwards] = useState([
    { title: "", description: "", issuer: "", issue_date: "" },
  ]);
  const [noOfAwards, setNoOfAwards] = useState(1);
  const [work_experience, setWorkExperience] = useState([
    {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
      compensation: 0,
    },
  ]);
  const [noOfWorkExperience, setNoOfWorkExperience] = useState(1);
  const [is_verified,set_is_verified]=useState("Unverified");
  const [verification_message,set_verification_message]=useState("");
  const [por, setPor] = useState([
    { title: "", from_date: "", to_date: "", organization_name: "" },
  ]);
  const [noOfPor, setNoOfPor] = useState(1);
  const [courses, setCourses] = useState([
    { code: "", title: "", grade_secured: "" },
  ]);
  const [noOfCourses, setNoOfCourses] = useState(1);
  const [errorText, setErrorText] = useState("");
  const [student_id, set_student_id] = useState();
  console.log("From work experience -> ", props.student_id, student_id);
  const options = ["Verified", "Unverified", "Rejected"];
  const defaultOption = options[1];

  // const onVerifiedChange=async()=>{
  //   const headers={
  //     'Authorization':token,
  //   }
  //   // alert("Work experience is_verified changing to "+(!is_verified.state).toString());
  //   axios({
  //     method: 'put',

  //       url:'https://powerset-backend.herokuapp.com/students/'+String(id)+'/work-experiences/verify/',
  //       headers:{
  //         'Content-Type':'application/json',
  //         'Authorization':token,
  //       },
  //       data : {
  //         is_verified:!is_verified.state
  //       },
  //   }).then((response)=>{
  //     if(is_verified.state){
  //       alert("Unverified")
  //     }else{
  //       alert("Verified")
  //     }
  //   }).catch((err)=>{
  //     alert("Error in verifying");
  //   })
  // };

  

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
        "/work-experiences/";
    } else {
      set_student_id(id);
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        id.toString() +
        "/work-experiences/";
    }
    axios
      .get(request_url, { headers })
      .then(function (response) {
        console.log(response);
        console.log(response.data.length);
        var curr_work_ex = [];

        for (var i = 0; i < response.data.length; i++) {
          var obj = new Object();
          console.log(response.data[i].job_title);
          obj.job_title = response.data[i].job_title;
          obj.start_date = response.data[i].start_date;
          obj.end_date = response.data[i].end_date;
          obj.description = response.data[i].description;
          obj.company = response.data[i].company;
          obj.location = response.data[i].location;
          obj.compensation = response.data[i].compensation;
          curr_work_ex = [...curr_work_ex, obj];
        }
        console.log(curr_work_ex);
        if (curr_work_ex.length != 0) {
          setWorkExperience(curr_work_ex);
          set_is_verified(response.data[0].is_verified);
          set_verification_message(response.data[0].verification_message);
          // is_verified.setState(response.data[0].is_verified);
        } else {
          // setWorkExperience([
          //   {
          //     job_title: "",
          //     company: "",
          //     location: "",
          //     start_date: "",
          //     end_date: "",
          //     description: "",
          //     compensation: 0,
          //   },
          // ]);
        }
      })
      .catch(function (err) {
        console.log(err);
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
    var decimalOrFloat = /^[+-]?\d+(\.\d+)?$/;
    for (var i = 0; i < work_experience.length; i++) {
      if (!lettersAndSpaces.test(work_experience[i].job_title)) {
        setErrorText(
          "Work Experience " +
            String(i + 1) +
            ": Job Title must only Conatin Letters and Numbers"
        );
        return;
      }
      if (!lettersAndSpaces.test(work_experience[i].company)) {
        setErrorText(
          "Work Experience " +
            String(i + 1) +
            ": Company must only Conatin Letters and Numbers"
        );
        return;
      }
      if (!lettersAndSpaces.test(work_experience[i].location)) {
        setErrorText(
          "Work Experience " +
            String(i + 1) +
            ": Location must only Conatin Letters and Numbers"
        );
        return;
      }
      if (
        !regEx.test(work_experience[i].start_date) &&
        work_experience[i].start_date != ""
      ) {
        setErrorText(
          "Work Experience " +
            String(i + 1) +
            ": Start Date Must follow yyyy-mm-dd format"
        );
        return;
      }
      if (
        !regEx.test(work_experience[i].end_date) &&
        work_experience[i].end_date != ""
      ) {
        setErrorText(
          "Work Experience " +
            String(i + 1) +
            ": End Date Must follow yyyy-mm-dd format"
        );
        return;
      }
      // if(work_experience[i].start_date>work_experience[i].end_date){
      //   setErrorText("Work Experience "+String(i+1)+": End Date must be after Start Date");
      //   return;
      // }
      // if(work_experience[i].description.length<30 || work_experience[i].description.length>500){
      //   setErrorText("Work Experience "+String(i+1)+": Description must be between 30 and 500 characters");
      //   return;
      // }
      if (!decimalOrFloat.test(work_experience[i].compensation)) {
        setErrorText(
          "Work Experience " +
            String(i + 1) +
            ": Compensation must be decimal or float"
        );
        return;
      }
    }
    var request_url = "";
    if (props.student_id >= 0) {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(props.student_id) +
        "/work-experiences/";
    } else {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(id) +
        "/work-experiences/";
    }
    let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
    axios({
      method: "post",

      url: request_url,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: work_experience,
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
            start_date: "",
            end_date: "",
            description: "",
            domain: "abc",
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
            job_title: "",
            company: "",
            location: "",
            start_date: "",
            end_date: "",
            description: "",
            compensation: "",
          },
        ]);
        setNoOfWorkExperience(noOfWorkExperience + 1);
        break;
      case 4:
        setPor([
          ...por,
          { title: "", from_date: "", to_date: "", organization_name: "" },
        ]);
        setNoOfProjects(noOfPor + 1);
        break;
      case 5:
        setCourses([...courses, { code: "", title: "", grade_secured: "" }]);
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
        "/work-experiences/verify/";
    } else {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(id) +
        "/work-experiences/verify/";
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    axios.put(request_url,
     {
       "is_verified":is_verified,
       "verification_message":verification_message
      },
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
      <div id="work-experience">
        <React.Fragment>
          <Grid container spacing={1}>
            <Grid item xs={3} sm={3}>
              <h1>Internships & Work Experience</h1>
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
                onChange={(e)=>{set_verification_message(e.value)}}
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
          {work_experience.map((x, i) => {
            return (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="title"
                    name="job_title"
                    label="Job Title"
                    value={x.job_title}
                    onChange={(e) => handleInputChange(e, i, 3)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {work_experience.length !== 1 && (
                    <Button
                      color="primary"
                      onClick={() => handleRemoveClick(i, 3)}
                    >
                      Remove Work Experience
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="company"
                    name="company"
                    label="Company Name"
                    value={x.company}
                    onChange={(e) => handleInputChange(e, i, 3)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="location"
                    name="location"
                    label="Location"
                    value={x.location}
                    onChange={(e) => handleInputChange(e, i, 3)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="start_date"
                    name="start_date"
                    label="Start Date"
                    value={x.start_date}
                    onChange={(e) => handleInputChange(e, i, 3)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="end_date"
                    name="end_date"
                    label="End Date"
                    value={x.end_date}
                    onChange={(e) => handleInputChange(e, i, 3)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="compensation"
                    name="compensation"
                    label="Compensation"
                    value={x.compensation}
                    onChange={(e) => handleInputChange(e, i, 3)}
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
                    onChange={(e) => handleInputChange(e, i, 3)}
                  />
                </Grid>
                {work_experience.length - 1 === i && (
                  <Button
                    color="primary"
                    onClick={() => handleAddClick(3)}
                    className="btn "
                  >
                    Add Work Experience
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
