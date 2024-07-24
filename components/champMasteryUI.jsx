import React from "react";
import { fetchRiotData } from "@/lib/riotApi";

const ChampionCard = ({ championName, championPoints }) => (
  <div className="bg-gradient-to-br from-blue-700 to-purple-700 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
    <h3 className="text-lg font-bold mb-1 text-center text-white">
      {championName}
    </h3>
    <p className="text-sm text-center text-yellow-200">
      Points: {championPoints.toLocaleString()}
    </p>
  </div>
);

export default async function ChampMasteryUI({ userId, gameData }) {
  const formattedId = decodeURIComponent(userId).replace("-", " #");
  // console.log("formattedId:", formattedId);
  // console.log("gameData:", gameData);
  return (
    <>
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
          gameData.map((data, index) => <ChampionCard key={index} {...data} />)}
      </div>
    </>
  );
}
