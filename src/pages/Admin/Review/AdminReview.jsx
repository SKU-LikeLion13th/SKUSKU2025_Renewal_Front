import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import AdminReviewTitle from "./AdminReviewTitle";
import AdminReviewBoard from "./AdminReviewBoard";
import AdminReviewSearch from "./AdminReviewSearch";
import ReviewLocation from "../../User/Review/ReviewLocation";
import Breadcrumb from "../../../components/Breadcrumb";

const POSTS_PER_PAGE = 15;

export default function AdminReview() {
  const { trackType } = useParams();

  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 데이터 불러오기
  useEffect(() => {
    const fetchReviewQuizzes = async () => {
      try {
        const response = await axios.get(`/reviewWeek/${trackType}`);
        // response.data 가 배열이라고 가정
        const quizList = response.data.map((quiz) => ({
          reviewWeekId: quiz.reviewWeekId,
          title: quiz.title,
          score: quiz.score,
          total: quiz.total,
          isSubmit: quiz.isSubmit,
        }));
        setAllPosts(quizList);
        setCurrentPage(1);
        setSearchTerm("");
      } catch (error) {
        console.error("리뷰 퀴즈 불러오기 실패:", error);
      }
    };
    if (trackType) fetchReviewQuizzes();
  }, [trackType]);

  // 검색 필터링
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return allPosts;
    return allPosts.filter((post) => post.title.includes(searchTerm));
  }, [allPosts, searchTerm]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // 현재 페이지 게시물만 추출
  const postsToShow = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 검색 함수
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // 검색 시 페이지 1로 초기화
  };

  return (
    <div className="flex min-h-screen mx-auto">
      <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">
        <AdminReviewTitle />

        <div className='flex justify-start w-full sm:mt-10 mt-10 pb-2'>
          <Breadcrumb />
        </div>

        <div className="flex justify-center w-full sm:mt-12 mt-8">
          <AdminReviewBoard posts={postsToShow} trackType={trackType} setAllPosts={setAllPosts} />
        </div>

        <div className="flex w-full">
          <AdminReviewSearch
            totalPosts={filteredPosts.length}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
