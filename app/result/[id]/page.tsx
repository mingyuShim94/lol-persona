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
import { fetchGameData } from "@/lib/utils";

const Result = (props: any) => {
  const [gameData, setGameData] = useState<GameData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("props.params.id", decodeURIComponent(props.params.id));
        const data = await fetchGameData(decodeURIComponent(props.params.id));

        setGameData(data);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Game Data for {decodeURIComponent(props.params.id)}</h1>
      {gameData && gameData.length > 0 && <p>PUUID: {gameData[0].puuid}</p>}
      <ul>
        {gameData &&
          gameData.map((data: GameData, index: number) => (
            <li key={index}>
              <p>Champion ID: {data.championId}</p>
              <p>Champion Level: {data.championLevel}</p>
              <p>Champion Points: {data.championPoints}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Result;
