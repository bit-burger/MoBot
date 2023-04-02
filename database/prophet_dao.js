const { Op } = require("sequelize")

function getProphet(client) {
    return client.sequelize.models.prophet
}

async function isProphet(client, userID) {
    prophet = getProphet(client)
    const user = await prophet.findOne({
        where: { userID },
    })
    return user !== null
}

async function setProphet(client, userID) {
    prophet = getProphet(client)
    await prophet.findOrCreate({
        where: { userID },
    });
}

module.exports = { isProphet, setProphet }
