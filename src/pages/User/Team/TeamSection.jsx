import React from "react";

export default function TeamSection({ title, members, isCompact = false }) {
  return (
    <div className="w-full">
      <h2 className="text-[clamp(14px,1.8vw,24px)] font-bold text-white mb-3 whitespace-nowrap">
        {title}
      </h2>
      <div className="bg-[#1B1B1B] px-4 py-8 rounded-lg">
        <div className="flex flex-wrap justify-around gap-9">
          {members.map((member) => (
            <div
              key={member.name}
              className={`flex flex-1 items-center justify-center gap-9 sm:gap-5 origin-top transition-transform duration-200                    
                          ${
                            isCompact
                              ? "scale-[clamp(0.65,2.5vw,0.85)]"
                              : "scale-[clamp(0.55,3.5vw,1)]"
                          }`}
              style={{ minWidth: "max-content" }}>
              <div className="basis-1/2 flex-shrink-0 flex justify-end">
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-contain"
                  style={{
                    width: `clamp(70px, ${parseInt(member.imgWidth) * 0.8}px, ${
                      member.imgWidth
                    })`,
                    height: `clamp(70px, ${
                      parseInt(member.imgHeight) * 0.8
                    }px, ${member.imgHeight})`,
                  }}
                />
              </div>
              <div className="basis-1/2 min-w-0 flex-shrink-0">
                <div className="text-white font-semibold flex items-center gap-1 text-[clamp(14px,1.5vw,18px)] overflow-hidden whitespace-nowrap text-ellipsis">
                  {member.name}
                  <span className="text-[clamp(11px,1.2vw,14px)] text-gray-300">
                    {member.role}
                  </span>
                </div>
                <div className="text-gray-400 text-[clamp(10px,1.1vw,13px)] whitespace-nowrap text-ellipsis">
                  {member.department}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
