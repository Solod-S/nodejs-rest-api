const app = require("./app");
const mongoose = require("mongoose");
const chalk = require("chalk");

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
