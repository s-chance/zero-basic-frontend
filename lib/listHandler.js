"use strict";

const { access, readFile, constants } = require("fs");
const path = require("path");

module.exports = (req, res) => {
  let listData = [];
  const listDataPath = path.join(__dirname, "..", "web", "data", "data.json");

  access(listDataPath, constants.R_OK, (err) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    if (err) {
      res.end(JSON.stringify({ success: false, error: err.message }));
      return;
    }

    readFile(listDataPath, "utf8", (err, data) => {
      if (err) {
        res.end(JSON.stringify({ success: false, error: err.message }));
        return;
      }
      try {
        listData = JSON.parse(data);
        const result = JSON.stringify({ success: true, data: listData });
        console.log(`图片列表数据: ${result}`);
        res.end(result);
      } catch (e) {
        res.end(JSON.stringify({ success: false, error: e.message }));
        return;
      }
    });
  });
};
