#!/usr/bin/env node
import { readdirSync, copyFileSync, mkdirSync, existsSync, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildCrx() {
  try {
    console.log('开始CRX打包流程...');
    
    // 复制icons到extension目录
    const publicIconsDir = join(__dirname, 'public', 'icons');
    const extensionIconsDir = join(__dirname, 'extension', 'icons');
    
    if (!existsSync(extensionIconsDir)) {
      mkdirSync(extensionIconsDir, { recursive: true });
    }
    
    // 复制所有图标文件
    const iconFiles = readdirSync(publicIconsDir);
    for (const file of iconFiles) {
      const srcPath = join(publicIconsDir, file);
      const destPath = join(extensionIconsDir, file);
      copyFileSync(srcPath, destPath);
      console.log(`✓ 复制图标: ${file}`);
    }
    
    // 使用crx命令行工具打包
    const crxPath = join(__dirname, 'node_modules', '.bin', 'crx');
    const extensionPath = join(__dirname, 'extension');
    const outputPath = join(__dirname, 'extension.crx');
    const keyPath = join(__dirname, 'key.pem');
    
    console.log('正在打包CRX文件...');
    // 检查密钥文件是否存在
    if (existsSync(keyPath)) {
      console.log('使用现有密钥文件:', keyPath);
      execSync(`${crxPath} pack ${extensionPath} -o ${outputPath} -p ${keyPath}`, { stdio: 'inherit' });
    } else {
      console.log('未找到密钥文件，将生成新密钥:', keyPath);
      execSync(`${crxPath} pack ${extensionPath} -o ${outputPath} -p ${keyPath}`, { stdio: 'inherit' });
    }
    
    console.log(`✓ CRX打包成功: ${outputPath}`);
    
    // 生成zip文件用于Chrome Web Store上传
    const zipOutputPath = join(__dirname, 'extension.zip');
    
    // 使用archiver库创建zip文件
    const archiver = (await import('archiver')).default;
    const output = createWriteStream(zipOutputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      console.log(`✓ ZIP打包成功: ${zipOutputPath} (${archive.pointer()} 字节)`);
    });
    
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        throw err;
      }
    });
    
    archive.on('error', (err) => {
      throw err;
    });
    
    archive.pipe(output);
    archive.directory(extensionPath, false);
    await archive.finalize();
    
  } catch (error) {
    console.error('✗ CRX打包失败:', error);
    process.exit(1);
  }
}

buildCrx();
