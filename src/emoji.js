const emojis = require("../emoji.json");
const emojisCount = Object.keys(emojis).length;

const getRandomEmoji = () => {
    const randomNumber = Math.round(Math.random() * (emojisCount - 1));
    const radnomEmoji = emojis[randomNumber.toString()].htmlCode[0];
    return radnomEmoji;
};

module.exports = getRandomEmoji;
