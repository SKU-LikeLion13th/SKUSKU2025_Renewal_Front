import { useState } from "react";
import API from "../utils/axios";
export default function CCBtn({ isHovered, textSize = "text-[13px]" }) {
  const handleClick = async () => {
    try {
      const res = await API.get("/log/status");
      const user = res.data;

      if ((user.role === "BABY_LION", "ADMIN_LION")) {
        window.location.href = "/CyberCampus";
      } else {
        alert("접근 권한이 없습니다.");
      }
    } catch (err) {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-center text-white items-center px-4 py-2 rounded-sm transition-colors duration-300 cursor-pointer
          ${
            isHovered
              ? "bg-[#8DB7FF] text-black hover:bg-[#2D5ABB]"
              : "bg-[#2D5ABB]"
          }
        `}>
      <img
        src="/assets/images/campus.png"
        alt=""
        width={"16px"}
        className="mr-2"
      />
      <p className={`${textSize}`}>CYBERCAMPUS</p>
    </div>
  );
}
