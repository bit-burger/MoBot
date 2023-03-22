const {Events} = require("discord.js")

module.exports = {
    // Setting event name and kind
    name: Events.MessageCreate,
    once: false,

    // Handling event
    execute(message) {
        console.log("omfg")
        message.reply("deine mutter hahahahahhak")
    },
};
