const express = require("express");
const router = express.Router();
const connection = require("./dbSetup.js");

// get
router.post("/getService", async (req, res) => {
  try {
    if (req.body.searchWord === "") req.body.searchWord = "%%";

    let query0 = `SELECT COUNT(id) AS cnt
                    FROM services
                    WHERE
                        (servNm LIKE ? OR deptNm LIKE ? OR lifeArray LIKE ? 
                        OR gaguArray LIKE ? OR intrsArray LIKE ? OR trgContent LIKE ? 
                        OR selContent LIKE ? OR salContent LIKE ? OR sido LIKE ? 
                        OR gungu LIKE ? OR servDgst LIKE ? OR aplPrd LIKE ? 
                        OR proTyp LIKE ? OR aplWayNm LIKE ? OR aplWayContent LIKE ?)`;

    let query1 = `SELECT *
                    FROM services
                    WHERE
                        (servNm LIKE ? OR deptNm LIKE ? OR lifeArray LIKE ? 
                        OR gaguArray LIKE ? OR intrsArray LIKE ? OR trgContent LIKE ? 
                        OR selContent LIKE ? OR salContent LIKE ? OR sido LIKE ? 
                        OR gungu LIKE ? OR servDgst LIKE ? OR aplPrd LIKE ? 
                        OR proTyp LIKE ? OR aplWayNm LIKE ? OR aplWayContent LIKE ?)`;

    let query1_1 = "";
    let query1_2 = "";
    let query1_3 = "";

    req.body.lifeArray.forEach((element) => {
      query1_1 = query1_1 + "lifeArray LIKE " + '"%' + element + '%"' + " OR ";
    });
    query1_1 = query1_1.substring(0, query1_1.length - 4);

    req.body.gaguArray.forEach((element) => {
      query1_2 = query1_2 + "gaguArray LIKE " + '"%' + element + '%"' + " OR ";
    });
    query1_2 = query1_2.substring(0, query1_2.length - 4);

    req.body.intrsArray.forEach((element) => {
      query1_3 = query1_3 + "intrsArray LIKE " + '"%' + element + '%"' + " OR ";
    });
    query1_3 = query1_3.substring(0, query1_3.length - 4);

    req.body.lifeArray.length > 0 ? (query1_1 = " AND (" + query1_1 + ")") : "";
    req.body.gaguArray.length > 0 ? (query1_2 = " AND (" + query1_2 + ")") : "";
    req.body.intrsArray.length > 0
      ? (query1_3 = " AND (" + query1_3 + ")")
      : "";

    let query2 = " ORDER BY id DESC LIMIT ?, 9";

    const [row1, fields1] = await connection.query(
      query0 + query1_1 + query1_2 + query1_3,
      [
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
      ]
    );

    const [row2, fields2] = await connection.query(
      query1 + query1_1 + query1_2 + query1_3 + query2,
      [
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.searchWord,
        req.body.start,
      ]
    );

    res.send({ total: row1[0].cnt, serviceArray: row2 });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
