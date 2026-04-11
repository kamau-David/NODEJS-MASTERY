const os = require("os");

console.log("Platform:", os.platform());        // 'win32', 'linux', 'darwin'
console.log("CPU cores:", os.cpus().length);      // relevant later for clustering
console.log("Free memory (MB):", Math.round(os.freemem() / 1024 / 1024));
console.log("Total memory (MB):", Math.round(os.totalmem() / 1024 / 1024));
console.log("Home directory:", os.homedir());
console.log("Uptime (hours):", (os.uptime() / 3600).toFixed(1));
