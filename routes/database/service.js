const express = require("express");
const router = express.Router();
const connection = require("./dbSetup.js");

// get
router.post("/getService", async (req, res) => {
  try {
    if (req.body.searchWord === "") req.body.searchWord = "%%";
    if (req.body.sido === "전체") req.body.sido = "%%";
    if (req.body.gungu === "전체") req.body.gungu = "%%";

    const [lifeArrayList, gaguArrayList, intrsArrayList, sidoArrayList] =
      await Promise.all([
        getLifeArrayList(),
        getGaguArrayList(),
        getIntrsArrayList(),
        getSidoArrayList(),
      ]);

    let query0 = `SELECT COUNT(id) AS cnt
                    FROM services
                    WHERE
                        (servNm LIKE ? OR deptNm LIKE ? OR lifeArray LIKE ? 
                        OR gaguArray LIKE ? OR intrsArray LIKE ? OR trgContent LIKE ? 
                        OR selContent LIKE ? OR salContent LIKE ? OR sido LIKE ? 
                        OR gungu LIKE ? OR servDgst LIKE ? OR aplPrd LIKE ? 
                        OR proTyp LIKE ? OR aplWayNm LIKE ? OR aplWayContent LIKE ?)`;

    let query1 = `SELECT COUNT(id) AS cnt
                    FROM services
                    WHERE
                        (servNm LIKE ? OR deptNm LIKE ? OR lifeArray LIKE ? 
                        OR gaguArray LIKE ? OR intrsArray LIKE ? OR trgContent LIKE ? 
                        OR selContent LIKE ? OR salContent LIKE ? OR sido LIKE ? 
                        OR gungu LIKE ? OR servDgst LIKE ? OR aplPrd LIKE ? 
                        OR proTyp LIKE ? OR aplWayNm LIKE ? OR aplWayContent LIKE ?) AND sunder=0`;

    let query2 = `SELECT COUNT(id) AS cnt
                    FROM services
                    WHERE
                        (servNm LIKE ? OR deptNm LIKE ? OR lifeArray LIKE ? 
                        OR gaguArray LIKE ? OR intrsArray LIKE ? OR trgContent LIKE ? 
                        OR selContent LIKE ? OR salContent LIKE ? OR sido LIKE ? 
                        OR gungu LIKE ? OR servDgst LIKE ? OR aplPrd LIKE ? 
                        OR proTyp LIKE ? OR aplWayNm LIKE ? OR aplWayContent LIKE ?) AND sunder=1`;

    let query3 = `SELECT *
                    FROM services
                    WHERE
                        (servNm LIKE ? OR deptNm LIKE ? OR lifeArray LIKE ? 
                        OR gaguArray LIKE ? OR intrsArray LIKE ? OR trgContent LIKE ? 
                        OR selContent LIKE ? OR salContent LIKE ? OR sido LIKE ? 
                        OR gungu LIKE ? OR servDgst LIKE ? OR aplPrd LIKE ? 
                        OR proTyp LIKE ? OR aplWayNm LIKE ? OR aplWayContent LIKE ?) AND sunder=?`;

    let query1_1 = "";
    let query1_2 = "";
    let query1_3 = "";
    let query1_4 = "";
    let query1_4_1 = "";
    let query1_5 = "";

    if (req.body.sido === "%%") {
      query1_5 = "";
    } else if (req.body.sido != "%%" && req.body.gungu === "%%") {
      query1_5 = " AND (sido LIKE ?)";
    } else {
      query1_5 = " AND (sido LIKE ? AND gungu LIKE ?)";
    }

    if (req.body)
      req.body.lifeArray.length > 0
        ? req.body.age > 0
          ? (query1_4_1 = " OR ")
          : ""
        : req.body.age > 0
        ? (query1_4_1 = " AND (")
        : "";

    if (req.body.age >= 1 && req.body.age <= 5) {
      query1_4 = query1_4_1 + `lifeArray LIKE "%영유아%"`;
    } else if (req.body.age >= 6 && req.body.age <= 12) {
      query1_4 = query1_4_1 + `lifeArray LIKE "%아동%"`;
    } else if (req.body.age >= 13 && req.body.age <= 18) {
      query1_4 = query1_4_1 + `lifeArray LIKE "%청소년%"`;
    } else if (req.body.age >= 19 && req.body.age <= 29) {
      query1_4 = query1_4_1 + `lifeArray LIKE "%청년%"`;
    } else if (req.body.age >= 30 && req.body.age <= 64) {
      query1_4 = query1_4_1 + `lifeArray LIKE "%중장년%"`;
    } else if (req.body.age >= 65) {
      query1_4 = query1_4_1 + `lifeArray LIKE "%노년%"`;
    }

    req.body.lifeArray.length > 0
      ? req.body.age > 0
        ? ""
        : ""
      : req.body.age > 0
      ? (query1_4 = query1_4 + ")")
      : "";

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

    req.body.lifeArray.length > 0
      ? (query1_1 = " AND (" + query1_1 + query1_4 + ")")
      : (query1_1 = query1_4);
    req.body.gaguArray.length > 0 ? (query1_2 = " AND (" + query1_2 + ")") : "";
    req.body.intrsArray.length > 0
      ? (query1_3 = " AND (" + query1_3 + ")")
      : "";

    let query4 = " ORDER BY id DESC LIMIT ?, 9";

    const [row0, fields0] = await connection.query(
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

    const [row1, fields1] = await connection.query(
      query1 + query1_1 + query1_2 + query1_3,
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
      query2 + query1_1 + query1_2 + query1_3 + query1_5,
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
        req.body.sido,
        req.body.gungu,
      ]
    );

    let [row4, fields4] = [];

    if (req.body.sido === "%%" || req.body.sunder === 0) {
      [row4, fields4] = await connection.query(
        query3 + query1_1 + query1_2 + query1_3 + query4,
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
          req.body.sunder,
          req.body.start,
        ]
      );
    } else if (req.body.sido != "%%" && req.body.gungu === "%%") {
      [row4, fields4] = await connection.query(
        query3 + query1_1 + query1_2 + query1_3 + query1_5 + query4,
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
          req.body.sunder,
          req.body.sido,
          req.body.start,
        ]
      );
    } else {
      [row4, fields4] = await connection.query(
        query3 + query1_1 + query1_2 + query1_3 + query1_5 + query4,
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
          req.body.sunder,
          req.body.sido,
          req.body.gungu,
          req.body.start,
        ]
      );
    }

    res.send({
      total: row0[0].cnt,
      centralTotal: row1[0].cnt,
      localTotal: row2[0].cnt,
      lifeArrayList: lifeArrayList,
      gaguArrayList: gaguArrayList,
      intrsArrayList: intrsArrayList,
      sidoArrayList: sidoArrayList,
      serviceArray: row4,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/getGunguArrayList", async (req, res) => {
  try {
    const [row, fields] = await connection.query(
      `SELECT distinct sido, gungu 
          FROM services 
          where sido = ? AND gungu IS NOT null AND (gungu LIKE "%시" OR gungu LIKE "%군" OR gungu LIKE "%구") 
          ORDER BY gungu ASC`,
      [req.body.sido]
    );

    let gunguArrayList = ["전체"];
    row.map((data) => {
      gunguArrayList.push(data.gungu);
    });

    res.send({ gunguArrayList: gunguArrayList });
  } catch (err) {
    console.error(err);
  }
});

