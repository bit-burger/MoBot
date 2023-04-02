// Importing classes
const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
    // Defining model
    return await sequelize.define(
        "prophet",
        {
            userID: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
        },

        // Options
        {
            timestamps: false,
        }
    );
};
