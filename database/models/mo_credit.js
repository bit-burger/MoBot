// Importing classes
const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
    // Defining model
    return await sequelize.define(
        "mo_credit",
        {
            userID: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            credits: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            }
        },

        // Options
        {}
    );
};
