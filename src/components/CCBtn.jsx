import { Link } from "react-router-dom";

export default function CCBtn({ isHovered }) {
  return (
    <Link to="CyberCampus">
      <div
        className={`flex text-white items-center px-4 py-2 rounded-sm transition-colors duration-300
          ${
            isHovered
              ? "bg-[#8DB7FF] text-black hover:bg-[#2D5ABB]"
              : "bg-[#2D5ABB]"
          }
        `}
      >
        <img
          src="/assets/images/campus.png"
          alt=""
          width={"16px"}
          className="mr-2"
        />
        <p className="text-[14px]">CYBERCAMPUS</p>
      </div>
    </Link>
  );
}
