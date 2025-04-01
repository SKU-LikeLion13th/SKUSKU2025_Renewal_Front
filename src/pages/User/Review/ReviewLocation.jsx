import React from 'react'
import { TiHome } from 'react-icons/ti';
import { IoIosArrowForward } from 'react-icons/io';

export default function ReviewLocation() {
  return (
    <div className='flex text-[#999999] items-center'>
      <TiHome className='w-[20px]' />
      <span className="font-bold">
        <IoIosArrowForward />
      </span>
    </div>
  )
}
