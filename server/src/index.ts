import fastifyStatic from "@fastify/static";
import fastifyWebsocket from "@fastify/websocket";
import { fork } from "child_process";
import "dotenv/config.js";
import fastify from "fastify";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({ logger: { file: `logs/${Date.now()}.log` } });

app.register(fastifyWebsocket);

// compiled path is server/dist/server/src/index.js... i know... it's fucked up
app.register(fastifyStatic, {
    root: path.join(__dirname, "../../../../app"),
    prefix: "/",
    index: "index.html",
});

app.register((app, _, done) => {
    app.get("/ws", { websocket: true }, (conn) => {
        const engineProcess = fork("/Users/tht/Documents/projects/chess/server/dist/server/src/worker.js", {
            silent: true,
        });

        conn.socket.on("error", (error) => app.log.error(error, "error in ws"));

        engineProcess.on("error", (error) => app.log.error(error, "error in worker"));

        conn.socket.on("message", (message) => engineProcess.send(message));

        engineProcess.on("message", (message) => {
            const { data } = message as { data: number[] };
            
            const response = typeof message === "string" ? message : Buffer.from(data).toString("utf8");
            
            conn.socket.send(response);
        });

        conn.socket.on("close", (code) => {
            app.log.info(code, "ws closed");

            engineProcess.kill();
        });

        engineProcess.on("close", (code) => {
            app.log.info(code, "worker closed");

            conn.socket.close();

            engineProcess.kill();
        });
    });

    done();
});

app.listen({ port: 3000 }).catch((e) => {
    console.log("error listening: " + e);

    process.exit(1);
});
