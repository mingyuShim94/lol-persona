"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState(""); // 추가: 입력 데이터 상태 관리

  const onClickSearch = () => {
    const formattedInputData = inputData.replace("#", "-");
    console.log("formattedInputData", formattedInputData);
    router.push(`/result/${formattedInputData}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Summoner name + #KR1"
        className="p-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={onClickSearch}
      >
        search
      </button>
    </div>
  );
};

export default Page;
