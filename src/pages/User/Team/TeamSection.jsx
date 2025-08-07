import React, { useEffect, useState } from "react";

export default function TeamSection({ title, members, isCompact = false }) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");

    const handleResize = (e) => {
      setIsSmallScreen(e.matches);
    };

    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-[clamp(14px,1.8vw,24px)] font-bold text-white mb-3 whitespace-nowrap">
        {title}
      </h2>
      <div className="bg-[#1B1B1B] px-4 py-8 rounded-lg">
        <div className="flex flex-wrap justify-around gap-8 sm:gap-0">
          {members.map((member) => (
            <div
              key={member.name}
              className={`max-w-[300px] sm:max-w-0 flex flex-1 items-center justify-center origin-top transition-transform duration-200                    
                ${
                  isCompact
                    ? "scale-[clamp(0.65,2.5vw,0.85)]"
                    : "scale-[clamp(0.55,3.5vw,1)]"
                }`}
              style={{ minWidth: "max-content" }}
            >
              <div className="basis-1/2 flex-shrink-0 flex justify-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-contain"
                  style={{
                    width: `clamp(70px, ${parseInt(member.imgWidth) * 0.8}px, ${member.imgWidth})`,
                    height: `clamp(70px, ${parseInt(member.imgHeight) * 0.8}px, ${member.imgHeight})`,
                    ...(isSmallScreen && {
                      marginTop: member.imgMarginTop || "0px",
                      marginBottom: member.imgMarginBottom || "0px",
                      marginLeft: member.imgMarginLeft || "0px",
                      marginRight: member.imgMarginRight || "0px",
                      paddingTop: member.imgPaddingTop || "0px",
                      paddingBottom: member.imgPaddingBottom || "0px",
                      paddingLeft: member.imgPaddingLeft || "0px",
                      paddingRight: member.imgPaddingRight || "0px",
                    }),
                  }}
                />
              </div>
              <div className="px-4 basis-1/2 min-w-0 flex-shrink-0">
                <div className="text-white font-semibold flex items-center gap-1 text-[clamp(14px,1.5vw,18px)] whitespace-nowrap text-ellipsis">
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
