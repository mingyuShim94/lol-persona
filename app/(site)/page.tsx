"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCaretDown } from "react-icons/fa";

import { Button } from "@/components/ui/button";
const Page = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState(""); // 추가: 입력 데이터 상태 관리
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

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
      <div className="flex flex-row items-center bg-white p-3 border border-gray-300 rounded-full mb-5">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="p-3 w-[100px] h-[50px] justify-between border-none hover:bg-transparent "
              >
                <div>지역</div>
                <FaCaretDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Korea
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
                disabled
              >
                North America
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Europe West
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <input
          type="text"
          placeholder="Summoner name + #KR1"
          className="p-3 text-gray-800 bg-white border-none rounded-md lg:w-[270px] w-[220px] focus:outline-none"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

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
