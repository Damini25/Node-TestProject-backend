const fs = require('fs');
const requestHandler = (req, res) => {
    if (req.url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (req.url == '/message' && req.method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk', chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.text', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>hello</body>');
    res.write('</html>');
    res.end();
}
module.exports = requestHandler;