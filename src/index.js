require("dotenv").config();
const { createServer } = require("http");
const app = require("./http-server");
const WebSocket = require("ws");
const startWebSocketServer = require("./ws-server");

const PORT = process.env.PORT || 5000;
const server = createServer(app);

const main = () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });

        const wss = new WebSocket.Server({ server });
        startWebSocketServer(wss);
    } catch (error) {
        console.log(error);
    }
};

main();
