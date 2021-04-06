import React, { useState } from "react";
import ProfilePage from "./student-profile/ProfilePage";

export default function ViewStudent() {
  const [student_id, set_student_id] = useState(-1);
  React.useEffect(() => {
    let pathArray = window.location.pathname.split("/");
    let sid = pathArray[2];
    set_student_id(sid);
    console.log("Student id inside function is ", sid,student_id);
    return () => {
      set_student_id(-1);
      console.log("Destroying");
    }
  }, []);
  console.log("Student id is ", student_id);
  return (
    <div>
      {student_id && student_id!=-1 && (
        <ProfilePage student_id={student_id} isCoordinator={true}></ProfilePage>
      )}
      {student_id==-1 && (<div>Loading...</div>)}
    </div>
  );
}
