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
import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const Page = () => {
  const regionTags = [
    {
      region: "Korea",
      tag: "KR1",
      subtitle1: "당신의 챔피언 선호도가",
      subtitle2: "당신의 성격을 드러냅니다.",
      gameNameText: "플레이어 이름",
      analyzeText: "성격분석하기",
    },
    {
      region: "North America",
      tag: "NA1",
      subtitle1: "Your champion preferences",
      subtitle2: "reveal your personality",
      gameNameText: "Game Name",
      analyzeText: "Analyze Personality",
    },
    {
      region: "Europe West",
      tag: "EUW",
      subtitle1: "Your champion preferences",
      subtitle2: "reveal your personality",
      gameNameText: "Game Name",
      analyzeText: "Analyze Personality",
    },
  ];
  const router = useRouter();
  const [inputData, setInputData] = useState(""); // 추가: 입력 데이터 상태 관리

  const [showAlert, setShowAlert] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Korea");
  const [subtitle1, setSubtitle1] = useState("당신의 챔피언 선호도가");
  const [subtitle2, setSubtitle2] = useState("당신의 성격을 드러냅니다.");
  const [gameNameText, setGameNameText] = useState("플레이어 이름");
  const [analyzeText, setAnalyzeText] = useState("성격분석하기");
  const onClickSearch = () => {
    if (inputData.trim() === "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      const formattedInputData = inputData.replace("#", "-");
      alert(`Searching for: ${formattedInputData} in ${selectedRegion}`);
      router.push(`/result/${formattedInputData}?region=${selectedRegion}`);
    }
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  const getPlaceholder = (selectedRegion: string) => {
    const regionTag =
      regionTags.find((rt) => rt.region === selectedRegion)?.tag || "KR1";
    return `${gameNameText} + #${regionTag}`;
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4">
      <div className="w-full max-w-md px-6 py-8 bg-gray-800 rounded-lg shadow-2xl border-2 border-yellow-500 transform transition duration-500 ">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-yellow-400 tracking-wider">
          LOL - Persona
        </h1>
        <h2 className="text-lg font-medium mb-8 text-center text-blue-300">
          {subtitle1}
          <br />
          {subtitle2}
        </h2>
        <div className="flex flex-col space-y-4 ">
          <div className="relative z-20 flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[390px] justify-between bg-black-500 hover:bg-blue-600 text-white border border-blue-600 rounded-lg shadow-lg transform transition duration-200 "
                >
                  {selectedRegion}
                  <FaChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[390px] origin-top-right absolute left-0 mt-2  rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
              >
                {regionTags.map((regionTag) => (
                  <DropdownMenuCheckboxItem
                    key={regionTag.tag}
                    onClick={() => {
                      setSelectedRegion(regionTag.region);
                      setSubtitle1(regionTag.subtitle1);
                      setSubtitle2(regionTag.subtitle2);
                      setGameNameText(regionTag.gameNameText);
                      setAnalyzeText(regionTag.analyzeText);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    {regionTag.region}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={getPlaceholder(selectedRegion)}
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Button
            className={`w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg shadow-lg transform transition duration-200 ${"scale-105"}`}
            onClick={onClickSearch}
          >
            {analyzeText}
          </Button>
        </div>
      </div>
      {showAlert && (
        <Alert className="w-full max-w-md mt-4 bg-red-900 border-red-700 text-red-100">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please enter a game name before searching.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Page;
