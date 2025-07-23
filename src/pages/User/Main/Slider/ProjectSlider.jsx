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
    <div className="relative w-[90%] mx-2 rounded-[10px] overflow-hidden aspect-[4/3] md:aspect-[16/9]">
      <div
        className="absolute inset-0 bg-center bg-cover rounded-[15px]"
        style={{
          backgroundImage: `url(data:image/png;base64,${image})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-[15px]" />
      </div>
      <div
        className="relative z-10 flex flex-col justify-end h-full 
                      pb-3 pl-3 sm:pb-4 sm:pl-4 md:pb-5 md:pl-5 lg:pb-6 lg:pl-6 text-start"
      >
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl fontEB text-white">
          {title}
        </div>
        <p className="pt-1 sm:pt-2 text-[10px] sm:text-sm md:text-base lg:text-lg text-white fontRegular">
          {subtitle}
        </p>
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
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.error("Response:", error.response);
      });
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
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-full">
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
