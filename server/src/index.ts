import fastifyStatic from "@fastify/static";
import fastifyWebsocket from "@fastify/websocket";
import fastify from "fastify";
import path from "path";
import url from 'url';
import { Board } from "../../src/index.js";

Board;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({ logger: true });

app.register(fastifyWebsocket);

// compiled path is server/dist/server/src/index.js... i know... it's fucked up
app.register(fastifyStatic, { root: path.join(__dirname, "../../../../app"), prefix: "/", index: "index.html" });

app.get("/ws", { websocket: true }, (conn, req) => {
    // const board = new Board();

    conn.socket.on("message", (message) => {
        conn.socket.send("hi");
    });
});

app.listen({ port: 3000 }).then((address) => {
    console.log("listening at " + address);
}).catch((e) => {
    console.log("error listening: " + e);

    process.exit(1);
});