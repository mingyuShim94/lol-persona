"use client";
import React from "react";
import { GridLoader } from "react-spinners";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <GridLoader color="red" />
      <div className="text-xl font-bold text-red-600">Oops!</div>
      <div className="text-gray-800">잠시 후 다시 시도해주세요.</div>
    </div>
  );
};

export default ErrorMessage;
