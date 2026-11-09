'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEOS = ['surfer.mp4', 'parkour.mp4'];
const END_BUFFER_SECONDS = 30;

const pickRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export default function BrainrotComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrc(pickRandom(VIDEOS));
  }, []);

  const seekToRandomStart = () => {
    const video = videoRef.current;
    if (!video) return;

    const maxStart = video.duration - END_BUFFER_SECONDS;
    video.currentTime = maxStart > 0 ? Math.random() * maxStart : 0;
    video.play().catch(() => {});
  };

  const handleEnded = () => {
    const next = pickRandom(VIDEOS);
    if (next === src) {
      seekToRandomStart();
    } else {
      setSrc(next); 
    }
  };

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-black overflow-hidden group select-none">
      {src && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={seekToRandomStart}
          onEnded={handleEnded}
          className="w-full h-full cursor-pointer object-contain"
        />
      )}
    </div>
  );
}