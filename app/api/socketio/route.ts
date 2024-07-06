import { Server as SocketIOServer } from 'socket.io';
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
  io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiRequest {
  socket: SocketWithIO;
}

export const runtime = 'edge';

export function GET(req: NextApiResponseWithSocket) {
  if (req.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new SocketIOServer(req.socket.server as any);
    req.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('A client connected');
      socket.on('timeUpdate', (time: number) => {
        socket.broadcast.emit('timeUpdate', time);
      });
    });
  }

  return NextResponse.json({ message: 'Socket initialized' }, { status: 200 });
}