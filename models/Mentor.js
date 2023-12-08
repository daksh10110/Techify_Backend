const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
const { v4: uuidv4 } = require('uuid');

class Mentor extends Model {}

Mentor.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "Mentor",
    },
);

module.exports = Mentor;