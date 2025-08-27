import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  const url = req.url || '/';
  
  if (url.startsWith('/static/')) {
    const filePath = path.join(__dirname, '../dist', url.replace('/static', ''));
    
    try {
      const data = fs.readFileSync(filePath);
      const ext = path.extname(filePath);
      
      let contentType = 'text/plain';
      switch (ext) {
        case '.js':
          contentType = 'application/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.html':
          contentType = 'text/html';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
      return;
    } catch (error) {
      console.error('Static file error:', error);
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
  }
  try {

    const appHtml = renderToString(React.createElement(App));
    
    const distPath = path.join(__dirname, '../dist');
    let jsFiles: string[] = [];
    let cssFiles: string[] = [];
    
    try {
      const files = fs.readdirSync(distPath);
      jsFiles = files.filter(file => file.endsWith('.js') && !file.includes('hot-update'));
      cssFiles = files.filter(file => file.endsWith('.css'));
    } catch (error) {
      console.log('No dist files found, using fallback:', error);
    }
    
    // Create HTML template
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App 1 - SSR</title>
        ${cssFiles.map(file => `<link rel="stylesheet" href="/static/${file}">`).join('\n        ')}
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script>
          window.app2Url = "http://localhost:3002";
          window.__SSR__ = true;
        </script>
        ${jsFiles.map(file => `<script src="/static/${file}"></script>`).join('\n        ')}
      </body>
    </html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    
  } catch (error) {
    console.error('SSR Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.writeHead(500);
    res.end('Server Error: ' + errorMessage);
  }
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`SSR Server running on http://localhost:${PORT}`);
});