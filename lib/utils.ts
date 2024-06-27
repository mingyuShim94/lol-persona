import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const fetchGameData = async (userData: any) => {
  console.log("fetchGameData userData: ", userData);
  try {
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    const response = await axios.get(`/api/riot?userData=${encodedUserData}`);

    return response.data;
  } catch (error) {
    console.error("Error occurred during API request:", error);
    return null;
  }
};

export const fetchGeminiData = async (data: string) => {
  console.log("챔피언 숙련도 데이터받음", data);
  try {
    const response = await axios.get(`/api/gemini`, {
      params: {
        data: JSON.stringify(data),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gemini API 요청 중 오류 발생:", error);
    return null;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
