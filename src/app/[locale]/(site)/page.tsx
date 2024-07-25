"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { regionTags } from "@/lib/constant";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUIState from "@/hooks/useUIState";
import { useTranslations } from "next-intl";

const Page = () => {
  const router = useRouter();
  const { region, setRegion } = useUIState();
  const [inputData, setInputData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const HomeText = useTranslations("Home");
  const localeText = useTranslations("locale");

  const onClickSearch = () => {
    if (inputData.trim() === "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      const formattedInputData = inputData.replace("#", "-");
      router.push(
        `${localeText("code")}/result/${formattedInputData}?region=${region}`
      );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white min-h-[calc(100vh-64px)] p-4">
      <div className="w-full max-w-md px-4 py-6 bg-gray-800 rounded-lg shadow-2xl border-2 border-yellow-500 transform transition duration-500">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-center text-yellow-400 tracking-wider">
          LOL - Persona
        </h1>
        <h2 className="text-sm sm:text-base md:text-lg font-medium mb-6 text-center text-blue-300">
          {HomeText("subtitle1")}
          <br />
          {HomeText("subtitle2")}
        </h2>
        <div className="flex flex-col space-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-black-500 hover:bg-blue-600 text-white border border-blue-600 rounded-lg shadow-lg transform transition duration-200"
              >
                {regionTags[region].regionName}
                <FaChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-full max-w-[390px] origin-top-right mt-2 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
            >
              <ScrollArea className="h-[200px]">
                {Object.keys(regionTags).map((regionTag) => (
                  <DropdownMenuCheckboxItem
                    key={regionTag}
                    onClick={() => setRegion(regionTag)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                  >
                    {regionTags[regionTag].regionName}
                  </DropdownMenuCheckboxItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <input
              type="text"
              placeholder={`${HomeText("gameNameText")} + #${region}`}
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
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg shadow-lg transform transition duration-200"
            onClick={onClickSearch}
          >
            {HomeText("analyzeText")}
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
