// Importing classes
const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
    // Defining model
    return await sequelize.define(
        "non_changeable_messages",
        {
            messageID: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            authorID: {
                type: DataTypes.STRING,
            },

        },

        // Options
        {
            timestamps: false,
        }
    );
};
