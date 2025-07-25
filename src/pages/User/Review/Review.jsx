import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ReviewLocation from './ReviewLocation';
import ReviewBoard from './ReviewBoard';
import ReviewSearch from './ReviewSearch';
import ReviewTitle from './ReviewTitle';
import quizData from '../../../utils/QuizData.json';
import Breadcrumb from '../../../components/Breadcrumb';

export default function Review() {
  const postsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const { trackType } = useParams();

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
    <div className='flex min-h-screen mx-auto'>
      <div className='flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12'>
        <ReviewTitle />

        <div className='flex justify-start w-full sm:mt-10 mt-8 pb-5'>
          <Breadcrumb/>
        </div>

        <div className='flex justify-center w-full sm:mt-12 mt-8'>
          <ReviewBoard quizzes={currentPosts} trackType={trackType} />
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
