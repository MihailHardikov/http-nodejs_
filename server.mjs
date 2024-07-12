import { createServer } from 'http';
import { URL } from 'url';

createServer((req, res) => {
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const name = url.searchParams.get('name') || 'World';
    const message = decodeURIComponent(url.searchParams.get('message') || '');


    let responseMessage = "Hello " + name + "! " + message + "!";
    responseMessage = responseMessage.replace(/['"]/g, '');

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.write(responseMessage);
    res.end();
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.write('Method Not Allowed');
    res.end();
  }
}).listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
