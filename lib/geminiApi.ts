import axios from "axios";
import { geminiApiParams } from "./constant";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { getTranslations } from "next-intl/server";
import { cache } from "react";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const fetchGeminiData = cache(async (riotData: any) => {
  console.log("fetchGeminiData called", new Date().toISOString());
  //   console.log("riotData:", riotData);
  const t = await getTranslations("locale");
  // console.log("t:", t("language"));

  const systemPrompt = geminiApiParams.system_instruction + t("language") + ".";
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  try {
    const simplifiedInput = riotData.map((champion: any) => ({
      championName: champion.championName,
      championPoints: champion.championPoints,
    }));
    console.log("simplifiedInput:", simplifiedInput);

    const geminiInput = `${JSON.stringify(simplifiedInput, null, 2)}`;
    // console.log("geminiInput", geminiInput);
    const result = await chatSession.sendMessage(geminiInput);
    // console.log("geminiResult", result.response.text());
    return result.response.text();
  } catch (error: any) {
    console.error("Error parsing riotData:", error);
    if (error.response && error.response.status === 429) {
      console.error("Too many requests. Please try again later.");
    } else {
      console.error("An unknown error occurred:", error.message);
    }
    throw error;
  }
});
