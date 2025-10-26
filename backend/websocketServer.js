const WebSocket = require("ws");

// Create WebSocket server on backend port (5000)
const wss = new WebSocket.Server({ port: 5000 });

wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:5000");
