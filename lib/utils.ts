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
