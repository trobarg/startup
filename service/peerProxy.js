const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  function broadcastCount() {
    const msg = JSON.stringify({ type: 'count', count: wss.clients.size });
    wss.clients.forEach((c) => {
      if (c.readyState === 1) c.send(msg);
    });
  }

  wss.on('connection', (ws) => {
    broadcastCount();
    ws.on('close', () => broadcastCount());
    ws.on('error', () => {});
  });

  return wss;
}

module.exports = { peerProxy };
