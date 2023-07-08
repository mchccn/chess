export const ws = new WebSocket("ws://localhost:3000/ws");

ws.addEventListener("error", console.error);

ws.addEventListener("open", () => {
    console.log("helo")
});

ws.addEventListener("message", (data) => {
    console.log("received: %s", data);
});
