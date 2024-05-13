import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
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

    const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
    res.end(responseContent);

    /* else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }*/

});

server.listen(8484, () => {
    console.log('Server running on port 8484');
});