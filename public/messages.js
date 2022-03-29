export const userMsg = (emoji, username, body) => `
<div class="message">
    <div class="message__emoji">${emoji}</div>
    <div class="message__author">${username}:</div>
    <div class="message__body">${body}</div>
</div>`;

export const connectMsg = (username) => `
<div class="message">
    <div class="message__connect">${username} connected to the server</div>
</div>`;

export const disconnectMsg = (username) => `
<div class="message">
    <div class="message__disconnect">${username} disconnected from the server</div>
</div>`;
