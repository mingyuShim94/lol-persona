import { sleep } from "@/lib/utils";
import Image from "next/image";

const page = async () => {
  // await sleep(2000);
  // throw new Error("my error");
  return (
    <div>
      <input
        type="text"
        placeholder="Summoner name + #KR1"
        className="p-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default page;
