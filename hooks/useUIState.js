import { create } from "zustand";

const useUIState = create((set) => ({
  region: "EUW",
  setRegion: (region) => set({ region: region }),
}));

export default useUIState;
