import { Server as HTTPServer } from 'http'
import { NextApiResponse } from 'next'
import { Socket as NetSocket } from 'net'
import { Server as SocketIOServer } from 'socket.io'

export interface SocketServer extends HTTPServer {
  io?: SocketIOServer | undefined
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: SocketWithIO
}