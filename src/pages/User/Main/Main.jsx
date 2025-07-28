import React from "react";
import Main1 from "./Main1";
import Main2 from "./Main2";
import Main3 from "./Main3";
import Main4 from "./Main4";
import MobileMain4 from "./MobileMain4";
import Main5 from "./Main5";
import { useMediaQuery } from "./useMediaQuery";

export default function Main() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div className="w-full bg-black sm:mt-0 py-3 ">
      <div className="section">
        <Main1 />
      </div>
      <div className="section">
        <Main2 />
      </div>
      <div className="section">
        <Main3 />
      </div>
      <div className="section">{isMobile ? <MobileMain4 /> : <Main4 />}</div>
      {/* <div className="section">
        <Main4 />
      </div> */}
      <div className="section">
        <Main5 />
      </div>
    </div>
  );
}
