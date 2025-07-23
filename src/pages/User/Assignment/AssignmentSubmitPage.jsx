import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/axios";
import AssignmentSubmit from "./AssignmentSubmit/AssignmentSubmit";

export default function AssignmentSubmitPage() {
  const { assignmentId, track } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const { data } = await API.get(`/assignment/track/${track}`);
        console.log("과제 목록:", data);
        const found = data.find(
          (item) => item.assignmentId === parseInt(assignmentId)
        );
        if (found) {
          // track도 함께 assignment에 포함
          setAssignment({ ...found, track });
        } else {
          alert("해당 과제를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("과제 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    if (assignmentId && track) {
      fetchAssignment();
    }
  }, [assignmentId, track]);

  if (!assignment) return <div>로딩 중...</div>;

  return (
    <>
      <AssignmentSubmit assignment={assignment} />
    </>
  );
}
