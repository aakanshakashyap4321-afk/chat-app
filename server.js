// server/server.js
const WebSocket = require("ws");
const PORT = 8080;

const wss = new WebSocket.Server({ port: PORT });
console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);

// Listen for client connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  // When a message is received from a client
  ws.on("message", (data) => {
    console.log(`Received: ${data}`);

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
