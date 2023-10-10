const schedule = require("node-schedule");
const connection = require("../database/dbSetup");
const apiConf = require("../../key/api/apiInfo.json");
const axios = require("axios");
const converter = require("xml-js");

const getDataFromApi = async (url) => {
  try {
    const response = await axios.get(url);
    const xmlJson = converter.xml2json(response.data);
    // 데이터 가공 및 처리 로직

    let array = [];
    let obj = new Object();

    JSON.parse(xmlJson).elements[0].elements.forEach(async (firstData, j) => {
      if (
        firstData.name == "servId" ||
        firstData.name == "servNm" ||
        firstData.name == "servDgst"
      ) {
        obj[firstData.name] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "lifeNmArray") {
        obj["lifeArray"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "bizChrDeptNm") {
        obj["DeptNm"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "ctpvNm") {
        obj["sido"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "sggNm") {
        obj["gungu"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "trgterIndvdlNmArray") {
        obj["gaguArray"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "intrsThemaNmArray") {
        obj["intrsArray"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "sprtCycNm") {
        obj["aplPrd"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "srvPvsnNm") {
        obj["proTyp"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "aplyMtdNm") {
        obj["aplWayNm"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "sprtTrgtCn") {
        obj["trgContent"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "slctCritCn") {
        obj["selContent"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "alwServCn") {
        if (
          JSON.parse(obj.servId) !== "WLF00003133" &&
          JSON.parse(obj.servId) !== "WLF00004842"
        ) {
          obj["salContent"] = JSON.stringify(firstData.elements[0].text.trim());
        }
      }
      if (firstData.name == "aplyMtdCn") {
        obj["aplWayContent"] = JSON.stringify(
          firstData.elements[0].text.trim()
        );
      }
      obj["sunder"] = 1;
      if (
        firstData.name == "inqplCtadrList" ||
        firstData.name == "inqplHmpgReldList"
      ) {
        let obj2 = new Object();
        obj2["servId"] = obj.servId;
        firstData.elements.forEach(async (secondData, k) => {
          if (secondData.name == "wlfareInfoDtlCd") {
            obj2["servSeCode"] = JSON.stringify(
              secondData.elements[0].text.trim()
            );
          }
          if (secondData.name == "wlfareInfoReldNm") {
            obj2["servSeDetailNm"] = JSON.stringify(
              secondData.elements[0].text.trim()
            );
          }
          if (secondData.name == "wlfareInfoReldCn") {
            if (JSON.parse(obj.servId) !== "WLF00005101") {
              obj2["servSeDetailContent"] = JSON.stringify(
                secondData.elements[0].text.trim()
              );
            }
          }
        });
        array.push(obj2);
      }
    });
    array.unshift(obj);
    console.log(obj.servId);
    // console.log(array);
    return array;
  } catch (err) {
    console.error(err);
    throw err; // 에러를 상위 호출자로 전파
  }
};

const processData = async (jsonElements) => {
  for (let i = 0; i <= jsonElements.length - 1; i++) {
    for (const [key, value] of Object.entries(jsonElements[i])) {
      if (key === "servId") {
        console.log(value);
        const apiUrl = `https://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfaredetailed?serviceKey=${apiConf.key}&servId=${value}`;
        const processedData = await getDataFromApi(apiUrl);
        processedData.forEach(async (pushData, j) => {
          const servKeys = Object.keys(pushData).join(",");
          const servValues = Object.values(pushData).join(",");
          await connection.query(
            `INSERT INTO ${j == 0 ? "services" : "inquiries"} (${servKeys})
              VALUES(${servValues});`
          );
        });
      }
    }
  }
};

const job1 = schedule.scheduleJob("00 05 * * * *", async () => {
  try {
    const apiUrl = `https://apis.data.go.kr/B554287/LocalGovernmentWelfareInformations/LcgvWelfarelist?serviceKey=${apiConf.key}&pageNo=1&numOfRows=4500`;
    const response = await axios.get(apiUrl);
    await processData(response.data.servList);
    console.log("Local Input Success");
  } catch (err) {
    console.error(err);
  }
});

const localServiceScheduler = { job1: job1 };

module.exports = localServiceScheduler;
