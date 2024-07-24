"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ErrorMessage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border-2 border-yellow-500 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-50"></div>
            <svg
              className="relative w-24 h-24 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-yellow-4000 mb-4">{`Oops! Something's Not Right`}</h1>
        <p className="text-center text-gray-3000 mb-6">{`We encountered an unexpected issue. Don't worry, it's not you – it's us. Let's try to get you back on track.`}</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Return to Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
