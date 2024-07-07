import { NextResponse } from 'next/server';
import { WebSocketServer } from 'ws';

let wss: WebSocketServer;

export const runtime = 'nodejs';

export function GET() {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === 'timeUpdate') {
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'timeUpdate', time: data.time }));
            }
          });
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }

  return NextResponse.json({ message: 'WebSocket server initialized' });
}