import React, { useState } from "react";
import ProfilePage from "./student-profile/ProfilePage";
import {useParams} from "react-router-dom";

export default function ViewStudent() {
  let {student_id} = useParams();
  student_id=parseInt(student_id);
  console.log("-------------------------------> View student.js\t",student_id,typeof(student_id));
  return (
    <div>
      {student_id && (
        <ProfilePage student_id={student_id} isCoordinator={true}></ProfilePage>
      )}
      {!student_id && (<div>Loading...</div>)}
    </div>
  );
}
