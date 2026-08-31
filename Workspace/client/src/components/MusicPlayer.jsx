"use client";
import React, { useEffect, useRef, useState } from "react";
import { styled, Typography, Slider, IconButton } from "@mui/material";

import {
  SkipPrevious,
  SkipNext,
  VolumeUp,
  VolumeOff,
} from "@mui/icons-material";

/* =========================================================
   TRACKS
========================================================= */

const tracks = [
  {
    title: "Rose Water",
    artist: "Massobeats",
    src: "/music/Rose_water.mp3"
  },
  {
    title: "A lonely Cherry tree",
    artist: "Pix",
    src: "/music/A_Lonely_Cherry_Tree.mp3"
  },
  {
    title: "Gameplay",
    artist: "Gameplay",
    src: "/music/Gameplay.mp3"
  },
  {
    title: "Coffe Time",
    artist: "Shushubobo",
    src: "/music/Coffee_Time.mp3"
  },
 
];

/* =========================================================
   MUSIC PLAYER
========================================================= */

const MusicPlayer = () => {
  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const track = tracks[currentTrack];

  /* =======================================================
     PLAY / PAUSE
  ======================================================= */

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  /* =======================================================
     NEXT
  ======================================================= */

  const nextTrack = () => {
    setCurrentTrack(
      (prev) => (prev + 1) % tracks.length
    );

    setCurrentTime(0);
  };

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const previousTrack = () => {
    setCurrentTrack(
      (prev) =>
        (prev - 1 + tracks.length) % tracks.length
    );

    setCurrentTime(0);
  };

  /* =======================================================
     TRACK CHANGE
  ======================================================= */

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load();

    setCurrentTime(0);

    if (isPlaying) {
      audioRef.current
        .play()
        .catch(() => {});
    }
  }, [currentTrack]);

  /* =======================================================
     AUDIO EVENTS
  ======================================================= */

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(
      audioRef.current.currentTime
    );
  };

  const handleEnded = () => {
    setCurrentTrack(
      (prev) => (prev + 1) % tracks.length
    );
  };

  /* =======================================================
     SEEK
  ======================================================= */

  const handleSeek = (_, value) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = value;

    setCurrentTime(value);
  };

  /* =======================================================
     VOLUME
  ======================================================= */

  const handleVolume = (_, value) => {
    if (!audioRef.current) return;

    audioRef.current.volume = value;

    setVolume(value);

    setIsMuted(value === 0);
  };

  /* =======================================================
     MUTE
  ======================================================= */

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      const newVolume = volume || 0.8;

      audioRef.current.volume = newVolume;

      setVolume(newVolume);
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;

      setIsMuted(true);
    }
  };

  /* =======================================================
     TIME FORMAT
  ======================================================= */

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <PlayerWrapper>

      {/* ===================================================
          AUDIO
      =================================================== */}

      <audio
        ref={audioRef}
        src={track.src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* ===================================================
          VINYL
      =================================================== */}

      <Turntable>

        <AmbientGlow />

        <Vinyl
          playing={isPlaying}
          onClick={togglePlay}
          role="button"
          tabIndex={0}
          aria-label={
            isPlaying
              ? "Pause music"
              : "Play music"
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              e.preventDefault();
              togglePlay();
            }
          }}
        >

          <VinylLabel
          >
            <VinylHole />
          </VinylLabel>

        </Vinyl>

        {/* =================================================
            TONE ARM
        ================================================= */}

        <ToneArm playing={isPlaying}>

          <ToneArmBase />

          <Needle />

        </ToneArm>

        {/* CLICK HINT */}

        {!isPlaying && (
          <ClickHint>
            CLICK VINYL
          </ClickHint>
        )}

      </Turntable>

      {/* ===================================================
          INFO + CONTROLS
      =================================================== */}

      <PlayerBottom>

        {/* =================================================
            TRACK INFORMATION
        ================================================= */}

        <TrackInfo>

          <TinyText>
            NOW PLAYING ·{" "}
            {String(currentTrack + 1).padStart(
              2,
              "0"
            )}{" "}
            /{" "}
            {String(tracks.length).padStart(
              2,
              "0"
            )}
          </TinyText>

          <TrackTitle>
            {track.title}
          </TrackTitle>

          <TrackArtist>
            {track.artist}
          </TrackArtist>

        </TrackInfo>

        {/* =================================================
            PLAYER CONTROLS
        ================================================= */}

        <Controls>

          {/* PREVIOUS */}

          <IconButton
            onClick={previousTrack}
            size="small"
            aria-label="Previous track"
          >
            <SkipPrevious />
          </IconButton>

          {/* NEXT */}

          <IconButton
            onClick={nextTrack}
            size="small"
            aria-label="Next track"
          >
            <SkipNext />
          </IconButton>

          {/* VOLUME */}

          <VolumeButton
            onClick={toggleMute}
            size="small"
            aria-label={
              isMuted
                ? "Unmute"
                : "Mute"
            }
          >
            {isMuted ? (
              <VolumeOff />
            ) : (
              <VolumeUp />
            )}
          </VolumeButton>

          <VolumeSlider
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
          />

        </Controls>

      </PlayerBottom>

      {/* ===================================================
          PROGRESS
      =================================================== */}

      <ProgressRow>

        <Time>
          {formatTime(currentTime)}
        </Time>

        <ProgressSlider
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
        />

        <Time>
          {formatTime(duration)}
        </Time>

      </ProgressRow>

    </PlayerWrapper>
  );
};

