const schedule = require("node-schedule");
const connection = require("../database/dbSetup");
const apiConf = require("../../key/api/apiInfo.json");
const axios = require("axios");
const converter = require("xml-js");

// 24시간 마다 api호출 후 DB값 수정
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
        firstData.name == "lifeArray"
      ) {
        obj[firstData.name] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "jurMnofNm") {
        obj["DeptNm"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "trgterIndvdlArray") {
        obj["gaguArray"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "tgtrDtlCn") {
        obj["trgContent"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "slctCritCn") {
        obj["selContent"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      if (firstData.name == "alwServCn") {
        obj["salContent"] = JSON.stringify(firstData.elements[0].text.trim());
      }
      obj["sunder"] = 0;
      if (
        firstData.name == "inqplCtadrList" ||
        firstData.name == "inqplHmpgReldList"
      ) {
        let obj2 = new Object();
        obj2["servId"] = obj.servId;
        firstData.elements.forEach(async (secondData, k) => {
          if (secondData.name == "servSeDetailLink") {
            obj2["servSeDetailContent"] = JSON.stringify(
              secondData.elements[0].text.trim()
            );
          } else {
            obj2[secondData.name] = JSON.stringify(
              secondData.elements[0].text.trim()
            );
          }
        });
        array.push(obj2);
      }
    });
    array.unshift(obj);
    return array;
  } catch (err) {
    console.error(err);
    throw err; // 에러를 상위 호출자로 전파
  }
};

const processData = async (jsonElements) => {
  for (let i = 5; i <= jsonElements.length - 1; i++) {
    jsonElements[i].elements.forEach(async (data, j) => {
      if (data.name === "servId") {
        const apiUrl = `https://www.bokjiro.go.kr/ssis-tbu/NationalWelfareInformations/NationalWelfaredetailed.do?serviceKey=${
          apiConf.key
        }&callTp=D&servId=${data.elements[0].text.trim()}&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`;
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
    });
  }
};

const job1 = schedule.scheduleJob("00 04 * * * *", async () => {
  try {
    const apiUrl = `https://www.bokjiro.go.kr/ssis-tbu/NationalWelfareInformations/NationalWelfarelist.do?serviceKey=${apiConf.key}&callTp=D&pageNo=1&numOfRows=500&srchKeyCode=003&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`;
    const response = await axios.get(apiUrl);
    const xmlJson = converter.xml2json(response.data);
    const jsonElements = JSON.parse(xmlJson).elements[0].elements;
    await processData(jsonElements);
    console.log("Central Input Success");
  } catch (err) {
    console.error(err);
  }
});

const centralServiceScheduler = { job1: job1 };

module.exports = centralServiceScheduler;
