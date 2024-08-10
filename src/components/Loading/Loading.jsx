import React from "react";
import { BeatLoader } from "react-spinners";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="app-loading">
      <BeatLoader color="#f41f51" />
    </div>
  );
};

export default Loading;
