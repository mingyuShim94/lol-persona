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
        const data = await fetchGameData(decodeURIComponent(props.params.id));

        // console.log("data", data);

        setFormattedId(props.params.id.replace("-", "#"));

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
  }, [props.params.id]);

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

  return (
    <div className="flex flex-col justify-center items-center pt-4 pb-4">
      <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-md w-[500px] border border-gray-3000">
        <h1 className="text-[24px] font-bold mb-4 text-center lg:text-[32px]">
          {decodeURIComponent(formattedId || "")}
        </h1>
        <h2 className="text-[20px] font-bold mb-4 text-center lg:text-[24px]">
          님의 챔피언 데이터
        </h2>
      </div>
      {
        // gameData && gameData.length > 0 && (
        //   <div className="flex flex-col items-center mb-4">
        //     <p className="text-lg font-semibold">PUUID:</p>
        //     <p className="text-lg mb-2">{gameData[0].puuid}</p>
        //   </div>
        // )
      }
      <div className="flex flex-col w-full mt-4 justify-center items-center">
        <div className="flex flex-col items-center">
          <ul className=" flex flex-wrap gap-4">
            {gameData &&
              gameData.map((data: GameData, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-100 p-4 rounded-md  border border-gray-300"
                >
                  <li className="mb-2">
                    <p className="text-lg font-semibold">
                      Champion ID: {data.championId}
                    </p>
                    <p>Champion Level: {data.championLevel}</p>
                    <p>Champion Points: {data.championPoints}</p>
                    <p>Champion Name: {data.championName}</p>
                  </li>
                </div>
              ))}
          </ul>
        </div>
        <div className="flex flex-col items-center mt-4">
          <h3 className="text-lg font-semibold mb-2">
            당신의 롤 심리 분석 결과
          </h3>
          <div className="bg-gray-200 p-4 rounded-md w-full max-w-[500px] text-wrap">
            {geminiData ? (
              <div className="whitespace-pre-wrap">{geminiData}</div>
            ) : (
              <p>AI 응답을 기다리는 중...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
