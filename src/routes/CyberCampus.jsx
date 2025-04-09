import React from "react";
import { Route, Routes } from "react-router-dom";
import CyberCampusIntro from "../pages/User/CyberCampus/CyberCampusMain/CyberCampusIntro";

const CyberCampus = () => {
  return (
    <>
      <Routes>
        <Route path="intro" element={<CyberCampusIntro />}></Route>
      </Routes>
    </>
  );
};

export default CyberCampus;
