import React, { Component, Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const axios = require("axios");
const qs = require("querystring");
const moment = require("moment");
export default function Semesters(props) {
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
  const [por, setPor] = useState([
    { title: "", from_date: "", to_date: "", organization_name: "" },
  ]);
  const [noOfPor, setNoOfPor] = useState(1);
  const [courses, setCourses] = useState([
    { code: "", title: "", grade_secured: "" },
  ]);
  const [noOfCourses, setNoOfCourses] = useState(1);
  const [resume, setResume]=useState({resume:null, resume_url:null});
  const [tenth, setTenth]=useState({percentage: "",grade_sheet:null, grade_sheet_url:null});
  const [twelveth, setTwelveth]=useState({percentage: "",grade_sheet:null, grade_sheet_url:null});
  const [semesters, setSemesters] = useState([
    { sgpa: 0.0, backlogs: 0, grade_sheet: null,grade_sheet_url:null },
  ]);
  const [noOfSemesters, setNoOfSemesters] = useState(1);
  const [errorText, setErrorText] = useState("");
  const [student_id, set_student_id] = useState();
  const [is_verified,set_is_verified]=useState("Unverified");
  const [verification_message,set_verification_message]=useState("");
  // const [id,setId]=useState(0);
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
        "/semesters/";
    } else {
      set_student_id(id);
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        id.toString() +
        "/semesters/";
    }
    axios.get(request_url, { headers })
      .then(function (response) {
        console.log(response);
        console.log(response.data.length);
        var curr_semester = [];

        for (var i = 0; i < response.data.length; i++) {
          var obj = new Object();
          //console.log(response.data[i].job_title);
          obj.sgpa = response.data[i].sgpa;
          obj.backlogs = response.data[i].number_of_backlogs;
          obj.grade_sheet_url=response.data[i].grade_sheet;
          curr_semester = [...curr_semester, obj];
        }
        console.log(curr_semester);
        if (curr_semester.length != 0){ setSemesters(curr_semester);
          set_is_verified(response.data[0].is_verified);
          set_verification_message(response.data[0].verification_message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getData();
  }, [props.student_id,student_id]);

  const handleSave = async() => {
    setErrorText("");
    var lettersAndSpaces = new RegExp("^[a-zA-Z]+(s[a-zA-Z]+)?$");
    var dobRegex = new RegExp("d{4}-d{2}-d{2}$");
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    var decimalOrFloat = /^[+-]?\d+(\.\d+)?$/;
    var reg = /^\d+$/;
    for (var i = 0; i < semesters.length; i++) {
      if (!decimalOrFloat.test(semesters[i].sgpa)) {
        setErrorText(
          "Semester " + String(i + 1) + ": SGPA must be decimal or float"
        );
        return;
      }
      if (!reg.test(semesters[i].backlogs)) {
        setErrorText(
          "Semester " + String(i + 1) + ": Backlogs Secured must be a number"
        );
        return;
      }
    }
    i=1;
    semesters.forEach(async (semester) => {
      console.log("Request for semester : "+i.toString());
      let data = new FormData();
      data.set("number", i);
      data.set("sgpa", semesters[i - 1].sgpa);
      data.set("number_of_backlogs", semesters[i - 1].backlogs);
      data.set("grade_sheet", semesters[i - 1].grade_sheet);

      //console.log(id);
      //
      let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
    
    var request_url = "";
    if (props.student_id >= 0) {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(props.student_id) +
        "/semesters/";
    } else {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(id) +
        "/semesters/";
    }
      axios({
        method: "post",

        url: request_url,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        data: data,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        });
        console.log("Request for semester : "+i.toString()+" done");
        i+=1;
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
      case 6:
        const list6 = [...semesters];
        if(name=='grade_sheet'){
          list6[index][name]=e.target.files[0];
        }else{
          list6[index][name] = value;
        }
        console.log(list6);
        setSemesters(list6);
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
      case 6:
        setSemesters([
          ...semesters,
          { sgpa: "", backlogs: "", grade_sheet: "" },
        ]);
        setNoOfSemesters(noOfSemesters + 1);
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
      case 6:
        const list6 = [...semesters];
        list6.splice(index, 1);
        setSemesters(list6);
        setNoOfSemesters(noOfSemesters - 1);
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
        "/semesters/verify/";
    } else {
      request_url =
        "https://powerset-backend.herokuapp.com/students/" +
        String(id) +
        "/semesters/verify/";
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
    <div id="semesters"><React.Fragment key={props.student_id}>
      <Grid container spacing={1}>
          <Grid item xs={3} sm={3}>
            <h1>Education</h1>
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
      {semesters.map((x, i) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Semester {i + 1}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end">
                {semesters.length !== 1 && (
                  <Button
                    color="primary"
                    onClick={() => handleRemoveClick(i, 6)}
                  >
                    Remove Entry
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="sgpa"
                name="sgpa"
                label="SGPA"
                value={x.sgpa}
                onChange={(e) => handleInputChange(e, i, 6)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="backlogs"
                name="backlogs"
                label="No of Backlogs"
                value={x.backlogs}
                onChange={(e) => handleInputChange(e, i, 6)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="grade_sheet"
                name="grade_sheet"
                //label="Upload Grade Sheet"
                type="file"
                onChange={(e) => handleInputChange(e, i, 6)}
              />
              <a href={x.grade_sheet_url} target="_blank">View</a>
            </Grid>

            {semesters.length - 1 === i && (
              <Button
                color="primary"
                onClick={() => handleAddClick(6)}
                className="btn "
              >
                Add Next Semester
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
    </React.Fragment></div>
  );
}
