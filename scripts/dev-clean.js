#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 清理开发环境...');

// 清理构建缓存
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  console.log('删除 .next 目录...');
  fs.rmSync(nextDir, { recursive: true, force: true });
}

// 清理node_modules缓存
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(cacheDir)) {
  console.log('删除 node_modules/.cache 目录...');
  fs.rmSync(cacheDir, { recursive: true, force: true });
}

// 终止占用端口的进程
try {
  console.log('检查端口占用...');
  const ports = [3000, 3001, 3002, 3003];
  
  ports.forEach(port => {
    try {
      const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      if (result) {
        console.log(`端口 ${port} 被占用，尝试释放...`);
        const lines = result.split('\n').filter(line => line.trim());
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 4) {
            const pid = parts[4];
            try {
              execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
              console.log(`已终止进程 ${pid}`);
            } catch (e) {
              // 忽略错误
            }
          }
        });
      }
    } catch (e) {
      // 端口未被占用
    }
  });
} catch (e) {
  console.log('端口检查完成');
}

console.log('✅ 环境清理完成！');
console.log('现在可以运行: pnpm run dev'); 