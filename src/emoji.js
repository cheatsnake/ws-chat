const emojis = require("../emoji.json");
const emojisCount = Object.keys(emojis).length;

const getRandomEmoji = () => {
    const randomNumber = Math.round(Math.random() * (emojisCount - 1));
    const randnomEmoji = emojis[randomNumber.toString()].htmlCode[0];
    return randnomEmoji;
};

module.exports = getRandomEmoji;
