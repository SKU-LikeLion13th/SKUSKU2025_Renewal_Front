import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function ReviewTitle() {
  const { trackType: paramTrackType } = useParams(); // URL 파라미터에서 trackType
  const location = useLocation(); // 이전 페이지에서 전달한 state

  const trackType = paramTrackType || location.state?.trackType;

  const trackTypeMap = {
    FRONTEND: 'FRONT-END',
    BACKEND: 'BACK-END',
    DESIGN: 'DESIGN',
  };

  const displayTrack = trackTypeMap[trackType] || trackType || '';

  return (
    <div>
      <div className='flex fontBold sm:text-[35px] text-[23px]'>
        {displayTrack ? `${displayTrack} 복습공간` : '복습공간 관리'}
      </div>
    </div>
  );
}
