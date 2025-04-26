import React from "react";

const TaskCard = ({id, title, subtitle}) => {
  return (
    <div>
      <div className="w-46 h-58 bg-[#7f7f7f] rounded-[19px] p-5 flex flex-col">
        <span className="text-white text-left mt-2">{id}</span>

        <div className="flex-1 flex items-end justify-start">
          <p>이미지</p>
        </div>

        <button className="w-full text-left mb-2">
          <p className="text-white fontMedium">{title}</p>
          <p className="text-white fontMedium">{subtitle}</p>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