export default MusicPlayer;

/* =========================================================
   PLAYER
========================================================= */

const PlayerWrapper = styled("div")({

  maxWidth:
    "calc(100vw - 24px)",

  padding: "16px",

  margin: "auto",

  position: "relative",

  borderRadius:
    "20px 20px 8px 8px",

  background:
    "linear-gradient(145deg, #343438, #1d1d20)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.4)",

  color: "#fff",

  overflow: "hidden",

  "@media (max-width: 480px)": {

    width: "calc(100vw - 24px)",

    padding: "12px",

    borderRadius: "16px",

  },

});


/* =========================================================
   TURNTABLE
========================================================= */

const Turntable = styled("div")({

  height: "165px",

  position: "relative",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  overflow: "hidden",

  borderRadius: "12px",

  background:
    "linear-gradient(145deg, #29292d, #18181b)",

  "@media (max-width: 480px)": {

    height: "145px",

  },

});


/* =========================================================
   GLOW
========================================================= */

const AmbientGlow = styled("div")({

  position: "absolute",

  width: "150px",

  height: "150px",

  borderRadius: "50%",

  background:
    "rgba(255,255,255,0.035)",

  filter: "blur(25px)",

});


/* =========================================================
   VINYL
========================================================= */

const Vinyl = styled("div")(({ playing }) => ({

  width: "145px",

  height: "145px",

  borderRadius: "50%",

  position: "relative",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  cursor: "pointer",

  background: `
    radial-gradient(
      circle,
      rgba(255,255,255,0.06) 1px,
      transparent 1px
    ),
    repeating-radial-gradient(
      circle,
      #111 0px,
      #111 2px,
      #1a1a1a 3px,
      #0b0b0b 5px
    )
  `,

  boxShadow:
    "0 12px 30px rgba(0,0,0,0.6)",

  animation: playing
    ? "vinylSpin 3.2s linear infinite"
    : "none",

  transition:
    "transform 200ms ease, box-shadow 200ms ease",

  "&:hover": {

    boxShadow:
      "0 15px 35px rgba(0,0,0,0.75)",

  },

  "&:focus-visible": {

    outline:
      "2px solid rgba(255,255,255,0.7)",

    outlineOffset: "5px",

  },

  "@keyframes vinylSpin": {

    from: {
      transform:
        "rotate(0deg)",
    },

    to: {
      transform:
        "rotate(360deg)",
    },

  },

  "@media (max-width: 480px)": {

    width: "120px",

    height: "120px",

  },

}));


/* =========================================================
   LABEL
========================================================= */

const VinylLabel = styled("div")({

  width: "52px",

  height: "52px",

  borderRadius: "50%",

  backgroundSize: "cover",

  backgroundPosition: "center",

  position: "relative",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  boxShadow:
    "inset 0 0 8px rgba(0,0,0,0.5)",

  "@media (max-width: 480px)": {

    width: "44px",

    height: "44px",

  },

});


