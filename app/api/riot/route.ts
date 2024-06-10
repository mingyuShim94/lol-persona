import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "edge";

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

    return NextResponse.json(masteryResponse.data);
  } catch (error) {
    return NextResponse.json(
      { message: "API 요청 중 오류 발생" },
      { status: 500 }
    );
  }
}
