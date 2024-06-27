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

import React, { useEffect, useState } from "react";
import { fetchGameData, fetchGeminiData } from "@/lib/utils";

export const runtime = "edge";

const Result = (props: any) => {
  const [gameData, setGameData] = useState<GameData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [geminiData, setGeminiData] = useState<string | null>(null);
  const [formattedId, setFormattedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("props.params.id", decodeURIComponent(props.params.id));
        console.log("props.searchParams:", props.searchParams);
        const data = await fetchGameData(props.searchParams);

        console.log("data:", data);
        setFormattedId(props.searchParams.id.replace("-", "#"));

        setGameData(data);
        setLoading(false);

        if (data) {
          const geminiData = await fetchGeminiData(data);
          console.log("Gemini Data:", geminiData);
          setGeminiData(geminiData);
        }
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border-2 border-yellow-500">
          <h1 className="text-3xl font-bold mb-2 text-center text-yellow-400">
            Champion Mastery Analysis
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-300">
            Your Top Champions
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {gameData &&
            gameData.map((data, index) => (
              <ChampionCard key={index} {...data} />
            ))}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-yellow-500">
          <h3 className="text-2xl font-bold mb-4 text-center text-yellow-400">
            Your LOL Personality Analysis
          </h3>
          <div className="bg-gray-700 p-4 rounded-md">
            <pre className="whitespace-pre-wrap text-blue-200 font-sans text-sm leading-relaxed">
              {geminiData}
            </pre>
          </div>
        </div>
      </div>
    </div>
    // <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8">
    //   <div className="max-w-6xl mx-auto">
    //     <h1 className="text-[24px] font-bold mb-4 text-center lg:text-[32px]">
    //       {decodeURIComponent(formattedId || "")}
    //     </h1>
    //     <h2 className="text-[20px] font-bold mb-4 text-center lg:text-[24px]">
    //       님의 챔피언 데이터
    //     </h2>
    //   </div>

    //   <div className="flex flex-col w-full mt-4 justify-center items-center">
    //     <div className="flex flex-col items-center">
    //       <ul className=" flex flex-wrap gap-4">
    //         {gameData &&
    //           gameData.map((data: GameData, index: number) => (
    //             <div
    //               key={index}
    //               className="flex flex-col items-center bg-gray-100 p-4 rounded-md  border border-gray-300"
    //             >
    //               <li className="mb-2">
    //                 <p className="text-lg font-semibold">
    //                   Champion ID: {data.championId}
    //                 </p>
    //                 <p>Champion Level: {data.championLevel}</p>
    //                 <p>Champion Points: {data.championPoints}</p>
    //                 <p>Champion Name: {data.championName}</p>
    //               </li>
    //             </div>
    //           ))}
    //       </ul>
    //     </div>
    //     <div className="flex flex-col items-center mt-4">
    //       <h3 className="text-lg font-semibold mb-2">
    //         당신의 롤 심리 분석 결과
    //       </h3>
    //       <div className="bg-gray-200 p-4 rounded-md w-full max-w-[500px] text-wrap">
    //         {geminiData ? (
    //           <div className="whitespace-pre-wrap">{geminiData}</div>
    //         ) : (
    //           <p>AI 응답을 기다리는 중...</p>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Result;
