const WebSocket = require("ws");
const express = require("express");
const expressHbs = require("express-handlebars");
const { createServer } = require("http");
const { randomUUID } = require("crypto");
const getRandomEmoji = require("./emoji");

const PORT = 5000;
const app = express();
const clients = new Map();

const hbs = expressHbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("login");
});

app.post("/chat", (req, res) => {
    const { username } = req.body || `user${Date.now()}`;
    res.render("chat", { username, layout: "app" });
});

app.all("*", (req, res) => {
    res.redirect("/");
});

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

const wss = new WebSocket.Server({ server });

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

    ws.on("close", (message) => {
        broadcastMessage({
            event: "disconnect",
            username: clients.get(clientId).username,
            date: null,
            body: null,
        });

        clients.delete(clientId);
    });
});

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}
