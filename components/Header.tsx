interface HeaderProps {
  setDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
  setMode: (mode: "time" | "words") => void;
  difficulty: "easy" | "medium" | "hard";
  mode: "time" | "words";
  time: number;
  accuracy: number;
  wpm: number;
};

const Header = ({setDifficulty, setMode, difficulty, mode, time, accuracy, wpm}: HeaderProps) => {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-center px-4 pb-2 font-light text-[#fff5]">
      <ul className="flex justify-center gap-8">
        <li>
          WPM: <h4>{wpm}</h4>
        </li>
        |
        <li>
          Accuracy: <h4>{accuracy}%</h4>
        </li>
        |
        <li>
          Time: <h4>0:{time > 9 ? time : "0" + time}</h4>
        </li>
      </ul>
      <ul className="flex gap-8">
        <li className="flex gap-4 flex-col lg:flex-row">
          Difficulty:
          <button
            className={`px-2 border cursor-pointer text-white rounded-md ${difficulty === "easy" && "border-blue-500"}`}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className={`px-2 border cursor-pointer text-white rounded-md ${difficulty === "medium" && "border-blue-500"}`}
            onClick={() => setDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className={`px-2 border cursor-pointer text-white rounded-md ${difficulty === "hard" && "border-blue-500"}`}
            onClick={() => setDifficulty("hard")}
          >
            Hard
          </button>
        </li>
        |
        <li className="flex gap-4 flex-col lg:flex-row">
          Mode:
          <button
            className={`px-2 border cursor-pointer text-white rounded-md ${mode === "time" && "border-blue-500"}`}
            onClick={() => setMode("time")}
          >
            Time(60s)
          </button>
          <button
            className={`px-2 border cursor-pointer text-white rounded-md ${mode === "words" && "border-blue-500"}`}
            onClick={() => setMode("words")}
          >
            Words
          </button>
        </li>
      </ul>
    </header>

  );
};

export default Header;
