import NavBar from "./navbar/NavBar";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


export default function CoordinatorDashBoard() {
    const history = useHistory();
  return (
    <div>
      <NavBar></NavBar>
      <br></br>
      <Button color="primary" variant="contained" onClick={() => { history.push('/students/') }}>Students List</Button>
      <br></br>
      <br></br>
      <Button color="primary" variant="contained" onClick={() => { history.push('/jobs-list/') }}>Jobs List</Button>

    </div>
  );
}
