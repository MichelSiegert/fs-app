'use client';

import  { useRef } from 'react';


export default function SubwaySurferComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlay =true;
  const loop = true;
  const muted = true;
  const objectFit: string = 'contain';


  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-screen h-screen bg-black overflow-hidden group select-none"
    >
      <video
        ref={videoRef}
        src="surfer.mp4"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className={`w-full h-full cursor-pointer transition-all duration-300 ${
          objectFit === 'cover' ? 'object-cover' : 'object-contain'
        }`}
        playsInline
      />
    </div>
  );
}