const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const auth = require("./middleware/auth");
const authorize = require("./middleware/authorize");

const bouquet = require("./routes/bouquetFlower.router");
const userSeller = require("./routes/userSeller.router");
const authRoutes = require("./routes/user.router");
const shopCart = require("./routes/shoppingCart.routes");
const order = require("./routes/order.router");
const googleRoutes = require("./routes/google.router");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/bouquet", bouquet);
app.use("/userseller", userSeller);
app.use("/auth", authRoutes);
app.use("/cart", auth, authorize("buyer"), shopCart);
app.use("/order", order);
app.use("/api", googleRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API BloomsAndBits",
  });
});

module.exports = app;
