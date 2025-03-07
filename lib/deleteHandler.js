"use strict";

const { access, unlink, constants, readFile, writeFile } = require("fs");
const { join } = require("path");

module.exports = (pathUrl, res) => {
  const filePath = join(__dirname, "..", "web", pathUrl);

  access(filePath, constants.F_OK | constants.R_OK, err => {
    if (err) {
      console.error(err);
      return;
    }

    unlink(filePath, err => {
      if (err) {
        res.end(JSON.stringify({ success: false, error: err.message }));
        return;
      }
      res.end(JSON.stringify({ success: true }));
    });

    const listDataPath = join(__dirname, "..", "web", "data", "data.json");
    let listData = [];
    let filteredData = [];
    access(listDataPath, constants.F_OK | constants.R_OK, (err) => {
      if (err) {
        res.end(JSON.stringify({ success: false, error: err.message }));
        return;
      }
      readFile(listDataPath, "utf8", (err, data) => {
        try {
          listData = JSON.parse(data);
        } catch (e) {
          res.end(JSON.stringify({ success: false, error: e.message }));
          return;
        }

        filteredData = listData.filter((item) => {
          return !filePath.includes(item.picPath);
        });

        writeFile(
          listDataPath,
          JSON.stringify(filteredData, null, 2),
          "utf8",
          (err) => {
            if (err) {
              console.error("数据更新失败", err);
              return;
            }
            res.end(JSON.stringify({ success: true }, null, 2));
            console.log(`删除: ${filePath}`);
          }
        );
      });
    });
  });
};
