"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: "userId" });
      Booking.belongsTo(models.Service, { foreignKey: "serviceId" });
    }
  }

  Booking.init(
    {
      date: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Services",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );

  return Booking;
};
