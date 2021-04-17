import NavBar from "./navbar/NavBar";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import JobsListCoordinator from "./JobsListCoordinator"
import StudentsListForCoordinator from "./StudentsListForCoordinator"
import "./CoordinatorDashboard.css"
export default function CoordinatorDashBoard() {
    const history = useHistory();
  return (
    <div style={{backgroundColor: '#e1e8e7', height:"auto"}}>
      <NavBar></NavBar>
      <h1 style={{textAlign:"center",fontWeight:"lighter", fontSize:72}}>Coordinator Dashboard</h1> 
      <br/>
      <br/>
      <br/>
      <h3 style={{textAlign:"center",fontWeight:"lighter", fontSize:40}}>Jobs List</h3> 
      <p style={{textAlign:"center",fontWeight:"lighter"}}>Click + Icon to add a job, Edit Details to edit the job and View Applicants to see the applicant's profile, select, reject or move to next round </p>
      <JobsListCoordinator/>
      <br/>
      <br/>
      <h3 style={{textAlign:"center",fontWeight:"lighter",fontSize:40}}>Students List</h3> 
      <p style={{textAlign:"center",fontWeight:"lighter"}}>Click the view profile button to view the student's profile and verify the sections </p>
      <StudentsListForCoordinator/>
    
    </div>
  );
}
