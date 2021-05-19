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
import shobhit_pic from "../../images/pp.jpeg";
import rohit_pic from "../../images/rohit-pic.jpeg";

const axios = require("axios");
const qs = require("querystring")

export default function StudentGeneralDetails(props) {
  const [DOB, onChangeDOB] = useState(new Date());
  const [institute, setInstitute] = useState("");
  const [branch, setBranch] = useState("");
  const [batch, setBatch] = useState(2018);
  const [profile, setProfile] = useState("");
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");
  const [fathers_name, setFathersName] = useState("");
  const [mothers_name, setMothersName] = useState("");
  const [cgpa, setCGPA] = useState(0);
  const [category, setCategory] = useState("");
  const [entry_no, setEntryNo] = useState("");
  const [placement, setPlacement] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [technical_skills, setTechnicalSkills] = useState("");
  const [volunteer_experience, setVolunteerExperience] = useState("");
  const [career_plans, setCareerPlans] = useState("");
  const [errorText, setErrorText] = useState("");
  const [student_id, set_student_id] = useState();
  const [profile_pic,set_profile_pic]=useState(shobhit_pic);
  console.log("From student general details -> ", props.student_id,student_id);
  const [is_verified,set_is_verified]=useState("Unverified");
  const [verification_message,set_verification_message]=useState("");

  React.useEffect(() => {
    getData();
  }, [props.student_id,student_id]);


  
  
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
    
    
    if (isNaN(cgpa)){
      setErrorText("CGPA should be in the format 9.91")
      return
    }
    if(category==""){
      setErrorText("Select Category");
      return;
    }
    if(branch==""){
      setErrorText("Select Branch");
      return;
    }
    if(placement==""){
      setErrorText("Select Placements");
      return;
    }
    if(isNaN(batch) ||batch<2016 || batch>2025){
      setErrorText("Select Batch between 2016 and 2025");
      return;
    }
    if(institute==""){
      setErrorText("Select Institute");
      return;
    }
    // if (!dobRegex.test(DOB)) {
    //   setErrorText("Date of Birth has invalid format");
    //   return;
    // }
    
    let data = new FormData();
    data.set("branch", branch);
    data.set("batch", batch);
    data.set("placement", placement);
    data.set("degree", degree);
    data.set("mother_name", mothers_name);
    data.set("father_name", fathers_name);
    data.set("entry_number", entry_no);
    data.set("cgpa", cgpa);
    data.set("preferred_profile", profile);
    data.set("institute", institute);
    data.set("category", category);
    data.set("introduction",introduction);
    data.set("technical_skills",technical_skills);
    data.set("career_plans",career_plans);
    data.set("volunteer_experience",volunteer_experience);
    var check=false
    let token = localStorage.getItem("token");
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
        if (props.student_id>=0){

        }else{
          localStorage.setItem("id", response.data.id);
          set_student_id(response.data.id);
        }
        
      })
      .catch(function (err) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        if(err.response.status==400){
          alert("Entry Number is already taken, Contact coordinator")
        }
      });
      
  };
  const getData = () => {
    let token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    var request_url = "";
    if (props.student_id>=0) {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        props.student_id.toString() +
        "/";
    } else {
      request_url = "https://powerset-backend.herokuapp.com/students/me/";
    }
    
    axios
      .get(request_url, { headers })
      .then((response) => {
        console.log(response);

        setBranch(response.data.branch);
        setBatch(response.data.batch);
        setPlacement(response.data.placement.name);
        setDegree(response.data.degree);
        setMothersName(response.data.mother_name);
        setFathersName(response.data.father_name);
        setEntryNo(response.data.entry_number);
        setProfile(response.data.preferred_profile);
        setInstitute(response.data.institute.name);
        setName(response.data.user.name);
        setCategory(response.data.category);
        setCGPA(response.data.cgpa);
        setIntroduction(response.data.introduction);
        setTechnicalSkills(response.data.technical_skills);
        setVolunteerExperience(response.data.volunteer_experience);
        setCareerPlans(response.data.career_plans);
        set_is_verified(response.data.is_verified);
          set_verification_message(response.data.verification_message);
        if(props.student_id>=0){

        }else{
          localStorage.setItem("id", response.data.id);
          set_student_id(response.data.id);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
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

  const handleVerify=()=>{
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    var request_url = "";
    if (props.student_id >= 0) {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(props.student_id) +
        "/verify/";
    } else {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(id) +
        "/verify/";
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
    <div id="student-general-details">
      
        <React.Fragment>
          <Grid container spacing={1}>
            <Grid item xs={3} sm={3}>
              <h1>About You</h1>
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
          <Grid container spacing={3}>
            <Grid item>
              <span className={classes.root}>
                {(props.student_id==5 || student_id==5) && (<Avatar
                  alt="Shobhit Gupta"
                  src={profile_pic}
                  className={classes.large}
                ></Avatar>)}
                {(props.student_id!=5 && student_id!=5) && (<Avatar
                  className={classes.large}
                ></Avatar>)}
                
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cgpa"
              name="cgpa"
              label="CGPA"
              autoComplete="CGPA"
              value={cgpa}
              onChange={(e) => setCGPA(e.target.value)}
            />
          </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="DOB"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={DOB}
                onChange={(e) => onChangeDOB(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">
              Internship/Placement
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputProps={{ "aria-label": "Without label" }}
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
            >
              <MenuItem value={""}>Select.. </MenuItem>
              <MenuItem value={"Intern"}>Internship</MenuItem>
              <MenuItem value={"Placement"}>Placement</MenuItem>
            </Select>
          </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputProps={{ "aria-label": "Without label" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={""}>Select.. </MenuItem>
              <MenuItem value={"GEN"}>General</MenuItem>
              <MenuItem value={"OBC"}>OBC</MenuItem>
              <MenuItem value={"SC"}>SC</MenuItem>
              <MenuItem value={"ST"}>ST</MenuItem>
            </Select>
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
                
                <MenuItem value={"IIT Ropar"}>
                  Indian Institute of Technology Ropar
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label">
                Select Degree
              </InputLabel>
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
            <Grid>
            <TextField
            required
            id="batch"
            name="batch"
            label="Batch"
            autoComplete="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
        </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label">
                Select Branch
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                inputProps={{ "aria-label": "Without label" }}
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <MenuItem value={""}>Select.. </MenuItem>
                <MenuItem value={"CSE"}>Computer Science</MenuItem>
                <MenuItem value={"EE"}>Electrical</MenuItem>
                <MenuItem value={"ME"}>Mechanical</MenuItem>
                <MenuItem value={"CE"}>Civil</MenuItem>
                <MenuItem value={"MME"}>Metallurgical and Materials Engineering</MenuItem>
                <MenuItem value={"MNC"}>Methamatics and Computing</MenuItem>
                <MenuItem value={"CBME"}>Center for BioMedical Engineering</MenuItem>
                <MenuItem value={"HSS"}>Humanities and Social Sciences</MenuItem>
                <MenuItem value={"P"}>Physics</MenuItem>
                <MenuItem value={"C"}>Chemistry</MenuItem>
                <MenuItem value={"M"}>Mathematics</MenuItem>
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
              <p style={{ color: "red" }}> {errorText}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStudentCreate}
            >
              Save
            </Button>
          </Grid>
        </React.Fragment>
      
    </div>
    </React.Fragment>
  );
}
