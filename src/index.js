const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.")
}

const PORT = process.env.PORT;

app.get('/video', (req, res) => {
    
    // Video by 宇航 钱 from Pexels
    const videoPath = path.join("./videos", "pexel_bluberries.mp4");
    fs.stat(videoPath, (err, stats) => {
        if (err) {
            console.error('An error occured.');
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4"
        });

        fs.createReadStream(videoPath).pipe(res);
    })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}; point your browser at http://localhost:3000/video`);
})