import React from "react";
import Main1 from "./Main1";
import Main2 from "./Main2";
import Main3 from "./Main3";
import Main4 from "./Main4";
import Main5 from "./Main5";

export default function Main() {
  return (
    <div className="w-full">
      <div className="section">
        <Main1 />
      </div>
      <div className="section">{/* <Main2 /> */}</div>
      <div className="section">
        <Main3 />
      </div>
      <div className="section">
        <Main4 />
      </div>
      <div className="section">
        <Main5 />
      </div>
    </div>
  );
}
