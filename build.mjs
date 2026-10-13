import fs from 'node:fs';
const parts=['data/simple-examples.js','data/words.js','data/questions.js','app/store.js','app/sync.js','app/practice.js','app/main.js'];
const js=parts.map(path=>fs.readFileSync(path,'utf8').replace(/\bimport\s+[^;]+;\s*/g,'').replace(/\bexport\s+(?=(?:const|let|function|async\s+function)\b)/g,'')).join('\n');
const css=fs.readFileSync('app/style.css','utf8');
const html=`<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#0b1020"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><title>YDSEM CEPTE</title><link rel="manifest" href="manifest.webmanifest"><style>${css}</style></head><body><div id="app"></div><script>${js.replaceAll('</script>','<\\/script>')}</script></body></html>`;
fs.writeFileSync('index.html',html,'utf8');
console.log('index.html hazır:',Math.round(Buffer.byteLength(html)/1024),'KB');
