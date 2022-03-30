const { randomUUID } = require("crypto");
const getRandomEmoji = require("./emoji");
const clients = new Map();

const startWebSocketServer = (wss) => {
    wss.on("connection", (ws) => {
        const clientId = randomUUID();
        const emoji = getRandomEmoji();

        ws.id = clientId;
        clients.set(clientId, { username: null, emoji: null });

        ws.on("message", (message) => {
            message = JSON.parse(message);
            message.emoji = emoji;

            broadcastMessage(message);

            if (message.event == "connect") {
                clients.set(clientId, { username: message.username, emoji });
            }
        });

        ws.on("close", () => {
            broadcastMessage({
                event: "disconnect",
                username: clients.get(clientId).username,
                date: null,
                body: null,
            });

            clients.delete(clientId);
        });
    });

    const broadcastMessage = (message) => {
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(message));
        });
    };
};

module.exports = startWebSocketServer;
