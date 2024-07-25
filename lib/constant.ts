export const regionTags: {
  [key: string]: {
    regionName: string;
    riotApiTag: string;
  };
} = {
  EUW: {
    regionName: "Europe West",
    riotApiTag: "euw1",
  },
  KR1: {
    regionName: "Korea",
    riotApiTag: "kr",
  },

  NA1: {
    regionName: "North America",
    riotApiTag: "na1",
  },
  VN2: {
    regionName: "Vietnam",
    riotApiTag: "vn2",
  },
  EUNE: {
    regionName: "Europe Nordic & East",
    riotApiTag: "eun1",
  },

  BR1: {
    regionName: "Brazil",
    riotApiTag: "br1",
  },
  PH2: {
    regionName: "Philippines",
    riotApiTag: "ph2",
  },
  TR1: {
    regionName: "Türkiye",
    riotApiTag: "tr1",
  },

  TW2: {
    regionName: "Taiwan",
    riotApiTag: "tw2",
  },

  LAN: {
    regionName: "Latin America North",
    riotApiTag: "la1",
  },

  LAS: {
    regionName: "Latin America South",
    riotApiTag: "la2",
  },

  RU1: {
    regionName: "Russia",
    riotApiTag: "ru",
  },

  OCE: {
    regionName: "Oceania",
    riotApiTag: "oc1",
  },

  SG2: {
    regionName: "Singapore",
    riotApiTag: "sg2",
  },

  JP1: {
    regionName: "Japan",
    riotApiTag: "jp1",
  },

  TH2: {
    regionName: "Thailand",
    riotApiTag: "th2",
  },

  ME1: {
    regionName: "Middle East",
    riotApiTag: "me1",
  },
};

export const riotApiParams = {
  dragonRegion: "en_US",
  searchCount: 12,
};

// export const geminiApiParams = {
//   // systemPrompt:
//   //   "You are a top professional in game behavioral psychology and know personality theory very well. We will provide you with the top 10 champion proficiency rankings in a specific game, so please give a comprehensive analysis of the player's personality based on the high level of proficiency. Be sure to analyze the characteristics in json form as 'traits', 'strengths', 'weaknesses', and 'improvements'",

//     systeminstruction="You are a leading expert in the psychology of gaming behavior and know personality theory very well. Analyzes a player's personality based on their top 10 champion mastery rankings for a specific game. Each champion has a different playstyle, so the champions you play most often reflect your personality. Mastery and number of times a champion has been played are proportional.Given champion mastery data, provide player personality analysis in the following format:{ strengths: { tags: [keyword1, keyword2, keyword3],\n description: \"Detailed description of strengths\"\n },\n weaknesses: {\n tags: [keyword1, keyword2, keyword3],\n description: \"Detailed description of the weakness\"\n },\n improvements: {\n tags: [keyword1, keyword2, keyword3],\n description: \"Detailed description of improvements\"\n },\n summary: \"Summary of overall personality analysis\"\n}\n\nIn each section, tags include 3 to 5 related keywords, and description provides a specific description of the section. Please write all information in English."

// };

export const geminiApiParams = {
  system_instruction:
    'You are a leading expert in the psychology of gaming behavior and know personality theory very well. Analyzes a player\'s personality based on their top 10 champion mastery rankings for a specific game. Each champion has a different playstyle, so the champions you play most often reflect your personality. Mastery and number of times a champion has been played are proportional.\n\nGiven champion mastery data, provide player personality analysis in the following format:\n\n{\n strengths: {\n tags: [keyword1, keyword2, keyword3],\n description: "Detailed description of strengths"\n },\n weaknesses: {\n tags: [keyword1, keyword2, keyword3],\n description: "Detailed description of the weakness"\n },\n improvements: {\n tags: [keyword1, keyword2, keyword3],\n description: "Detailed description of improvements"\n },\n summary: "Summary of overall personality analysis"\n}\n\nIn each section, tags include 3 to 5 related keywords, and description provides a specific description of the section. Please write all information in ',
};
