"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState(""); // 추가: 입력 데이터 상태 관리

  const onClickSearch = () => {
    const formattedInputData = inputData.replace("#", "-");
    // console.log("formattedInputData", formattedInputData);
    router.push(`/result/${formattedInputData}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  return (
    <div className="flex flex-col  items-center  bg-gray-100 min-h-screen justify-center">
      <h1 className="text-[30px] font-extrabold mb-4 lg:text-[40px]">
        LOL - Persona
      </h1>
      <h2 className="text-[15px] font-semibold mb-8 text-center lg:text-[20px] ">
        당신의 챔피언 취향이 성격을 말해줍니다.
      </h2>
      <input
        type="text"
        placeholder="Summoner name + #KR1"
        className="p-3 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 lg:w-[270px] w-[220px] mb-4"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        className="bg-blue-600 text-white p-3 rounded-md w-[220px] hover:bg-blue-700 lg:w-[270px] transition-colors"
        onClick={onClickSearch}
      >
        성격분석하기
      </button>
    </div>
  );
};

export default Page;
