import { useEffect, useState } from "react";
import API from "../../../../utils/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ProjectItem = ({ title, subtitle, image, url }) => (
  <a
    href={url}
    className="flex justify-center items-center w-[100%] lg:w-full md:mx-20 mx-10"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="relative w-[100%] md:w-full rounded-[10px] overflow-hidden aspect-[16/9]">
      <div
        className="absolute inset-0 bg-center bg-cover rounded-[15px]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 md:rounded-[15px] rounded-[4px]" />
      </div>
      <div
        className="relative z-10 flex flex-col justify-end h-full 
                      md:pb-4 pb-1 md:pl-5 pl-2 text-start"
      >
        <div className="text-[10px] sm:text-base md:text-lg lg:text-xl xl:text-2xl fontEB text-white">
          {title}
        </div>
        <p className="md:pt-1 sm:pt-2 text-[8px] sm:text-sm md:text-base lg:text-lg text-white fontRegular">
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.error("Response:", error.response);
      });
  }, []);

  // const extendedProjects =
  //   projects.length < 6 ? [...projects, ...projects, ...projects] : projects;

  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-auto">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3.4}
          freeMode={true}
          loop={true}
          // loopedSlides={extendedProjects.length}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="md:px-6 px-1">
              <ProjectItem
                title={project.title}
                subtitle={project.subTitle}
                image={project.imageUrl}
                url={project.url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
