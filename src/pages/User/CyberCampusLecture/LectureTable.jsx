import { Link } from "react-router-dom";

const LectureTable = ({ data }) => {
  return (
    <table className="w-full text-center border-t-[0.5px] border-black">
      <thead>
        <tr className="bg-[#f7f7f7]">
          <th className="py-2 border-b-[0.5px] w-[90px]">번호</th>
          <th className="py-2 border-b-[0.5px]">제목</th>
          <th className="py-2 border-b-[0.5px] w-[180px]">작성일</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => {
          if (item) {
            return (
              <tr key={item.id} className="hover:bg-blue-50 cursor-pointer">
                <td className="py-2 border-b-[0.5px]">{i + 1}</td>
                <td className="py-2 border-b-[0.5px] text-left px-12">
                  <Link to={`/CyberCampus/lecture-detail/${item.id}`}>
                    {item.title}
                  </Link>
                </td>
                {/* <td className="py-2 border-b-[0.5px]">
                  {new Date(item.createDate).toISOString().split("T")[0]}
                </td> */}
                <td className="py-2 border-b-[0.5px]">
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
                <td className="py-2 border-b-[0.5px]">{i + 1}</td>
                <td className="py-2 border-b-[0.5px] text-left px-4"></td>
                <td className="py-2 border-b-[0.5px]"></td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default LectureTable;
