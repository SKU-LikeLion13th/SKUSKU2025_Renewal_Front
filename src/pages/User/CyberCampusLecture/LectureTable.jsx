import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const LectureTable = ({ data, track }) => {
  const headers = ["번호", "제목", "작성일"];
  const [flexValues, setFlexValues] = useState(["1", "7", "2"]);

  useEffect(() => {
    const updateFlexValues = () => {
      if (window.innerWidth < 640) {
        setFlexValues(["1", "5.5", "2"]);
      } else {
        setFlexValues(["1", "7", "2"]);
      }
    };

    updateFlexValues();
    window.addEventListener("resize", updateFlexValues);
    return () => window.removeEventListener("resize", updateFlexValues);
  }, []);

  return (
    <div className="flex flex-col w-full text-xs sm:text-sm md:text-base  min-h-[250px] sm:min-h-[590px]">
      {/* 헤더 */}
      <div className="flex bg-[#F7F7F7] border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] p-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className="flex justify-center fontBold sm:px-1 px-0.5 sm:text-[13.5px] text-[12px]"
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

      {/* 내용 */}
      <div className="flex flex-col w-full h-full">
        {data.filter(Boolean).length === 0 ? (
          <div className="flex justify-center items-center p-10 text-gray-500 min-h-[590px] w-full">
            등록된 강의가 없습니다.
          </div>
        ) : (
          data.filter(Boolean).map((item, i) => (
            <div
              key={i}
              className={`flex w-full border-b border-b-[#E0E0E0] sm:px-1 px-0.5  sm:text-[13.5px] text-[12px] p-2 cursor-pointer hover:bg-blue-50 ${
                !item ? "opacity-50" : ""
              }`}
            >
              <div
                className="flex justify-center"
                style={{ flex: flexValues[0] }}
              >
                {i + 1}
              </div>
              <div
                className="flex justify-start"
                style={{ flex: flexValues[1], paddingLeft: "1rem" }}
              >
                {item ? (
                  <Link
                    to={`/cybercampus/lecture/${track}/lecture_detail/${item.id}`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div
                className="flex justify-center"
                style={{ flex: flexValues[2] }}
              >
                {item?.createDate && !isNaN(new Date(item.createDate))
                  ? new Intl.DateTimeFormat("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(item.createDate))
                  : "-"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LectureTable;
