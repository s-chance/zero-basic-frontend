// 服务端代码
"use strict";

const http = require("http");
const staticHandler = require("./lib/staticHandler");
const listHandler = require("./lib/listHandler");
const uploadHandler = require("./lib/uploadHandler");
const deleteHandler = require("./lib/deleteHandler.js");

// 端口号
const port = 3000;
const server = http.createServer((req, res) => {
  let pathUrl = req.url;

  console.log(`请求: [${req.method}] ${pathUrl}`);

  // 默认路径
  if (!pathUrl || pathUrl === "/") pathUrl = "index.html";

  if (pathUrl.endsWith("/pic/list")) {
    return listHandler(req, res);
  }

  if (pathUrl.endsWith("upload")) {
    return uploadHandler(req, res);
  }

  if (pathUrl.endsWith("delete")) {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
    })
    req.on("end", () => {
      const picPath = body.substring(1, body.length - 1);
      return deleteHandler(picPath, res);
    });
  }

  return staticHandler(pathUrl, res);
});


server.timeout = 3000;
server.listen(port, () => {
  console.log(`服务器已启动，监听端口${port}`);
});