/* =========================================================
   VINYL HOLE
========================================================= */

const VinylHole = styled("div")({

  width: "6px",

  height: "6px",

  borderRadius: "50%",

  background: "#111",

  border:
    "2px solid rgba(255,255,255,0.3)",

});


/* =========================================================
   TONE ARM
========================================================= */

const ToneArm = styled("div")(({ playing }) => ({

  position: "absolute",

  width: "85px",

  height: "5px",

  right: "50px",

  top: "32px",

  background:
    "linear-gradient(90deg, #999, #ddd)",

  borderRadius: "10px",

  transformOrigin:
    "right center",

  transform: playing
    ? "rotate(0deg)"
    : "rotate(42deg)",

  transition:
    "transform 650ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",

  zIndex: 5,

  boxShadow:
    "0 3px 8px rgba(0,0,0,0.4)",

  "@media (max-width: 480px)": {

    width: "70px",

    right: "75px",

    top: "28px",

  },

}));


/* =========================================================
   ARM BASE
========================================================= */

const ToneArmBase = styled("div")({

  position: "absolute",

  right: "-5px",

  top: "-7px",

  width: "19px",

  height: "19px",

  borderRadius: "50%",

  background:
    "linear-gradient(145deg, #aaa, #555)",

});


/* =========================================================
   NEEDLE
========================================================= */

const Needle = styled("div")({

  position: "absolute",

  left: "0",

  bottom: "-4px",

  width: "11px",

  height: "9px",

  background: "#bbb",

  clipPath:
    "polygon(0 0, 100% 0, 70% 100%, 30% 100%)",

});


/* =========================================================
   CLICK HINT
========================================================= */

const ClickHint = styled("div")({

  position: "absolute",

  bottom: "10px",

  left: "50%",

  transform:
    "translateX(-50%)",

  fontSize: "8px",

  letterSpacing:
    "0.18em",

  opacity: 0.25,

  pointerEvents: "none",

});


/* =========================================================
   BOTTOM
========================================================= */

const PlayerBottom = styled("div")({

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  gap: "12px",

  marginTop: "12px",

  "@media (max-width: 480px)": {

    gap: "8px",

  },

});


/* =========================================================
   TRACK INFO
========================================================= */

const TrackInfo = styled("div")({

  minWidth: 0,

  flex: 1,

});


const TinyText = styled(Typography)({

  fontSize: "0.58rem",

  letterSpacing:
    "0.1em",

  opacity: 0.4,

  fontWeight: 600,

  whiteSpace: "nowrap",

});


const TrackTitle = styled(Typography)({

  marginTop: "3px",

  fontSize: "0.9rem",

  fontWeight: 700,

  whiteSpace: "nowrap",

  overflow: "hidden",

  textOverflow: "ellipsis",

});


const TrackArtist = styled(Typography)({

  marginTop: "1px",

  fontSize: "0.7rem",

  opacity: 0.45,

  whiteSpace: "nowrap",

  overflow: "hidden",

  textOverflow: "ellipsis",

});


/* =========================================================
   CONTROLS
========================================================= */

const Controls = styled("div")({

  display: "flex",

  alignItems: "center",

  gap: "0px",

  flexShrink: 0,

});


const VolumeButton = styled(IconButton)({

  marginLeft: "3px",

});


/* =========================================================
   VOLUME
========================================================= */

const VolumeSlider = styled(Slider)({

  width: "55px",

  color: "#aaa",

  height: "3px",

  "& .MuiSlider-thumb": {

    width: "7px",

    height: "7px",

  },

  "@media (max-width: 480px)": {

    display: "none",

  },

});


/* =========================================================
   PROGRESS
========================================================= */

const ProgressRow = styled("div")({

  display: "flex",

  alignItems: "center",

  gap: "7px",

  marginTop: "6px",

});


const Time = styled("span")({

  fontSize: "8px",

  opacity: 0.35,

  fontFamily: "monospace",

  minWidth: "27px",

});


const ProgressSlider = styled(Slider)({

  flex: 1,

  color: "#fff",

  height: "3px",

  "& .MuiSlider-thumb": {

    width: "8px",

    height: "8px",

  },

});