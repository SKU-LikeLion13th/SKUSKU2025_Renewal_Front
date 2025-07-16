import React, { useState } from "react";

const TaskCard = ({ id, title, subtitle, icon, hovercolor, defaultcolor, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgSizeClass =
  id === "02"
    ? "w-[14px] sm:w-[16px] md:w-[18px] mb-1"
    : "w-6 sm:w-7 md:w-8";


  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className="w-24 h-40 sm:w-40 sm:h-50 md:w-46 md:h-58 rounded-[19px] p-5 md:p-7 flex flex-col transition-colors duration-200 cursor-pointer"
        style={{
          backgroundColor: isHovered ? hovercolor : defaultcolor,
        }}
      >
        <span className="text-white text-left text-xs sm:text-sm md:text-base">{id}</span>

        <div className="flex-1 flex items-end justify-start mb-2 md:mb-4">
          <img src={icon} alt={`${title} 아이콘`} className={imgSizeClass} />
        </div>

        <button className="w-full text-left">
          <p className="text-white fontMedium text-xs md:text-base">{title}</p>
          <p className="text-white fontMedium text-xs md:text-base">{subtitle}</p>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
