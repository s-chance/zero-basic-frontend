"use strict";

const { access, readFile, constants } = require("fs");
const { join, extname } = require("path");
const { lookup } = require("mime-types");

module.exports = (pathUrl, res) => {
  // 处理静态文件
  const extName = extname(pathUrl);
  const filePath = join(__dirname, "..", "web", pathUrl);

  // 检查权限
  access(filePath, constants.F_OK | constants.R_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-Type": `${lookup(extName)}` });
      return;
    }

    res.writeHead(200, { "Content-Type": `${lookup(extName)}` });

    readFile(filePath, (err, data) => {
      if (err) {
        res.end(JSON.stringify({ success: false, error: err.message }));
        return;
      }
      res.end(data);
    });
  });
};
