import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.ttf':'font/ttf','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{const route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let target=path.resolve(root,'.'+(route==='/'?'/index.html':route));if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}if(!path.extname(target))target+='.html';try{await stat(target);}catch{target=path.join(root,'404.html');res.statusCode=404;}res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');res.end(await readFile(target));}catch{res.writeHead(400);res.end('Bad request');}});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
