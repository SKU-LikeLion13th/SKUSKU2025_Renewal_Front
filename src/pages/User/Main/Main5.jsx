import ProjectSlider from "./Slider/ProjectSlider";

export default function Main5() {
  return (
    <div className="bg-[#121212] pt-14 sm:pb-30 pb-12">
      <div className="">
        {/* projects */}
        <div>
          <div className="flex flex-col text-center justify-center">
            <p className="text-[#3B79FF] fontBold sm:text-[30px] text-[20px]">
              PROJECTS
            </p>
            <p className="fontThin text-[#ffffff] sm:mt-8 mt-2 sm:text-[18px] text-[9px] mb-12">
              성결대학교 멋쟁이사자처럼과 함께한 프로젝트들을 소개합니다.
            </p>
          </div>
          {/* 스크롤 버튼 */}
          <div></div>
        </div>
        {/* 스르륵 */}
        <div className="sm:mx-9 mx-4">
          <ProjectSlider />
        </div>
      </div>
    </div>
  );
}
