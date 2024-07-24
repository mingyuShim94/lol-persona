export const runtime = "edge";

interface GeminiData {
  strengths: {
    tags: string[];
    description: string;
  };
  weaknesses: {
    tags: string[];
    description: string;
  };
  improvements: {
    tags: string[];
    description: string;
  };
  summary: string;
}

interface AnalysisSectionProps {
  title: string;
  tags: string[];
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface PersonalityAnalysisProps {
  geminiDataJson: GeminiData;
}

// import React, { useEffect, useState } from "react";
// import { fetchGameData, fetchGeminiData } from "@/lib/utils";
import { Sword, Shield, Target, TrendingUp } from "lucide-react";
import ChampMasteryUI from "@/components/champMasteryUI";
import { fetchRiotData } from "@/lib/riotApi";
import { fetchGeminiData } from "@/lib/geminiApi";
import { sleep } from "@/lib/utils";

export default async function Result(props: any) {
  console.log("props", props);
  const userId = props.params.id;
  const region = props.searchParams.region;
  // console.log("userId", userId);
  // console.log("region", region);

  const riotData = await fetchRiotData(userId, region);
  const geminiData = await fetchGeminiData(riotData);
  const geminiDataJson = JSON.parse(geminiData);

  const SwordIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />
      <path d="M19 21l2-2" />
    </svg>
  );

  const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );

  const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );

  // const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  //   title,
  //   tags,
  //   description,
  //   icon: Icon,
  // }) => (
  //   <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6 border-2 border-yellow-500">
  //     <h3 className="text-lg sm:text-xl font-bold mb-4 text-yellow-400 flex items-center">
  //       <Icon className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
  //       {title}
  //     </h3>
  //     <div className="mb-4 flex flex-wrap">
  //       {tags.map((tag, index) => (
  //         <span
  //           key={index}
  //           className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm mr-2 mb-2"
  //         >
  //           {tag}
  //         </span>
  //       ))}
  //     </div>
  //     <p className="text-blue-200">{description}</p>
  //   </div>
  // );

  // const PersonalityAnalysis: React.FC<PersonalityAnalysisProps> = ({
  //   geminiDataJson,
  // }) => {
  //   return (
  //     <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-yellow-500">
  //       <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
  //         Your LOL Personality Analysis
  //       </h2>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <AnalysisSection
  //           title="Strengths"
  //           tags={geminiDataJson.strengths.tags}
  //           description={geminiDataJson.strengths.description}
  //           icon={TargetIcon}
  //         />
  //         <AnalysisSection
  //           title="Weaknesses"
  //           tags={geminiDataJson.weaknesses.tags}
  //           description={geminiDataJson.weaknesses.description}
  //           icon={SwordIcon}
  //         />
  //         <AnalysisSection
  //           title="Improvements"
  //           tags={geminiDataJson.improvements.tags}
  //           description={geminiDataJson.improvements.description}
  //           icon={ShieldIcon}
  //         />
  //       </div>
  //       <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-yellow-500">
  //         <h3 className="text-lg sm:text-xl font-bold mb-4 text-yellow-400 flex items-center">
  //           <TargetIcon className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
  //           Summary
  //         </h3>
  //         <p className="text-blue-200">{geminiDataJson.summary}</p>
  //       </div>
  //     </div>
  //   );
  // };
  const PersonalityAnalysis: React.FC<PersonalityAnalysisProps> = ({
    geminiDataJson,
  }) => {
    return (
      <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-yellow-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Your LOL Personality Analysis
        </h2>

        {/* Summary Section */}
        <div className="mb-8 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-yellow-500">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-400 flex items-center justify-center">
            <TargetIcon className="mr-2 w-6 h-6 sm:w-8 sm:h-8" />
            Summary
          </h3>
          <p className="text-blue-200 text-center text-lg">
            {geminiDataJson.summary}
          </p>
        </div>

        {/* Main Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalysisSection
            title="Strengths"
            tags={geminiDataJson.strengths.tags}
            description={geminiDataJson.strengths.description}
            icon={SwordIcon}
          />
          <AnalysisSection
            title="Weaknesses"
            tags={geminiDataJson.weaknesses.tags}
            description={geminiDataJson.weaknesses.description}
            icon={ShieldIcon}
          />
          <AnalysisSection
            title="Improvements"
            tags={geminiDataJson.improvements.tags}
            description={geminiDataJson.improvements.description}
            icon={TrendingUpIcon}
          />
        </div>
      </div>
    );
  };

  const AnalysisSection: React.FC<AnalysisSectionProps> = ({
    title,
    tags,
    description,
    icon: Icon,
  }) => (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-yellow-500 flex flex-col h-full">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-yellow-400 flex items-center">
        <Icon className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
        {title}
      </h3>
      <div className="mb-4 flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs sm:text-sm mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-blue-200 flex-grow">{description}</p>
    </div>
  );
  const AnalysisLoading = () => (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg border-2 border-yellow-500 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-500"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <span className="text-yellow-500 text-2xl font-bold">AI</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">
        Analysis in Progress
      </h2>
      <p className="text-gray-300 text-lg">
        Please wait while we process your data...
      </p>
      <div className="mt-4 flex space-x-1">
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
        <div
          className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <ChampMasteryUI userId={userId} gameData={riotData} />

        {geminiDataJson ? (
          <PersonalityAnalysis geminiDataJson={geminiDataJson} />
        ) : (
          <AnalysisLoading />
        )}
      </div>
    </div>
  );
}
