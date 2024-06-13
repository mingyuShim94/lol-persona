import axios from "axios";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const fetchGameData = async (id: string) => {
  try {
    const response = await axios.get(`/api/riot?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
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
