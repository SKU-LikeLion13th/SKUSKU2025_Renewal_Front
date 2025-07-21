import React from 'react';

export default function ReviewTitle() {
  const redirectPath = localStorage.getItem("redirectAfterLogin") || "";
  const pathParts = redirectPath.split("/");
  const trackType = pathParts[pathParts.length - 1] || "";


  const trackTypeMap = {
    FRONTEND: 'FRONT-END',
    BACKEND: 'BACK-END',
    DEGINE: 'DEGINE', // 필요하면 여기도 변경 가능
  };

  const displayTrack = trackTypeMap[trackType] || trackType || '';

  return (
    <div>
      <div className='flex fontBold sm:text-[35px] text-[28px]'>
        {displayTrack ? `${displayTrack} 복습공간` : '복습공간 관리'}
      </div>
    </div>
  );
}
