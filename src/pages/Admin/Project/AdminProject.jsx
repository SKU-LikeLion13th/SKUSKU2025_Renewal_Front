import React, { useEffect, useState } from "react";
import AdminProjectTabs from "./AdminProjectTabs";
import API from "../../../utils/axios";

export default function AdminProject() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProjects, setSelectedProjects] = useState([]);

  // 기수 목록 자동 생성
  const [tabs, setTabs] = useState([]);

  // 탭 클릭 시 필터링
  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
    if (tabValue === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.classTh === tabValue)
      );
    }
    setSelectedProjects([]);
  };

  const toggleSelectProject = (projectId) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? [] : [projectId]
    );
  };

  // const toggleSelectProject = (projectId) => {
  //   setSelectedProjects((prev) =>
  //     prev.includes(projectId)
  //       ? prev.filter((id) => id !== projectId)
  //       : [...prev, projectId]
  //   );
  // };

  // const toggleSelectAll = () => {
  //   const allIds = filteredProjects.map((p) => p.id);
  //   const isAllSelected = allIds.every((id) => selectedProjects.includes(id));
  //   if (isAllSelected) {
  //     setSelectedProjects((prev) => prev.filter((id) => !allIds.includes(id)));
  //   } else {
  //     setSelectedProjects((prev) => Array.from(new Set([...prev, ...allIds])));
  //   }
  // };

  const deleteSelectedProjects = async () => {
    if (selectedProjects.length !== 1) {
      alert("하나의 프로젝트만 선택해주세요.");
      return;
    }

    const projectId = selectedProjects[0];

    try {
      await API.delete(`/admin/project/${projectId}`);
      alert("삭제가 완료되었습니다.");

      // 삭제 후 새로고침
      const res = await API.get("/project/all");
      const data = res.data;
      setProjects(data);
      setFilteredProjects(
        activeTab === "all" ? data : data.filter((p) => p.classTh === activeTab)
      );
      setSelectedProjects([]);

      // 탭 목록도 다시 재생성
      const classList = [...new Set(data.map((p) => p.classTh))]
        .sort()
        .reverse();
      setTabs(classList);
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/project/all");
        const data = res.data;
        setProjects(data);
        setFilteredProjects(data);

        //고유한 기수 목록 뽑기 (중복 제거)
        const classList = [...new Set(data.map((p) => p.classTh))]
          .sort()
          .reverse();
        setTabs(classList);
      } catch (err) {
        console.error("프로젝트 전체 불러오기 실패:", err);
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
        <AdminProjectTabs
          activeTab={activeTab}
          onTabClick={handleTabClick}
          selectedProjects={selectedProjects}
          deleteSelectedProjects={deleteSelectedProjects}
          // toggleSelectAll={toggleSelectAll}
          filteredProjects={filteredProjects}
          tabs={tabs} // 동적으로 전달
        />

        {/* 프로젝트 리스트 */}
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-8 text-white md:gap-19 sm:grid-cols-2 sm:w-full lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="w-10/12 mx-auto md:w-full">
              <div className="relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full aspect-[4/3] rounded-md shadow-lg object-cover"
                />
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <div className="my-1 text-sm xl:my-2 font-bold min-[500px]:text-lg lg:text-xl xl:text-[23px]">
                    {project.title}
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => toggleSelectProject(project.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 accent-[#3B79FF]"
                  />
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
