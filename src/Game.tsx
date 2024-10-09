import React, { useState, useEffect } from "react";
import Cat from "./components/Cat";
import { generateCats, playMeows, playBackgroundMusic, CatType } from "./utils";

const Game: React.FC = () => {
  const [cats, setCats] = useState<CatType[]>([]);
  const [level, setLevel] = useState(1);
  const [highestPitchIndex, setHighestPitchIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedCatIndex, setSelectedCatIndex] = useState<number | null>(null);

  useEffect(() => {
    startNewRound();
  }, [level]);

  useEffect(() => {
    const bgMusic = playBackgroundMusic();
    return () => {
      bgMusic.pause();
    };
  }, []);

  const startNewRound = async () => {
    setIsPlaying(true);
    setFeedback(null);
    setSelectedCatIndex(null);
    const newCats = generateCats(Math.min(level + 1, 10)); // 修改这里,上限改为10
    setCats(newCats);
    await playMeowsAndSetHighestPitch(newCats);
    setIsPlaying(false);
  };

  const playMeowsAndSetHighestPitch = async (catsToPlay: CatType[]) => {
    const index = await playMeows(catsToPlay);
    setHighestPitchIndex(index);
  };

  const handleCatClick = (index: number) => {
    if (isPlaying) return;

    setSelectedCatIndex(index);
    if (index === highestPitchIndex) {
      setFeedback("喵呜~回答正确");
      setTimeout(() => {
        setLevel((prev) => prev + 1);
      }, 1500);
    } else {
      setFeedback("呜呜呜呜呜再试试吧");
    }
  };

  const handleReplay = async () => {
    if (isPlaying || cats.length === 0) return;
    setIsPlaying(true);
    setFeedback(null);
    setSelectedCatIndex(null);
    await playMeowsAndSetHighestPitch(cats);
    setIsPlaying(false);
  };

  return (
    <div className="game-container">
      <h1>喵星人音调大比拼 - 第{level}关</h1>
      <div className="cats-container">
        {cats.map((cat, index) => (
          <Cat
            key={index}
            onClick={() => handleCatClick(index)}
            disabled={isPlaying}
            feedback={index === selectedCatIndex ? feedback : null}
            isCorrect={
              index === highestPitchIndex && index === selectedCatIndex
            }
          />
        ))}
      </div>
      {isPlaying && <p>请听喵声...</p>}
      <button onClick={handleReplay} disabled={isPlaying || cats.length === 0}>
        再次播放
      </button>
    </div>
  );
};

export default Game;
