import axios from "axios";
import { NextResponse } from "next/server";

const regionMapping: { [key: string]: string } = {
  Korea: "asia",
  "North America": "na1",
  "Europe West": "euw1",
};

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userDataString = searchParams.get("userData");

    console.log("userData 받음:", userDataString);
    if (!userDataString) {
      return NextResponse.json(
        { message: "id 파라미터가 필요합니다." },
        { status: 400 }
      );
    }

    const userData = JSON.parse(userDataString);
    const region = userData.region;
    const regionId = regionMapping[region];
    let [gameName, tagLine] = userData.id.includes("-")
      ? userData.id.split("-")
      : [userData.id, region];

    console.log(
      "region:",
      region,
      "gameName:",
      gameName,
      "tagLine:",
      tagLine,
      "regionId:",
      regionId
    );

    const headers = {
      "X-Riot-Token": process.env.LOL_API_KEY,
    };

    const accountResponse = await axios.get(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers }
    );
    const { puuid } = accountResponse.data;

    const masteryResponse = await axios.get(
      `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=6`,
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

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
