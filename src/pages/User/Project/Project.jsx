import React, { useState } from "react";

export default function Project() {
  const sampleProjects = [
    {
      id: 1,
      title: "퍼즐 물품대여 서비스",
      subTitle: "성결대학교 모든 동아리원들의 편의성 확대",
      classTh: "12",
      url: "",
    },
    {
      id: 2,
      title: "2024 보궐선거",
      subTitle: "입후보자 확인 및 투표 독려",
      classTh: "12",
      url: "https://example.com/project2",
    },
    {
      id: 3,
      title: "새로운 안녕, 올라 HOLA!",
      subTitle: "2024 신입생 오리엔테이션",
      classTh: "11",
      url: "https://example.com/project3",
    },
    {
      id: 4,
      title: "2024 총선거",
      subTitle: "입후보자 확인 및 투표 독려",
      classTh: "11",
      url: "https://example.com/project4",
    },
    {
      id: 5,
      title: "글Lover",
      subTitle: "2023 글천절",
      classTh: "12",
      url: "https://example.com/project5",
    },
    {
      id: 6,
      title: "파동",
      subTitle: "2023 영암체전",
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
      <div className="w-4/5 mx-auto pt-50">
        <div className="pb-4 mx-auto text-center font-extrabold md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-[40px] text-[#3B79FF]">LIKELION</div>
          <div className="text-[55px] text-white">PROJECTS</div>
        </div>

        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-white md:gap-19 sm:grid-cols-2 sm:w-full lg:grid-cols-4">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="w-10/12 mx-auto cursor-pointer md:w-full hover:shadow-xl duration-500 hover:-translate-y-1 group"
              onClick={() => openProject(project.url)}>
              <div className="relative">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqxIlBDHBkj7hJIaYtajS6YqelRKh_dAh-Q&s"
                  alt={project.title}
                  className="w-full h-[190px] rounded-md shadow-lg group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <span className="px-4 py-2 text-lg text-white bg-blue-500 rounded-lg font-bold">
                    사이트 보러가기
                  </span>
                </div>
              </div>
              <div className="p-2">
                <div className="my-1 text-sm xl:my-2 font-bold min-[500px]:text-lg lg:text-xl xl:text-[23px]">
                  {project.title}
                </div>
                <div className="text-[#A2A2A2] text-xs sm:text-sm xl:text-lg">
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
