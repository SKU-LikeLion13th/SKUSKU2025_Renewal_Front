import React from "react";
import Main1 from "./Main1";
import Main2 from "./Main2";

export default function Main() {
  return (
    <div className="w-full">
      <div className="section">
        <Main1 />
      </div>
      <div className="section">
        <Main2 />
      </div>
      <div className="section"></div>
    </div>
  );
}
