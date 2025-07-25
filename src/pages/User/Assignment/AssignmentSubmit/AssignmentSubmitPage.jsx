import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../../utils/axios";
import AssignmentSubmit from "./AssignmentSubmit";

export default function AssignmentSubmitPage() {
  const { assignmentId, track } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const { data } = await API.get(`/assignment/track/${track}`);
        const found = data.find(
          (item) => item.assignmentId === parseInt(assignmentId)
        );
        if (found) {
          // ✅ track 정보를 포함시켜 넘김
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
