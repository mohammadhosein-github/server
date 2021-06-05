require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();

server.use(
  cors({
    origin: "https://yummy-menu-app.herokuapp.com",
  })
);

//IMPORT ROUTES
const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth/index");
const YummyMenuRoute = require("./routes/yummyMenu/index");

const PORT = process.env.PORT || 8000;

//MIDDLEWARE
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//USE ROUTES
server.use("/", indexRoute);
server.use("/auth", authRoute);
server.use("/yummy-menu", YummyMenuRoute);

//DATABASE SETUP
const uri = process.env.DB_ADDRESS;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});
const db_connection = mongoose.connection;
db_connection.once("open", () => {
  console.log("\x1b[36m" + "connected to database..." + "\x1b[0m");
});

server.listen(PORT, () => {
  console.log("\x1b[33m" + `server is running on port ${PORT}...` + "\x1b[0m");
});
