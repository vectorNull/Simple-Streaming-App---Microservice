const express = require('express');
const fs = require('fs');

const app = express();

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.")
}

const PORT = process.env.PORT;

app.get('/video', (req, res) => {
    
    // Video by 宇航 钱 from Pexels
    const path = "../simpleStreamingApp_Microservice/videos/pexel_bluberries.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error('An error occured.');
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4"
        });

        fs.createReadStream(path).pipe(res);
    })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}; point your browser at http://localhost:3000/video`);
})