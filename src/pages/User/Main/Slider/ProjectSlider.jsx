import { useEffect, useState } from "react";
import API from "../../../../utils/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectItem = ({ title, subtitle, image, url }) => (
  <a
    href={url}
    className="flex justify-center items-center w-full"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="relative w-3/5 xl:w-full h-[14rem] mx-8 rounded-[15px] overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover rounded-[15px]"
        style={{
          backgroundImage: `url(data:image/png;base64,${image})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-[15px]"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full pb-6 pl-6 text-start">
        <div className="text-3xl fontEB text-white">{title}</div>
        <p className="pt-2 text-xl text-white fontRegular">{subtitle}</p>
      </div>
    </div>
  </a>
);

export default function ProjectSlider() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/project/all")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const settings = {
    arrows: false,
    rows: 1,
    slidesToShow: 3,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: false,
    responsive: [
      {
        breakpoint: 1280, // 1240px 미만에서는 슬라이드 개수를 1로 설정
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[85%] mx-auto">
        <Slider {...settings}>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              title={project.title}
              subtitle={project.subTitle}
              image={project.image}
              url={project.url}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
