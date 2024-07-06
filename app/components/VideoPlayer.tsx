'use client'

import { useRef, useEffect } from 'react'

interface VideoPlayerProps {
  src: string
  currentTime: number
  onTimeUpdate: (time: number) => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, currentTime, onTimeUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime
    }
  }, [currentTime])

  return (
    <video
      ref={videoRef}
      className="w-full"
      controls
      onTimeUpdate={() => videoRef.current && onTimeUpdate(videoRef.current.currentTime)}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoPlayer