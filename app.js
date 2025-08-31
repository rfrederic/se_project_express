const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: "64fa2f9e5f8c9a1234567890" };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
