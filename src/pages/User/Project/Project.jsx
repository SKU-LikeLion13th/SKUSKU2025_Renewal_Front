import React, { useState } from "react";

export default function Project() {
  const sampleProjects = [
    {
      id: 1,
      title: "멋쟁이사자처럼 홈페이지",
      subTitle: "멋쟁이사자처럼 SKU 홈페이지 리뉴얼 프로젝트",
      classTh: "12",
      url: "",
    },
    {
      id: 2,
      title: "캠퍼스마켓",
      subTitle: "대학생들을 위한 중고거래 플랫폼",
      classTh: "12",
      url: "https://example.com/project2",
    },
    {
      id: 3,
      title: "스터디 매칭 서비스",
      subTitle: "함께 공부할 팀원을 찾는 매칭 서비스",
      classTh: "11",
      url: "https://example.com/project3",
    },
    {
      id: 4,
      title: "대학생활 도우미",
      subTitle: "대학 생활에 필요한 정보 제공 서비스",
      classTh: "11",
      url: "https://example.com/project4",
    },
    {
      id: 5,
      title: "식단 관리 앱",
      subTitle: "건강한 식단 관리를 위한 모바일 앱",
      classTh: "12",
      url: "https://example.com/project5",
    },
    {
      id: 6,
      title: "학사 일정 관리",
      subTitle: "대학 학사 일정 및 과제 관리 시스템",
      classTh: "11",
      url: "https://example.com/project6",
    },
  ];

  const [projects, setProjects] = useState(sampleProjects);
  const [filteredProjects, setFilteredProjects] = useState(sampleProjects);

  /* 프로젝트 불러오기 코드 - 주석 처리됨
      const fetchProjects = async () => {
        try {
          const response = await API.get('/project/all');
          setProjects(response.data);
          setFilteredProjects(response.data);
        } catch (error) {
          console.error('프로젝트를 가져오는 중 오류 발생:', error);
        }
      };
      */

  const handleTabClick = (tabValue) => {
    if (tabValue === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.classTh === tabValue)
      );
    }
  };

  const openProject = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen mx-auto bg-black">
      <div className="w-10/12 mx-auto pt-28">
        <div className="pb-4 mx-auto text-center font-extrabold md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-4xl text-[#3B79FF]">LIKELION</div>
          <div className="text-[55px] text-white">PROJECTS</div>
        </div>

        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-white md:gap-16 sm:grid-cols-2 sm:w-full lg:grid-cols-4">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="w-10/12 mx-auto cursor-pointer md:w-full hover:shadow-xl duration-500 hover:-translate-y-1 group"
              onClick={() => openProject(project.url)}>
              <div className="relative">
                <img
                  src="https://mblogthumb-phinf.pstatic.net/MjAyMDA5MTZfNDgg/MDAxNjAwMjMwMDEwNjkx.YBGeDIJhaxDs24u-6tPELpBmIiKIM-cyxZNF1kFmK_0g.cokHWdn3stiLtjQ81VIo9FTKKgjlXGNyvkj6NQKxlewg.PNG.designmage/5.png?type=w800"
                  alt={project.title}
                  className="w-full rounded-lg shadow-lg group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <span className="px-4 py-2 text-lg text-white bg-blue-500 rounded-lg font-bold">
                    사이트 보러가기
                  </span>
                </div>
              </div>
              <div className="p-2">
                <div className="my-1 text-sm xl:my-2 font-bold min-[500px]:text-lg lg:text-xl xl:text-2xl">
                  {project.title}
                </div>
                <div className="text-xs sm:text-sm xl:text-lg">
                  {project.subTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
