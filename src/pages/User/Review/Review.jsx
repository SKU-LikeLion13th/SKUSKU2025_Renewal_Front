import React, { useState } from 'react';
import ReviewLocation from '../../../components/Review/ReviewLocation';
import ReviewBoard from '../../../components/Review/ReviewBoard';
import ReviewSearch from '../../../components/Review/ReviewSearch';
import ReviewTitle from '../../../components/Review/ReviewTitle';

export default function Review() {
  const postsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const quizzes = [
    { Id: 1, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 2, title: "2주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 6 },
    { Id: 3, title: "3주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 7 },
    { Id: 4, title: "4주차 복습퀴즈", IsSubmit: "제출", score: 5, total: 8 },
    { Id: 5, title: "5주차 복습퀴즈", IsSubmit: "제출", score: 6, total: 9 },
    { Id: 6, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 7, title: "2주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 6 },
    { Id: 8, title: "3주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 7 },
    { Id: 9, title: "4주차 복습퀴즈", IsSubmit: "제출", score: 5, total: 8 },
    { Id: 10, title: "5주차 복습퀴즈", IsSubmit: "제출", score: 6, total: 9 },
    { Id: 11, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 12, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 13, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 14, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 15, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 1, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 2, title: "2주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 6 },
    { Id: 3, title: "3주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 7 },
    { Id: 4, title: "4주차 복습퀴즈", IsSubmit: "제출", score: 5, total: 8 },
    { Id: 5, title: "5주차 복습퀴즈", IsSubmit: "제출", score: 6, total: 9 },
    { Id: 6, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 7, title: "2주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 6 },
    { Id: 8, title: "3주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 7 },
    { Id: 9, title: "4주차 복습퀴즈", IsSubmit: "제출", score: 5, total: 8 },
    { Id: 10, title: "5주차 복습퀴즈", IsSubmit: "제출", score: 6, total: 9 },
    { Id: 11, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 12, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 13, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 14, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 15, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
  ];

  const totalPosts = quizzes.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 검색어에 맞는 게시물만 필터링
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 현재 페이지에 맞는 게시물만 표시
  const currentPosts = filteredQuizzes.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className='flex mx-auto min-h-screen'>
      <div className='flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12'>
        <ReviewTitle />

        <div className='flex w-full mt-14 justify-start'>
          <ReviewLocation />
        </div>

        <div className='flex w-full mt-14 justify-center'>
          <ReviewBoard quizzes={currentPosts} />
        </div>

        <div className='flex w-full'>
          <ReviewSearch 
            totalPosts={filteredQuizzes.length} 
            totalPages={Math.ceil(filteredQuizzes.length / postsPerPage)} 
            currentPage={currentPage} 
            onPageChange={handlePageChange} 
            onSearch={handleSearch} // 검색어 전달
          />
        </div>
      </div>
    </div>
  );
}
