import React from "react";

export default function TeamSection({ title, members }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="flex justify-around gap-4 bg-[#1B1B1B] p-6 rounded-lg">
        {members.map((member) => (
          <div key={member.name} className="flex items-center space-x-4">
            <div className="text-4xl">{member.emoji}</div>
            <div>
              <div className="text-xl text-white font-semibold flex items-center gap-1 mb-2">
                {member.name} <span className="text-sm">{member.role}</span>
              </div>
              <div className="text-gray-400 text-[13px]">
                {member.department}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
