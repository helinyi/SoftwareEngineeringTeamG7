const fs = require('fs');
const path = require('path');

// Ensure the public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create images directory
const imagesDir = path.join(publicDir, 'images');
if (!fs.existsSync(imagesDir)) {
  console.log('Creating images directory...');
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Ensure index.html exists
const indexPath = path.join(publicDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.log('Creating index.html...');
  const indexContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="DealScout - Find the best deals across the web"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>DealScout</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;
  fs.writeFileSync(indexPath, indexContent);
}

// Ensure manifest.json exists
const manifestPath = path.join(publicDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.log('Creating manifest.json...');
  const manifestContent = `{
  "short_name": "DealScout",
  "name": "DealScout - Price Comparison Platform",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#1c7ed6",
  "background_color": "#ffffff"
}`;
  fs.writeFileSync(manifestPath, manifestContent);
}

// Ensure robots.txt exists
const robotsPath = path.join(publicDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.log('Creating robots.txt...');
  const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:`;
  fs.writeFileSync(robotsPath, robotsContent);
}

console.log('Post-installation setup completed!');