async function getLifeArrayList() {
  try {
    const [row, field] = await connection.query(
      `SELECT DISTINCT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(lifeArray, ",", numbers.n), "," , -1)) AS lifeArray
      FROM (
        SELECT 1 AS n UNION ALL 
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL 
        SELECT 4 UNION ALL
        SELECT 5) AS numbers
          INNER JOIN services
          ON CHAR_LENGTH(lifeArray) - CHAR_LENGTH(REPLACE(lifeArray, ",", "")) >= numbers.n - 1
      ORDER BY lifeArray ASC`
    );

    let lifeArrayList = [];
    row.map((data) => {
      lifeArrayList.push(data.lifeArray);
    });

    return lifeArrayList;
  } catch (err) {
    console.error(err);
  }
}

async function getGaguArrayList() {
  try {
    const [row, field] = await connection.query(
      `SELECT DISTINCT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(gaguArray, ",", numbers.n), "," , -1)) AS gaguArray
      FROM (
        SELECT 1 AS n UNION ALL 
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL 
        SELECT 4 UNION ALL
        SELECT 5) AS numbers
          INNER JOIN services
          ON CHAR_LENGTH(gaguArray) - CHAR_LENGTH(REPLACE(gaguArray, ",", "")) >= numbers.n - 1
      ORDER BY gaguArray ASC`
    );

    let gaguArrayList = [];
    row.map((data) => {
      gaguArrayList.push(data.gaguArray);
    });

    return gaguArrayList;
  } catch (err) {
    console.error(err);
  }
}

async function getIntrsArrayList() {
  try {
    const [row, field] = await connection.query(
      `SELECT DISTINCT TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(intrsArray, ",", numbers.n), "," , -1)) AS intrsArray
      FROM (
        SELECT 1 AS n UNION ALL 
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL 
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6 UNION ALL
        SELECT 7 UNION ALL
        SELECT 8 UNION ALL
        SELECT 9) AS numbers
          INNER JOIN services
          ON CHAR_LENGTH(intrsArray) - CHAR_LENGTH(REPLACE(intrsArray, ",", "")) >= numbers.n - 1
      ORDER BY intrsArray ASC`
    );

    let intrsArrayList = [];
    row.map((data) => {
      intrsArrayList.push(data.intrsArray);
    });

    return intrsArrayList;
  } catch (err) {
    console.error(err);
  }
}

async function getSidoArrayList() {
  try {
    const [row, field] = await connection.query(
      `SELECT DISTINCT sido 
      FROM services 
      WHERE sido IS NOT NULL 
      ORDER BY sido ASC`
    );

    let sidoArrayList = ["전체"];
    row.map((data) => {
      sidoArrayList.push(data.sido);
    });

    return sidoArrayList;
  } catch (err) {
    console.error(err);
  }
}

module.exports = router;
