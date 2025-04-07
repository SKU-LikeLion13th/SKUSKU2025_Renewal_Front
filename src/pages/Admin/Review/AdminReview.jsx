import React from 'react';
import AdminReviewTitle from './AdminReviewTitle';
import AdminReviewBoard from './AdminReviewBoard';
import AdminReviewSearch from './AdminReviewSearch';

export default function AdminReview() {

  return (
    <div className='flex min-h-screen mx-auto'>
      <div className='flex flex-col justify-start w-9/12 mx-auto mt-50 lg:w-8/12'>
        <AdminReviewTitle />

        <div className='flex justify-center w-full mt-14'>
          <AdminReviewBoard />
        </div>

        <div className='flex w-full'>
          <AdminReviewSearch />
        </div>
      </div>
    </div>
  );
}
