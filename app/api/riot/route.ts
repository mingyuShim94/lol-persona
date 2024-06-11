import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "edge";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(input: any) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
  const simplifiedInput = input.map((champion: any) => ({
    championName: champion.championName,
    championPoints: champion.championPoints,
  }));

  const geminiInput = `리그오브레전드란 게임에서 챔피언 숙련도를 상위에서 부터 나열하면 
  ${JSON.stringify(simplifiedInput, null, 2)} 이다. 
  이를 종합적으로 참고하여 나의 행동심리를 분석해주고 성격의 장단점을 말해줘.`;
  // console.log(`리그오브레전드란 게임에서 챔피언 숙련도를 상위에서 부터 나열하면
  // ${JSON.stringify(simplifiedInput, null, 2)} 이다.
  // 이를 종합적으로 참고하여 나의 행동심리를 분석해주고 성격의 장단점을 말해줘.`);
  const result = await chatSession.sendMessage(geminiInput);
  // console.log(result.response.text());
  return result.response.text();
  // return "test";
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  console.log("id받음", id);
  if (!id) {
    return NextResponse.json(
      { message: "id 파라미터가 필요합니다." },
      { status: 400 }
    );
  }
  let gameName = "";
  let tagLine = "";
  if (id.includes("-")) {
    [gameName, tagLine] = id.split("-");
  } else {
    gameName = id;
    tagLine = "kr1";
  }
  console.log(gameName, tagLine);
  try {
    const headers = {
      "X-Riot-Token": "RGAPI-ab2a5e0c-1478-4e58-829a-57018cff00b0",
    };
    const accountResponse = await axios.get(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${tagLine}`,
      { headers }
    );
    const { puuid } = accountResponse.data;

    const masteryResponse = await axios.get(
      `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`,
      { headers }
    );

    const championInfo = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/14.11.1/data/ko_KR/champion.json"
    );

    const masteryData = masteryResponse.data;
    const championData = championInfo.data.data;

    const result = masteryData.map((mastery: any) => {
      const championKey = Object.keys(championData).find(
        (key: any) => championData[key].key === mastery.championId.toString()
      );
      return {
        ...mastery,
        championName: championKey ? championData[championKey].name : "Unknown",
      };
    });

    // console.log(result);

    // console.log(process.env.API_KEY);
    const geminiResult = await run(result);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "API 요청 중 오류 발생" },
      { status: 500 }
    );
  }
}
