import { useEffect, useState } from "react";
import API from "../../../../utils/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ProjectItem = ({ title, subtitle, image, url }) => (
  <a
    href={url}
    className="flex justify-center items-center w-full"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div
      className="w-full aspect-[16/9] rounded-[10px] overflow-hidden mx-2 sm:mx-3 md:mx-4 lg:mx-5 bg-cover bg-center flex flex-col justify-end p-4"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent), url(${image})`,
      }}
    >
      <div className="text-[10px] sm:text-base md:text-lg lg:text-xl xl:text-2xl fontEB text-white">
        {title}
      </div>
      <p className="pt-1 text-[8px] sm:text-sm md:text-base lg:text-lg text-white fontRegular">
        {subtitle}
      </p>
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
      <div className="w-[90%]">
        <Swiper
          modules={[Autoplay]}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          slidesPerView={1}
          breakpoints={{
            1280: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 2.8,
            },
            768: {
              slidesPerView: 2.6,
            },
            640: {
              slidesPerView: 1,
            },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className="h-auto">
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
