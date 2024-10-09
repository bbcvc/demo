export interface CatType {
  pitch: number;
}

export const generateCats = (count: number): CatType[] => {
  return Array.from({ length: count }, () => ({
    pitch: Math.random() * 1000 + 500, // 生成500-1500Hz之间的音调
  }));
};

export const playMeow = (pitch: number): Promise<void> => {
  return new Promise((resolve) => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(pitch, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);

    setTimeout(() => {
      resolve();
    }, 600);
  });
};

export const playMeows = async (cats: CatType[]): Promise<number> => {
  let highestPitchIndex = 0;

  for (let i = 0; i < cats.length; i++) {
    await playMeow(cats[i].pitch);
    if (cats[i].pitch > cats[highestPitchIndex].pitch) {
      highestPitchIndex = i;
    }
  }

  return highestPitchIndex;
};

export const playBackgroundMusic = () => {
  const audio = new Audio("/background_music.mp3");
  audio.loop = true;
  audio.volume = 0.3; // 设置音量为30%
  audio.play().catch((error) => console.error("背景音乐播放失败:", error));
  return audio;
};
