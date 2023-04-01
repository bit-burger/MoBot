const { Events } = require("discord.js")
const fs = require("node:fs")
const dao = require("../../database/mo_credit_dao")

module.exports = {
    // Setting event name and kind
    name: Events.GuildAuditLogEntryCreate,
    once: false,

    // Handling event
    async execute(entry, guild) {
        console.log(entry)
    },
};
