'use client'

import { useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import VideoPlayer from './VideoPlayer'

const SyncedVideoPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const initSocket = async () => {
      await fetch('/api/socketio')
      const newSocket = io()
      setSocket(newSocket)

      newSocket.on('timeUpdate', (time: number) => {
        setCurrentTime(time)
      })

      return () => {
        newSocket.disconnect()
      }
    }

    initSocket()
  }, [])

  const handleTimeUpdate = (time: number) => {
    if (socket) {
      socket.emit('timeUpdate', time)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Synced Video Player</h1>
      <VideoPlayer
        src="video.mp4"
        currentTime={currentTime}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  )
}

export default SyncedVideoPage