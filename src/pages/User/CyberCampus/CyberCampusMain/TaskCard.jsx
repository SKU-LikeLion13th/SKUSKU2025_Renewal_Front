import React, { useState } from "react";

const TaskCard = ({ id, title, subtitle, icon, hovercolor, defaultcolor, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgSizeClass = id === "02" ? "w-[18px] mb-1" : "w-8";

  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className="w-46 h-58 rounded-[19px] p-7 flex flex-col transition-colors duration-200 cursor-pointer"
        style={{
          backgroundColor: isHovered ? hovercolor : defaultcolor,
        }}
      >
        <span className="text-white text-left">{id}</span>

        <div className="flex-1 flex items-end justify-start mb-4">
          <img src={icon} alt={`${title} 아이콘`} className={imgSizeClass} />
        </div>

        <button className="w-full text-left">
          <p className="text-white fontMedium">{title}</p>
          <p className="text-white fontMedium">{subtitle}</p>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
