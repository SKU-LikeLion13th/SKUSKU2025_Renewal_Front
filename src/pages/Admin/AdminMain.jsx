import { useNavigate } from "react-router-dom";

export default function AdminMain() {
  const navigate = useNavigate();

  const handleTrackSelect = (track) => {
    // track: FRONT-END, BACK-END, DESIGN
    navigate(`/admin/LectureManagement/${track}`);
  };

  return (
    <div className="mt-40">
      <h2>트랙 선택</h2>
      <div className="space-x-4">
        <button onClick={() => handleTrackSelect("FRONT-END")}>
          프론트엔드
        </button>
        <button onClick={() => handleTrackSelect("BACK-END")}>백엔드</button>
        <button onClick={() => handleTrackSelect("DESIGN")}>디자인</button>
      </div>

      {/* 각 메뉴별 이동 */}
      <div className="mt-6 space-x-4">
        <button onClick={() => handleTrackSelect("FRONT-END")}>
          과제 등록하기
        </button>
        {/* 다른 메뉴도 비슷하게 처리 가능 */}
      </div>
    </div>
  );
}
