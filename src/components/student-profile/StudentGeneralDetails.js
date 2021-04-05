import React, { Component, Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Dropdown from "react-dropdown";
import Avatar from "@material-ui/core/Avatar";
import "react-dropdown/style.css";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../images/pp.jpeg";

const axios = require("axios");
const qs = require("querystring");
const moment = require("moment");

export default function StudentGeneralDetails(props) {
  const [DOB, onChangeDOB] = useState(new Date());
  const [institute, setInstitute] = useState("");
  const [branch, setBranch] = useState("");
  const [profile, setProfile] = useState("");
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");
  const [fathers_name, setFathersName] = useState("");
  const [mothers_name, setMothersName] = useState("");
  const [category, setCategory] = useState("");
  const [entry_no, setEntryNo] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [technical_skills, setTechnicalSkills] = useState("");
  const [volunteer_experience, setVolunteerExperience] = useState("");
  const [career_plans, setCareerPlans] = useState("");
  const [errorText, setErrorText] = useState("");
  const [student_id, set_student_id] = useState();
  React.useEffect(()=>{
    if(props.student_id){
      set_student_id(props.student_id);
    }
    if(student_id==-1){
      set_student_id(localStorage.getItem('id'));
    }
  
  },[]);
  
  let token = localStorage.getItem("token");
  console.log(token);

  const options = ["Verified", "Unverified", "Rejected"];
  const defaultOption = options[1];

  const handleStudentCreate = () => {
    var dobRegex = new RegExp(
      "^d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$"
    );
    setErrorText("");
    var lettersAndSpaces = new RegExp("^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$");

    if (!lettersAndSpaces.test(fathers_name)) {
      setErrorText("Fathers Name must only contain letters and spaces");
      return;
    }
    if (!lettersAndSpaces.test(mothers_name)) {
      setErrorText("Mothers Name must only contain letters and spaces");
      return;
    }
    // if (introduction.length < 30 || introduction.length > 500) {
    //   setErrorText("Introduction should be between 30 and 300 characters");
    //   return;
    // }
    // if (technical_skills.length < 30 || technical_skills.length > 500) {
    //   setErrorText("Technical Skills should be between 30 and 300 characters");
    //   return;
    // }
    // if (volunteer_experience.length < 30 || volunteer_experience.length > 500) {
    //   setErrorText(
    //     "Volunteer Experience should be between 30 and 300 characters"
    //   );
    //   return;
    // }
    // if (career_plans.length < 30 || career_plans.length > 500) {
    //   setErrorText("Career Plans should be between 30 and 300 characters");
    //   return;
    // }
    if (!dobRegex.test(DOB)) {
      setErrorText("Date of Birth has invalid format");
      return;
    }
    let data = new FormData();
    data.set("branch", branch);
    data.set("degree", degree);
    data.set("mother_name", mothers_name);
    data.set("father_name", fathers_name);
    data.set("entry_number", entry_no);
    data.set("preferred_profile", profile);
    data.set("institute", institute);
    data.set("category", "GEN");
    axios({
      method: "post",
      url: "https://powerset-backend.herokuapp.com/students/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
      data: data,
    })
      .then(function (response) {
        console.log(response);
        localStorage.setItem("id", response.data.id);
        set_student_id(response.data.id);
      })
      .catch(function (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      });
  };
  const getData = () => {
    const headers = {
      Authorization: token,
    };
    var request_url="";
    if(student_id && student_id!==-1){
      request_url = "https://powerset-backend.herokuapp.com/students/"+student_id.toString()+"/";
      
    }else{
      request_url = "https://powerset-backend.herokuapp.com/students/me/";
    }
    
    axios
      .get(request_url, { headers })
      .then((response) => {
        console.log(response);

        setBranch(response.data.branch);
        console.log(response.data.branch);
        setDegree(response.data.degree);
        setMothersName(response.data.mother_name);
        setFathersName(response.data.father_name);
        setEntryNo(response.data.entry_number);
        setProfile(response.data.preferred_profile);
        setInstitute(response.data.institute.name);
        setName(response.data.user.name);
        localStorage.setItem("id", response.data.id);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }));
  const classes = useStyles();

  return (
    <div id="student-general-details">
      {student_id!=-1 && (<React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={4}>
            <h1>About You</h1>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Dropdown
              disabled={!props.isCoordinator}
              options={options}
              // onChange={this._onSelect}
              value={defaultOption}
              placeholder="Select an option"
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              disabled={!props.isCoordinator}
              multiline
              variant="outlined"
              label="Verification Message"
            ></TextField>
          </Grid>

          {props.isCoordinator && (
            <Grid item xs={6} sm={1}>
              <Button variant="outlined" color="primary">
                Save
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={3}>
          <Grid item>
            <span className={classes.root}>
              <Avatar alt="Shobhit Gupta" src={logo} className={classes.large}></Avatar>
            </span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="my-name"
              name="myname"
              label="Name"
              autoComplete="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="fathersName"
              name="fathersName"
              label="Father's Name"
              autoComplete="Father's Name"
              value={fathers_name}
              onChange={(e) => setFathersName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="mothersName"
              name="mothersName"
              label="Mother's Name"
              autoComplete="Mother's Name"
              value={mothers_name}
              onChange={(e) => setMothersName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="entryno"
              name="entryno"
              label="Entry No"
              autoComplete="Entry No"
              value={entry_no}
              onChange={(e) => setEntryNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="DOB"
              label="Date of Birth"
              type="date"
              defaultValue="2000-05-05"
              InputLabelProps={{
                shrink: true,
              }}
              value={DOB}
              onChange={(e) => onChangeDOB(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">
              Select Institute
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputProps={{ "aria-label": "Without label" }}
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
            >
              <MenuItem value={""}>Select.. </MenuItem>
              <MenuItem value={"Indian Institute of Technology Bombay"}>
                Indian Institute of Technology Bombay
              </MenuItem>
              <MenuItem value={"Indian Institute of Technology Delhi"}>
                Indian Institute of Technology Delhi
              </MenuItem>
              <MenuItem value={"Indian Institute of Technology Ropar"}>
                Indian Institute of Technology Ropar
              </MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Select Degree</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputProps={{ "aria-label": "Without label" }}
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            >
              <MenuItem value={""}>Select.. </MenuItem>
              <MenuItem value={"BTech"}>B.Tech</MenuItem>
              <MenuItem value={"MTech"}>M.Tech</MenuItem>
              <MenuItem value={"Dual Degree"}>Dual Degree</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputProps={{ "aria-label": "Without label" }}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <MenuItem value={""}>Select.. </MenuItem>
              <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              <MenuItem value={"Electrical"}>Electrical</MenuItem>
              <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">
              Select Profile
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputProps={{ "aria-label": "Without label" }}
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            >
              <MenuItem value={""}>Select.. </MenuItem>
              <MenuItem value={"Software"}>Software</MenuItem>
              <MenuItem value={"Core"}>Core Engineering</MenuItem>
              <MenuItem value={"Non Core"}>Non Core</MenuItem>
              <MenuItem value={"Consulting"}>Consulting</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="intro"
              name="intro"
              label="Tell us about yourself"
              fullWidth
              multiline
              rows={3}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="plans"
              name="plans"
              label="Tell us your career plans"
              fullWidth
              multiline
              rows={3}
              value={career_plans}
              onChange={(e) => setCareerPlans(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="tech_skills"
              name="tech_skills"
              label="List your Technical Skills"
              fullWidth
              multiline
              rows={3}
              value={technical_skills}
              onChange={(e) => setTechnicalSkills(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="volunteer"
              label="Enter your Volunteer Experience"
              multiline
              rows={3}
              fullWidth
              value={volunteer_experience}
              onChange={(e) => setVolunteerExperience(e.target.value)}
            />
          </Grid>
          <Grid item sm={12}>
            <p style={{ color: "red" }}> {errorText}</p>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStudentCreate}
          >
            Save and Create Entry
          </Button>
        </Grid>
      </React.Fragment>)}
    </div>
  );
}
