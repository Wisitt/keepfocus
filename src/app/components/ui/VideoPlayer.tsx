// components/VideoPlayer.tsx

import React from 'react';

interface VideoPlayerProps {
  src: string;
  width: number;
  height: number;
  onClick?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, width, height, onClick }) => {
  return (
    <video  width={width} height={height} onClick={onClick} autoPlay loop muted >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
