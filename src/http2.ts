import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {
    // console.log(req.url);
    // res.write('Hola mundo');
    // res.end();

    /**
     * ServerSide Rendering
     */
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<h1>Hola mundo</h1>');
    // res.end();

    /**
     * JSON data
     */
    // const data = { name: 'John Doe', age: 30, city: 'New York' };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.includes('.js')) {
        // application/javascript
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.includes('.css')) {
        // text/css
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    try {
        const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
        res.end(responseContent);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }

});

server.listen(8484, () => {
    console.log('Server running on port 8484');
});