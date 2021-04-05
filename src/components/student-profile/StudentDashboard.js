import NavBar from "../navbar/NavBar";
import JobsAppliedByStudent from "./JobsAppliedByStudent";

export default function StudentDashBoard() {
  return (
    <div>
      <NavBar></NavBar>
      <JobsAppliedByStudent></JobsAppliedByStudent>
      {/* <div class="flex" id="testapp-body">
        <div class="contents">Dashboard will be displayed here</div>
      </div> */}
    </div>
  );
}
