import React, { useState } from "react";
import ProfilePage from "./student-profile/ProfilePage";

export default function ViewStudent() {
  const [student_id, set_student_id] = useState();
  React.useEffect(() => {
    let pathArray = window.location.pathname.split("/");
    let sid = pathArray[2];
    set_student_id(sid);
    console.log("Student id inside function is ", student_id);
  }, []);
  console.log("Student id is ", student_id);
  return (
    <div>
      {student_id && (
        <ProfilePage student_id={student_id} isCoordinator={true}></ProfilePage>
      )}
    </div>
  );
}
