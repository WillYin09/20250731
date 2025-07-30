#!/usr/bin/env node
const { execSync, spawn } = require('child_process');

function killPort(port) {
  try {
    const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
    const lines = result.split('\n').filter(line => line.trim());
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length > 4) {
        const pid = parts[4];
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
          console.log(`已终止占用端口${port}的进程 ${pid}`);
        } catch (e) {}
      }
    });
  } catch (e) {
    // 端口未被占用
  }
}

console.log('🔧 强制在3000端口启动开发服务器...');
killPort(3000);

// 启动 next dev -p 3000
const child = spawn('npx', ['next', 'dev', '-p', '3000'], { stdio: 'inherit', shell: true });
child.on('exit', code => process.exit(code)); 