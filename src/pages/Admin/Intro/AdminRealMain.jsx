import React from "react";
import IntroPart1 from "../../User/CyberCampus/CyberCampusMain/IntroPart1";
import IntroPart2 from "../../User/CyberCampus/CyberCampusMain/IntroPart2";
import IntroPart3 from "../../User/CyberCampus/CyberCampusMain/IntroPart3";

const AdminRealMain = () => {
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

export default AdminRealMain;
