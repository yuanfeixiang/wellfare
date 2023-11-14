const express = require("express");
const router = express.Router();

// semi router
const service = require("./service");

router.use("/service", service);

module.exports = router;
