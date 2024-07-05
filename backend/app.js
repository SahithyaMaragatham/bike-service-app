const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const { syncModels } = require("./models");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
