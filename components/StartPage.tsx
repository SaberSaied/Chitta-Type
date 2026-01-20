import React from "react";

const StartPage = ({setIsStart}: {setIsStart: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div
      className="absolute flex flex-col justify-center items-center gap-4 backdrop-blur-sm w-full h-48 rounded-md"
      onClick={() => setIsStart(true)}
    >
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white font-medium cursor-pointer">
        Start Typing Test
      </button>
      <p className="text-sm text-center px-4">
        Or Click The Text and Start Typing
      </p>
    </div>
);
};

export default StartPage;
