const express = require("express");
const bouquet = require("./routes/bouquetFlower.router");
const userSeller = require("./routes/userSeller.router");
const authRoutes = require("./routes/user.router");

const app = express();

app.use(express.json());

app.use("/bouquet", bouquet);
app.use("/userseller", userSeller);
//jarol
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API BloomsAndBits",
  });
});

module.exports = app;
