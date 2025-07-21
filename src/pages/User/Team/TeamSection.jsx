import React from "react";

export default function TeamSection({ title, members }) {
  return (
    <div>
      <h2 className="text-[clamp(16px,2vw,24px)] font-bold text-white mb-4 whitespace-nowrap">
        {title}
      </h2>
      <div className="flex justify-around flex-wrap gap-6 bg-[#1B1B1B] px-6 py-12 rounded-lg">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center gap-4 scale-[clamp(0.6,4vw,1)] origin-top whitespace-nowrap">
            <img
              src={member.img}
              alt={member.name}
              className={`object-contain`}
              style={{
                width: member.imgWidth || "100px",
                height: member.imgHeight || "auto",
              }}
            />
            <div className="min-w-0">
              <div className="text-white font-semibold flex items-center gap-1 text-[18px] overflow-hidden whitespace-nowrap text-ellipsis">
                {member.name}
                <span className="text-sm text-gray-300">{member.role}</span>
              </div>
              <div className="text-gray-400 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                {member.department}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
