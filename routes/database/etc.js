const express = require("express");
const router = express.Router();
const connection = require("./dbSetup.js");

// get
router.post("/getEtcService", async (req, res) => {
  try {
    const [row, fields] = await connection.query(
      "SELECT * FROM services WHERE sunder=? ORDER BY id DESC LIMIT 0,9",
      [req.body.sunder]
    );

    res.send({ service: row });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
