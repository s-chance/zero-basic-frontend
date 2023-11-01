// 服务端代码: 本阶段提供建议代码供前端调试
'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

// 端口号
const port = 3000;
const server = http.createServer((req, res) => {
    let pathUrl = req.url;
    if (pathUrl === '/') pathUrl = 'index.html';

    // 默认都是静态文件输出
    const extName = path.extname(pathUrl);
    const filePath = path.join(__dirname, 'web', pathUrl)
    res.writeHead(200, { 'Content-Type': `${mime.lookup(extName)}` });
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
            res.end(data);
        });
    }
});

server.timeout = 3000; // 超时时间3s(便于项目调试，实际项目中无需指定)
server.listen(port, () => {
    console.log(`[Test Server] Server running at http://127.0.0.1:${port}`);
});
