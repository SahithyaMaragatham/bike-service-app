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
    },
    {
      sequelize,
      modelName: "Booking",
    },
  );

  return Booking;
};
