import { Link } from "react-router-dom";

const LectureTable = ({
  track,
  paddedItems,
  startIndex,
  selectedItems,
  toggleSelect,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[300px] w-full text-xs sm:text-sm md:text-base text-center border-t-[2.5px] border-t-[#232323]">
        <thead>
          <tr className="bg-[#F7F7F7]">
            <th className="py-2 border-b border-[#e0e0e0]">번호</th>
            <th className="py-2 border-b border-[#e0e0e0] text-left pl-4">
              제목
            </th>
            <th className="py-2 border-b border-[#e0e0e0]">수정</th>
            <th className="py-2 border-b border-[#e0e0e0]">선택</th>
          </tr>
        </thead>
        <tbody>
          {paddedItems.map((item, i) => (
            <tr
              key={i}
              className={`hover:bg-blue-50 transition cursor-pointer ${
                !item ? "opacity-50" : ""
              }`}
            >
              <td className="py-2 border-b border-[#e0e0e0]">
                {startIndex + i + 1}
              </td>
              <td className="py-2 border-b border-[#e0e0e0] text-left pl-4">
                {item ? item.title : ""}
              </td>
              <td className="py-2 border-b border-[#e0e0e0]">
                {item && (
                  <Link
                    to={`/admin/LectureManagement/${track}/LectureEdit/${item.id}`}
                  >
                    <button className="text-blue-600 underline text-xs sm:text-sm">
                      수정
                    </button>
                  </Link>
                )}
              </td>
              <td className="py-2 border-b border-[#e0e0e0]">
                {item ? (
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4"
                  />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureTable;
