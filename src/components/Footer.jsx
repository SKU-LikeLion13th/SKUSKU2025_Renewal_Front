import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#0B0B0B] text-white px-12 pt-16 ">
      <div>
        {/* 위 */}
        <div className="flex space-x-28 border-b border-[#202020] pb-16">
          {/* project */}
          <div className="flex flex-col pl-28">
            <Link to="/project" className="text-[#2D5ABB] fontBold mb-2">
              PROJECT
            </Link>
            <Link to="/project?tab=13" className="text-[#B0B0B0] my-3">
              13기
            </Link>
            <Link to="/project?tab=12" className="text-[#B0B0B0] my-3">
              12기
            </Link>
            <Link to="/project?tab=11" className="text-[#B0B0B0] my-3">
              11기
            </Link>
          </div>
          {/* team */}
          <div className="flex flex-col">
            <Link to="/team" className="text-[#2D5ABB] fontBold mb-2">
              TEAM
            </Link>
            <Link to="/team?tab=13" className="text-[#B0B0B0] my-3">
              13기
            </Link>
            <Link to="/team?tab=13" className="text-[#B0B0B0] my-3">
              12기
            </Link>
            <Link to="/team?tab=13" className="text-[#B0B0B0] my-3">
              11기
            </Link>
          </div>
          {/* contact */}
          <div className="flex flex-col">
            <Link to="/" className="text-[#2D5ABB] fontBold mb-2">
              CONTACT
            </Link>
            <div className="flex flex-col">
              <Link className="text-[#B0B0B0] my-3">문의하기</Link>
              <Link className="text-[#B0B0B0] my-3">모집공고</Link>
            </div>
          </div>
        </div>
        {/* 아래 */}
        <div className="pl-28 py-8 flex justify-between items-end">
          <div className="text-[#B0B0B0] text-[12px]">
            <p>주소: 경기도 안양시 만안구 성결대학로 53</p>
            <p>문의처: sku@likelion.org</p>
          </div>
          <div className="fontSB text-[12px] text-[#4F4F4F]">
            SKU LIKELION @2025_V2
          </div>
        </div>
      </div>
    </div>
  );
}
