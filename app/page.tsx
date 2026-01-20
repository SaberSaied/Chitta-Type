"use client";

import { useEffect, useState } from "react";
import data from "../data.json";
import { Header, Restart, StartPage } from "@/components";



function HomePage() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  const dataText = data[difficulty];
  const [randomText, setRandomText] = useState<string[]>(dataText[Math.floor(Math.random() * dataText.length)].text.split(''));
  const [mode, setMode] = useState<"time" | "words">("time");
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState([{
      index: 0,
      item: '',
      isCorrect: true,
    }]
  );
  const [restart, setRestart] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWPM] = useState(0);


  const handleText = () => {
    const newText = data[difficulty];
    setRandomText(newText[Math.floor(Math.random() * newText.length)].text.split(''));
    setCurrentIndex(0);
  }

  // Difficulty Change Effect
  useEffect(() => {
    if (mode === "time") setTime(60);
    if (mode === "words") setTime(0);
    handleText();
    setStats([ 
      {
        index: 0,
        item: '',
        isCorrect: true,
      }
    ]);
    setWPM(0);
    setAccuracy(0);
  }, [difficulty, restart, mode]);

  // Accuracy
  useEffect(() => {
    if (isStart === false) return;
    setAccuracy(() => {
      const correctChars = stats.filter(stat => stat.isCorrect).length;
      const totalChars = stats.length;
      return totalChars === 0 ? 0 : Math.round((correctChars / totalChars) * 100);
    });
  }, [stats, isStart]);

  // WPM
  useEffect(() => {
    if (isStart === false) return;
    setWPM(() => {
      const minutes = (60 - time) / 60;
      const wordsTyped = stats.filter(stat => stat.isCorrect).length / 5;
      return minutes === 0 ? 0 : Math.round(wordsTyped / minutes);
    });
  }, [isStart, stats]);

  // Timer For Time
  useEffect(() => {
    if (mode === "time" && isStart === true) {
      const interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        if (currentIndex >= randomText.length) {
          handleText();
        }
        if (time === 0) clearInterval(interval);
      }, 1000);
    }
  }, [mode, isStart]);



    

  // console.log(currentIndex, randomText.length, stats.length);

  // Timer For Words
  // useEffect(() => {
  //   if (mode === "words" && isStart === true) {
  //     const interval = setInterval(() => {
  //       setTime((prevTime) => (prevTime + 1));
  //       // if (end === true) clearInterval(interval);
  //     }, 1000);
  //   }
  // }, [mode, isStart]);

  // console.log(end && "good");

  // Correct Or Incorrect Text Fn
  useEffect(() => {
    if (isStart === false) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Backspace" && e.key.length !== 1) return;
      setCurrentIndex((prevIndex) => {
        if ((time === 0 && mode === "time") || (prevIndex === randomText.length && mode === "words")) {
          return prevIndex
        };
        if(prevIndex === randomText.length - 1 && time > 0 && mode === "time") {
          handleText();
          setStats([
              {
                index: 0,
                item: '',
                isCorrect: true,
              },
            ...stats]);
          return 0;
        }
        if (prevIndex <= 0) setStats((prev) => prev.slice(0, -1));
        if (e.key === "Backspace" && prevIndex > 0) {
          prevIndex--;
          return prevIndex;
        }
        const expected = randomText[prevIndex];
        const typed = e.key;
        setStats(prev => [
          ...prev,
          {
            index: prevIndex,
            item: expected,
            isCorrect: typed === expected
          }
        ]);
        return prevIndex + 1;
      });
    }
    addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  }, [isStart, randomText, stats]);


  // Show Text
  const ShowText = () => {
    return randomText.map((char, index) => (
      <span
        key={index}
        className={`
          ${index === currentIndex && isStart ? "underline" : ""}
          ${
            index < currentIndex
              ? stats.findLast(stat => stat.index === index)?.isCorrect
                ? "text-green-500"
                : "text-red-500 underline"
              : "text-white"
          }
        `}
      >
        {char}
      </span>
    ));
  }

  return (
    <div className="p-8 mx-auto">

      {/* Typing Speed Test Header */}
      <Header setDifficulty={setDifficulty} setMode={setMode} difficulty={difficulty} mode={mode} time={time} accuracy={accuracy} wpm={wpm} />

      <div className="border-[#fff5] border-t w-full mb-4" />

      {/* Typing Speed Test Board */}
      <section className="w-full h-full min-h-48 flex justify-center bg-[#ffffff0a] rounded-md relative overflow-hidden">
        {isStart === false && <StartPage setIsStart={setIsStart} />}
        <div className="text-2xl font-bold px-8 py-4">
          <ShowText />
        </div>
      </section>

      <div className="border-[#fff5] border-t w-full my-4" />
      {/* Typing Speed Test Restart Button */}
      {isStart && <Restart setRestart={setRestart} />}
    </div>
  );
}

export default HomePage;
