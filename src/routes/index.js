const express = require("express");
const router = express.Router();
function router(app) {
  app.use("/courses");
  app.use("/me");
}
module.exports = { router };
