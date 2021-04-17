import NavBar from "../navbar/NavBar";
import JobsAppliedByStudent from "./JobsAppliedByStudent";

export default function StudentDashBoard() {
  return (
    <div style={{backgroundColor: '#e1e8e7', height:"auto"}}>
      <NavBar></NavBar>
      <h1 style={{textAlign:"center",fontWeight:"lighter", fontSize:72}}>Student Dashboard</h1> 
      <br/>
      <br/>
      <h3 style={{textAlign:"center",fontWeight:"lighter", fontSize:40}}>Jobs List</h3> 
      <p style={{textAlign:"center",fontWeight:"lighter"}}>Check status of all applications. </p>
      <JobsAppliedByStudent></JobsAppliedByStudent>
      {/* <div class="flex" id="testapp-body">
        <div class="contents">Dashboard will be displayed here</div>
      </div> */}
    </div>
  );
}
