import axios from "axios";
import { regionTags, riotApiParams } from "./constant";
// export const runtime = "edge";
export const fetchRiotData = async (userData: any, region: any) => {
  console.log("fetchRiot userData: ", userData);
  console.log("fetchRiot region: ", region);

  try {
    const headers = {
      "X-Riot-Token": process.env.LOL_API_KEY,
    };
    const defaultNameTag = regionTags[region].riotApiTag;
    const regionId_dragon = riotApiParams.dragonRegion;
    const searchCount = riotApiParams.searchCount;
    const [gameName, tagLine] = userData.includes("-")
      ? userData.split("-")
      : [userData, defaultNameTag];

    const accountResponse = await axios.get(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers }
    );
    const { puuid } = accountResponse.data;
    console.log("puuid:", puuid);
    const regionId_riot = regionTags[region].riotApiTag;

    const masteryResponse = await axios.get(
      `https://${regionId_riot}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${searchCount}`,
      { headers }
    );
    const championInfo = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/14.11.1/data/${regionId_dragon}/champion.json`
    );
    // console.log("championInfo:", championInfo.data);

    const masteryData = masteryResponse.data;
    const championData = championInfo.data.data;
    // console.log("masteryResponse:", masteryResponse.data);
    const result = masteryData.map((mastery: any) => {
      const championKey = Object.keys(championData).find(
        (key: any) => championData[key].key === mastery.championId.toString()
      );
      return {
        ...mastery,
        championName: championKey ? championData[championKey].name : "Unknown",
      };
    });

    // console.log("result:", result);

    return result;
  } catch (error) {
    console.error("Error occurred during API request:", error);
    return null;
  }
};
