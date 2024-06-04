"use client";

import React from "react";
import { BarLoader } from "react-spinners";

const LoadingBar = () => {
  return (
    <div>
      <BarLoader color="#36d7b7" cssOverride={{ width: "100%" }} />
    </div>
  );
};

export default LoadingBar;
