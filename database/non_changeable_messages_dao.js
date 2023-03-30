function getNonChangeMessages(client) {
    return client.sequelize.models.non_changeable_messages
}

async function setNonChangeableMessage(client, messageID) {
    nonChangeMessages = getNonChangeMessages(client)
    await nonChangeMessages.findOrCreate({
        where: { messageID },
    });
}

async function isNonChangeableMessage(client, messageID) {
    nonChangeMessages = getNonChangeMessages(client)
    await nonChangeMessages.findOne({
        where: { messageID },
    });
}

async function setIsChangeableMessage(client, messageID) {
    nonChangeMessages = getNonChangeMessages(client)
    await nonChangeMessages.destroy({
        where: { messageID }
    })
}

module.exports = { setNonChangeableMessage, isNonChangeableMessage, isNonChangeableMessage }
