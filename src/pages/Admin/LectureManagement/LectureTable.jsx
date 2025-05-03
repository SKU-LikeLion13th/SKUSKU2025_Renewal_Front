import { Link } from "react-router-dom";

const LectureTable = ({
  track,
  paddedItems,
  startIndex,
  selectedItems,
  toggleSelect,
}) => {
  return (
    <table className="w-full text-center border-t-[2.5px] border-t-[#232323]">
      <thead>
        <tr className=" bg-[#F7F7F7]">
          <th className="py-2 border-b-[0.5px]">번호</th>
          <th className="py-2 border-b-[0.5px]">제목</th>
          <th className="py-2 border-b-[0.5px]">수정</th>
          <th className="py-2 border-b-[0.5px]">선택</th>
        </tr>
      </thead>
      <tbody>
        {paddedItems.map((item, i) => (
          <tr key={i} className="hover:bg-blue-50 cursor-pointer">
            <td className="py-2 border-b-[0.5px]">{startIndex + i + 1}</td>
            <td className="py-2 border-b-[0.5px] text-left pl-4">
              {item ? item.title : ""}
            </td>
            <td className="py-2 border-b-[0.5px]">
              {item && (
                <Link
                  to={`/admin/LectureManagement/${track}/LectureEdit/${item.id}`}
                >
                  <button className="fontLight text-[15px] underline">
                    수정
                  </button>
                </Link>
              )}
            </td>
            <td className="py-2 border-b-[0.5px]">
              {item ? (
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                />
              ) : (
                ""
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LectureTable;
