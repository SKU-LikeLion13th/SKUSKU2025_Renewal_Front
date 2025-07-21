import ProjectSlider from "./Slider/ProjectSlider";

export default function Main5() {
  return (
    <div className="bg-[#121212] py-[6%]">
      <div className="">
        {/* projects */}
        <div>
          <div className="flex flex-col text-center justify-center">
            <p className="text-[#3B79FF] fontBold text-[30px]">PROJECTS</p>
            <p className="fontThin text-[#ffffff] my-8">
              성결대학교 멋쟁이사자처럼과 함께한 프로젝트들을 소개합니다.
            </p>
          </div>
          {/* 스크롤 버튼 */}
          <div></div>
        </div>
        {/* 스르륵 */}
        <div>
          <ProjectSlider />
        </div>
      </div>
    </div>
  );
}
