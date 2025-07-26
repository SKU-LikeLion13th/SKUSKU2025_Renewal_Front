import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../../../../utils/axios";
import AssignmentSubmit from "./AssignmentSubmit";

export default function AssignmentSubmitPage() {
  const { assignmentId, track } = useParams();
  const location = useLocation();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentSubmitData = async () => {
      try {
        setLoading(true);

        const basicAssignmentData = location.state?.selectedAssignment;

        let submitData = {
          content: "",
          feedback: "",
          files: [],
        };

        //isSubmit이 true인 경우에만
        if (basicAssignmentData?.isSubmit == "True") {
          const { data } = await API.get(`/assignment/submit/${assignmentId}`);
          console.log("제출 정보:", data);
          submitData = data;
        }

        const mergedAssignment = {
          ...(basicAssignmentData || {}),
          content: submitData.content || "",
          feedback: submitData.feedback || "",
          files: submitData.files || [],
          track: track,
          assignmentId:
            basicAssignmentData?.assignmentId || parseInt(assignmentId),
        };

        console.log("합쳐진 과제 정보:", mergedAssignment);
        setAssignment(mergedAssignment);
      } catch (error) {
        console.error("과제 정보를 불러오는 데 실패했습니다:", error);
        if (location.state?.selectedAssignment) {
          setAssignment({
            ...location.state.selectedAssignment,
            track: track,
            content: "",
            feedback: "",
            files: [],
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId && track) {
      fetchAssignmentSubmitData();
    }
  }, [assignmentId, track, location.state]);

  // fallback: state로 전달받은 데이터가 없고 API도 실패한 경우
  useEffect(() => {
    if (!loading && !assignment && !location.state?.selectedAssignment) {
      const fetchBasicAssignmentData = async () => {
        try {
          // 기본 과제 정보를 가져오는 fallback API 호출
          const { data } = await API.get(`/assignment/track/${track}`);
          const found = data.find(
            (item) => item.assignmentId === parseInt(assignmentId)
          );

          if (found) {
            const { data: submitData } = await API.get(
              `/assignment/submit/${assignmentId}`
            );

            setAssignment({
              ...found,
              track: track,
              content: submitData.content || "",
              feedback: submitData.feedback || "",
              files: submitData.files || [],
            });
          } else {
            alert("해당 과제를 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("과제 기본 정보를 불러오는 데 실패했습니다:", error);
        }
      };

      fetchBasicAssignmentData();
    }
  }, [loading, assignment, assignmentId, track, location.state]);

  if (loading) return <div>로딩 중...</div>;
  if (!assignment) return <div>과제 정보를 불러올 수 없습니다.</div>;

  return (
    <>
      <AssignmentSubmit assignment={assignment} />
    </>
  );
}
