import React from "react";
import IntroPart1 from "./IntroPart1";
import IntroPart2 from "./IntroPart2";
import IntroPart3 from "./IntroPart3";

const CyberCampusIntro = () => {
  return (
    <div className="text-center">
      <div className="part1 mb-24">
        <IntroPart1 />
      </div>
      <div className="part2">
        <IntroPart2 />
      </div>
      <div className="part3">
        <IntroPart3 />
      </div>
    </div>
  );
};

export default CyberCampusIntro;
