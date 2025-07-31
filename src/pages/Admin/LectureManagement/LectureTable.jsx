import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const LectureTable = ({
  track,
  paddedItems,
  startIndex,
  selectedItems,
  toggleSelect,
}) => {
  const headers = ["번호", "제목", "수정", "삭제"];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // AssignmentBoard와 동일한 flex값과 텍스트 크기
  const flexValues = isSmallScreen
    ? ["1", "5", "2", "2.5"]
    : ["1", "10", "2", "2"];
  const textSize = isSmallScreen ? "text-[11px]" : "text-[13.5px]";

  const headerStyle = `flex fontBold justify-center px-1 ${textSize}`;
  const rowStyle = "flex w-full border-b border-b-[#E0E0E0] p-2";
  const titleCellStyle = `flex justify-start px-1 ${textSize} cursor-pointer`;

  return (
    <div className="flex flex-col items-center w-full">
      {/* 헤더 */}
      <div className="flex w-full border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] bg-[#F7F7F7] p-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className={headerStyle}
            style={{
              flex: flexValues[index],
              textAlign: index === 1 ? "left" : "center",
              paddingLeft: index === 1 ? "1rem" : 0,
            }}
          >
            {header}
          </div>
        ))}
      </div>

      {/* 데이터 행 */}
      <div
        className={`flex w-full flex-col ${
          isSmallScreen ? "min-h-[300px]" : " min-h-[250px] sm:min-h-[590px] "
        }`}
      >
        {paddedItems.filter(Boolean).length === 0 ? (
          <div className="flex justify-center items-center p-10 text-gray-500 min-h-[590px] w-full">
            등록된 강의가 없습니다.
          </div>
        ) : (
          paddedItems
            .filter(Boolean) // 실제 데이터만
            .map((item, i) => (
              <div key={i} className={rowStyle}>
                {/* 번호 */}
                <div
                  className={`flex justify-center px-1 ${textSize}`}
                  style={{ flex: flexValues[0] }}
                >
                  {startIndex + i + 1}
                </div>

                {/* 제목 */}
                <div
                  className={titleCellStyle}
                  style={{ flex: flexValues[1], paddingLeft: "1rem" }}
                  title={item.title}
                >
                  {item.title}
                </div>

                {/* 수정 */}
                <div
                  className={`flex justify-center px-1 ${textSize}`}
                  style={{ flex: flexValues[2] }}
                >
                  <Link
                    to={`/admin/LectureManagement/${track}/LectureEdit/${item.id}`}
                  >
                    <button className="text-blue-600 underline text-xs sm:text-sm">
                      수정
                    </button>
                  </Link>
                </div>

                {/* 삭제 */}
                <div
                  className={`flex justify-center px-1 ${textSize}`}
                  style={{ flex: flexValues[3] }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default LectureTable;
