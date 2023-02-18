const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const chalk = require("chalk");

require("dotenv").config();

const app = express();
const contactsRouter = require("../routes/api/contacts");
const usersRouter = require("../routes/api/users");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

const { DB_HOST, PORT = 3000 } = process.env;
const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").white;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(successMsg("Database connection successful"));
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(successMsg(`Server running. Use our API on port: ${PORT}`));
    })
  )
  .catch((error) => {
    console.log(errorMsg(error));
    process.exit(1);
  });
