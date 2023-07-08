export const ws = new WebSocket("ws://localhost:3000/ws");

ws.addEventListener("error", console.error);
