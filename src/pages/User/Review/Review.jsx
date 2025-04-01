import React, { useState, useEffect } from 'react';
import ReviewLocation from './ReviewLocation';
import ReviewBoard from './ReviewBoard';
import ReviewSearch from './ReviewSearch';
import ReviewTitle from '../../../components/Review/ReviewTitle';
import quizData from '../../../utils/QuizData.json';

export default function Review() {
  const postsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(quizData);
  }, []);

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

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
