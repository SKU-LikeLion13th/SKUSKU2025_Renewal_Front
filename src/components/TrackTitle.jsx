import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function TrackTitle({ suffix = "", showOnlyTrack = false }) {
  const { track: paramTrackType } = useParams(); // URL 파라미터에서 trackType
  const location = useLocation(); // 이전 페이지에서 전달한 state

  const trackType = paramTrackType || location.state?.trackType;

  const trackTypeMap = {
    FRONTEND: "FRONT-END",
    BACKEND: "BACK-END",
    DESIGN: "DESIGN",
  };

  const displayTrack = trackTypeMap[trackType] || trackType || "";

  // displayTrack만 필요한 경우
  if (showOnlyTrack) {
    return displayTrack;
  }

  return (
    <div>
      <div className="flex fontBold sm:text-[35px] text-[23px]">
        {displayTrack && `${displayTrack} ${suffix}`}
      </div>
    </div>
  );
}
