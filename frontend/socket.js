const socket = new WebSocket("ws://localhost:5000");

// When WebSocket connection is opened
socket.onopen = () => {
    console.log("Connected to WebSocket server");
    socket.send("Hello from frontend!"); // Send a message to backend
};

// When message is received from backend
socket.onmessage = (event) => {
    console.log("Message from server:", event.data);
};

// Handle WebSocket errors
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

// Handle WebSocket close event
socket.onclose = () => {
    console.log("WebSocket connection closed");
};

export default socket;
