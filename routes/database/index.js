const express = require("express");
const router = express.Router();

// semi router
const service = require("./service");
const etc = require("./etc");

router.use("/service", service);
router.use("/etc", etc);

module.exports = router;
