import { userMsg, connectMsg, disconnectMsg } from "./messages.js";
import { createMessage } from "./helpers.js";

document.addEventListener("DOMContentLoaded", () => {
    const username = document.querySelector(".username").innerHTML;
    const chatArea = document.querySelector(".chat__bar");
    const input = document.querySelector(".message_input");
    const sendButton = document.querySelector(".btn__send");
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = function () {
        ws.send(createMessage(username, "connect", null));
    };

    ws.onmessage = (response) => {
        const message = JSON.parse(response.data);

        switch (message.event) {
            case "connect":
                chatArea.insertAdjacentHTML(
                    "beforebegin",
                    connectMsg(message.username)
                );
                break;
            case "disconnect":
                chatArea.insertAdjacentHTML(
                    "beforebegin",
                    disconnectMsg(message.username)
                );
                break;
            default:
                chatArea.insertAdjacentHTML(
                    "beforebegin",
                    userMsg(message.emoji, message.username, message.body)
                );
                break;
        }
    };

    ws.onerror = () => {
        window.location.replace("http://localhost:5000");
    };

    sendButton.addEventListener("click", () => {
        if (!input.value) return;

        ws.send(createMessage(username, "message", input.value));
        input.value = "";
        sendButton.disabled = true;

        setTimeout(() => (sendButton.disabled = false), 3000);
    });
});
