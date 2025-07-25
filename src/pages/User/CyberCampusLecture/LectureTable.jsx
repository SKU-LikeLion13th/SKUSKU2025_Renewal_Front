import { Link } from "react-router-dom";

const LectureTable = ({ data }) => {
  return (
    <table className="min-w-[300px] w-full text-xs sm:text-sm md:text-base text-center border-t-[2.5px] border-t-[#232323]">
      <thead>
        <tr className="bg-[#f7f7f7]">
          <th className="py-2 border-b border-[#e0e0e0]">번호</th>
          <th className="py-2 border-b border-[#e0e0e0] text-left pl-4">
            제목
          </th>
          <th className="py-2 border-b border-[#e0e0e0]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          if (item) {
            return (
              <tr
                key={i}
                className={`hover:bg-blue-50 transition cursor-pointer ${
                  !item ? "opacity-50" : ""
                }`}
              >
                <td className="py-2 border-b border-[#e0e0e0]">{i + 1}</td>
                <td className="py-2 border-b border-[#e0e0e0] text-left pl-4">
                  <Link to={`/CyberCampus/lecture-detail/${item.id}`}>
                    {item.title}
                  </Link>
                </td>

                <td className="py-2 border-b border-[#e0e0e0]">
                  {item.createDate && !isNaN(new Date(item.createDate))
                    ? new Date(item.createDate).toLocaleDateString("ko-KR")
                    : "-"}
                </td>
              </tr>
            );
          } else {
            return (
              <tr
                key={`empty-${i}`}
                className="hover:bg-blue-50 cursor-pointer"
              >
                <td className="py-2 border-b border-[#e0e0e0]">{i + 1}</td>
                <td className="py-2 border-b border-[#e0e0e0]"></td>
                <td className="py-2 border-b border-[#e0e0e0]"></td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default LectureTable;
