"use client";
interface MilestoneGrades {
  [index: number]: string;
}

interface RequireGradeCounts {
  [key: string]: number;
}

interface RewardConfig {
  rewardValue: string;
  rewardType: string;
  maximumReward: number;
}

interface NextSeasonMilestone {
  requireGradeCounts: RequireGradeCounts;
  rewardMarks: number;
  bonus: boolean;
  rewardConfig?: RewardConfig;
}
interface GameData {
  puuid: string;
  championId: number;
  championLevel: number;
  championName: string;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  markRequiredForNextLevel: number;
  tokensEarned: number;
  championSeasonMilestone: number;
  milestoneGrades: MilestoneGrades;
  nextSeasonMilestone: NextSeasonMilestone;
}

interface GeminiData {
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

interface AnalysisSectionProps {
  title: string;
  items: string[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface PersonalityAnalysisProps {
  geminiDataJson: GeminiData;
}

import React, { useEffect, useState } from "react";
import { fetchGameData, fetchGeminiData } from "@/lib/utils";
import { Sword, Shield, Target, TrendingUp } from "lucide-react";

export const runtime = "edge";

const Result = (props: any) => {
  const [gameData, setGameData] = useState<GameData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [geminiData, setGeminiData] = useState<GeminiData | null>(null);
  // const [geminiDataString, setGeminiDataString] = useState<string | null>(null);
  const [geminiDataJson, setGeminiDataJson] = useState<GeminiData | null>(null);

  const [formattedId, setFormattedId] = useState<string | null>(null);

  // const [traits, setTraits] = useState<string[] | null>(null);
  // const [strengths, setStrengths] = useState<string[] | null>(null);
  // const [weaknesses, setWeaknesses] = useState<string[] | null>(null);
  // const [improvements, setImprovements] = useState<string[] | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const cacheKey = JSON.stringify(props.searchParams);
  //       const cachedData = localStorage.getItem(cacheKey);
  //       setFormattedId(props.searchParams.id.replace("-", "#"));

  //       if (cachedData) {
  //         const { gameData, geminiData } = JSON.parse(cachedData);
  //         setGameData(gameData);
  //         setGeminiData(geminiData);
  //         setLoading(false);
  //       } else {
  //         const data = await fetchGameData(props.searchParams);
  //         setGameData(data);

  //         if (data) {
  //           const geminiData = await fetchGeminiData(data);
  //           setGeminiData(geminiData);

  //           localStorage.setItem(
  //             cacheKey,
  //             JSON.stringify({ gameData: data, geminiData })
  //           );
  //         }
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       setError(err as Error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [props.searchParams]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("props.params.id", decodeURIComponent(props.params.id));
        // console.log("props.searchParams:", props.searchParams);
        const userData = props.searchParams;
        const data = await fetchGameData(userData);

        // console.log("resultpage gameData:", data);
        setFormattedId(props.searchParams.id.replace("-", "#"));

        setGameData(data);
        setLoading(false);

        if (data) {
          const geminiDataString = await fetchGeminiData(data, userData);
          console.log("Gemini Data String:", geminiDataString);
          const geminiDataJson = JSON.parse(geminiDataString);
          // console.log("geminiDataJson:", geminiDataJson.traits);
          setGeminiData(geminiDataJson);
          setGeminiDataJson(geminiDataJson);

          // console.log("traits:", geminiData.traits);
          // setTraits(geminiDataJson.traits);
          // setStrengths(geminiDataJson.strengths);
          // setWeaknesses(geminiDataJson.weaknesses);
          // setImprovements(geminiDataJson.improvements);

          // console.log("strengths:", strengths);
          // console.log("weaknesses:", weaknesses);
          // console.log("improvements:", improvements);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.searchParams]);
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="relative w-32 h-32">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"></div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-2 bg-yellow-400 rounded-full animate-pulse"></div>

          {/* LOL icon (you can replace this with an actual LOL icon if available) */}
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-2xl font-bold text-blue-900">LOL</span>
          </div>
        </div>

        {/* Loading text */}
        <p className="mt-4 text-xl font-semibold text-white animate-pulse">
          Analyzing your champion mastery...
        </p>

        {/* Champion silhouettes */}
        <div className="mt-8 flex justify-center space-x-4">
          {["Darius", "Garen", "Lux", "Ahri", "Yasuo"].map(
            (champion, index) => (
              <div
                key={champion}
                className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden opacity-50 hover:opacity-100 transition-opacity duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ChampionCard = ({
    championName,
    championPoints,
  }: {
    championName: string;
    championPoints: number;
  }) => (
    <div className="bg-gradient-to-br from-blue-700 to-purple-700 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
      {/* <img
        src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/champion/${championName}.png`}
        alt={championName}
        className="w-20 h-20 mx-auto mb-2 rounded-full border-2 border-yellow-400"
      /> */}
      <h3 className="text-lg font-bold mb-1 text-center text-white">
        {championName}
      </h3>
      <p className="text-sm text-center text-yellow-200">
        Points: {championPoints.toLocaleString()}
      </p>
    </div>
  );

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

  const AnalysisSection: React.FC<AnalysisSectionProps> = ({
    title,
    items,
    icon: Icon,
  }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 border-2 border-yellow-500">
      <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
        <Icon className="mr-2" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-blue-200 flex items-start">
            <span className="text-yellow-500 mr-2">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const PersonalityAnalysis: React.FC<PersonalityAnalysisProps> = ({
    geminiDataJson,
  }) => {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-yellow-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Your LOL Personality Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnalysisSection
            title="Playstyle Traits"
            items={geminiDataJson.traits}
            icon={TargetIcon}
          />
          <AnalysisSection
            title="Strengths"
            items={geminiDataJson.strengths}
            icon={SwordIcon}
          />
          <AnalysisSection
            title="Areas for Improvement"
            items={geminiDataJson.weaknesses}
            icon={ShieldIcon}
          />
          <AnalysisSection
            title="Suggested Improvements"
            items={geminiDataJson.improvements}
            icon={TrendingUpIcon}
          />
        </div>
      </div>
    );
  };
  const AnalysisLoading = () => (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-yellow-500 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-yellow-400">AI is analyzing</h2>
        <p className="text-blue-300 mt-2">Please wait a moment...</p>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border-2 border-yellow-500">
          <h1 className="text-3xl font-bold mb-2 text-center text-yellow-400">
            Champion Mastery Analysis
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-300">
            {formattedId} Top Champions
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {gameData &&
            gameData.map((data, index) => (
              <ChampionCard key={index} {...data} />
            ))}
        </div>

        {/* {geminiDataJson && (
          <PersonalityAnalysis geminiDataJson={geminiDataJson} />
        )} */}

        {geminiDataJson ? (
          <PersonalityAnalysis geminiDataJson={geminiDataJson} />
        ) : (
          // <AnalysisLoading />
          <AnalysisLoading />
        )}
      </div>
    </div>
  );
};

export default Result;
