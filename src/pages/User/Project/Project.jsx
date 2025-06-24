import React, { useEffect, useState } from "react";
import ProjectTabs from "./ProjectTabs";
import API from "../../../utils/axios";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [tabs, setTabs] = useState([]);

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    if (tabValue === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.classTh === tabValue)
      );
    }
  };

  const openProject = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await API.get("/project/all");
        const data = response.data;
        setProjects(data);
        setFilteredProjects(data);

        const classList = [...new Set(data.map((p) => p.classTh))]
          .sort()
          .reverse();
        setTabs(classList);
      } catch (error) {
        console.error("프로젝트 가져오기 실패:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen mx-auto bg-black">
      <div className="w-4/5 mx-auto py-40">
        {/* 제목 */}
        <div className="pb-4 mx-auto text-center font-extrabold md:w-fit md:pb-12 md:pr-20 md:border-b-2 md:text-start md:mx-0">
          <div className="text-[40px] text-[#3B79FF]">LIKELION</div>
          <div className="text-[55px] text-white">PROJECTS</div>
          <div className="text-white text-lg mt-2 font-medium">
            총{" "}
            <span className="text-[#3B79FF] font-bold">
              {filteredProjects.length}건
            </span>
            의 프로젝트가 있습니다.
          </div>
        </div>

        {/* 탭 */}
        <ProjectTabs
          activeTab={activeTab}
          onTabClick={handleTabClick}
          tabs={tabs}
        />

        {/* 프로젝트 리스트 */}
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-white md:gap-19 sm:grid-cols-2 sm:w-full lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="w-10/12 mx-auto cursor-pointer md:w-full hover:shadow-xl duration-500 hover:-translate-y-1 group"
              onClick={() => openProject(project.projectUrl)}>
              <div className="relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-[190px] rounded-md shadow-lg group-hover:opacity-30 transition-opacity duration-500 object-cover"
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
