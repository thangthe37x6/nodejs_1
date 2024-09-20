import http from 'http'
import os from 'os'
import fs from 'fs'
import EventEmitter from 'events';

// Tạo một instance của EventEmitter
const eventEmitter = new EventEmitter();

// Hàm để lấy thông tin hệ thống
function getSystemInfo() {
  const cpuInfo = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const systemInfo = {
    platform: os.platform(),
    osType: os.type(),
    arch: os.arch(),
    uptime: os.uptime(),
    cpuModel: cpuInfo[0].model,
    numCores: cpuInfo.length,
    cpuSpeed: cpuInfo[0].speed + ' MHz',
    totalMem: (totalMem / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
    usedMem: (usedMem / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
    freeMem: (freeMem / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
  };
  return systemInfo;
}

// Hàm ghi thông tin vào file Homework.txt
function writeToFile(data) {
  let content = 'System Information:\n';
  for (const key in data) {
    content += `${key}: ${data[key]}\n`;
  }

  fs.writeFile('Homework.txt', content, (err) => {
    if (err) throw err;
    console.log('System information written to Homework.txt');

    // Emit sự kiện khi ghi file hoàn tất
    eventEmitter.emit('complete');
  });
}

// Lắng nghe sự kiện 'complete' và in ra "complete task"
eventEmitter.on('complete', () => {
  console.log('complete task');
});

// Tạo server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const systemInfo = getSystemInfo();
    
    // Ghi thông tin vào file
    writeToFile(systemInfo);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>System Information</h1>');
    res.write('<ul>');
    for (const key in systemInfo) {
      res.write(`<li><strong>${key}:</strong> ${systemInfo[key]}</li>`);
    }
    res.write('</ul>');
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }
});

// Lắng nghe trên port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});