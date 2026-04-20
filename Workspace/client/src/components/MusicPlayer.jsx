"use client";

import React, { useEffect, useRef, useState } from "react";

const songs = [
  {
    id: 1,
    title: "Sample Song 1",
    artist: "Artist 1",
    url: "/songs/Minecraft.mp3",
  },
  {
    id: 2,
    title: "Sample Song 2",
    artist: "Artist 2",
    url: "/songs/Myeyes.mp3",
  },
];

export default function MusicPlayer() {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = songs[currentIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const next = (currentIndex + 1) % songs.length;
    setCurrentIndex(next);
  };

  const prevSong = () => {
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prev);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div className="h-full flex flex-col justify-between p-4 bg-zinc-800 rounded-xl text-white">
      {/* Song Info */}
      <div>
        <h3 className="text-sm font-semibold">{currentSong.title}</h3>
        <p className="text-xs text-zinc-400">{currentSong.artist}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button onClick={prevSong}>⏮</button>

        <button
          onClick={togglePlay}
          className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button onClick={nextSong}>⏭</button>
      </div>

      {/* Audio */}
      <audio ref={audioRef} src={currentSong.url} onEnded={nextSong} />
    </div>
  );
}
