import fastifyStatic from "@fastify/static";
import fastifyWebsocket from "@fastify/websocket";
import { fork } from "child_process";
import "dotenv/config.js";
import fastify from "fastify";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const logger = { file: `logs/${Date.now()}.log` };
const logger = {
    level: "trace",
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: true,
            ignore: "pid,hostname,reqId,responseTime,req,res",
            messageFormat: "{msg} [{req.method} {req.url}]",
        },
    },
};

const app = fastify({ logger, disableRequestLogging: true });

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

        engineProcess.stderr!.on("data", (data) => app.log.error("error in worker: " + data))

        conn.socket.on("error", (error) => app.log.error("error in ws: " + error.message));

        engineProcess.on("error", (error) =>
            app.log.error("error in worker: " + error.message),
        );

        conn.socket.on("message", (message) => engineProcess.send(message));

        engineProcess.on("message", (message) => {
            const { data } = message as { data: number[] };

            const response = typeof message === "string" ? message : Buffer.from(data).toString("utf8");

            conn.socket.send(response);
        });

        conn.socket.on("close", (code) => {
            app.log.info("ws closed with code: " + code);

            engineProcess.kill();
        });

        engineProcess.on("close", (code) => {
            app.log.info("worker closed with code: " + code);

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
