
const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');
const { randomUUID } = require('crypto');
const jsonDataStore = require('./db.json');

// set disk storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "/static/audio"));
    },
    filename: function (req, file, callback) {
        callback(null, randomUUID() + "." + file.mimetype.split("/")[1]);
    },
});

const upload = multer({ storage });
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middleWares = jsonServer.defaults({ static: "./static" });

server.use(middleWares);

const jsonPath = path.join(process.cwd(), './db.json');

server.post("/podcasts", upload.single("file"), function (req, res) {
    console.log('Creating new Podcast');
    const reqJson = JSON.parse(req.body.json);
    const podcasts = jsonDataStore.podcasts;
    reqJson.id = podcasts.length > 0 ? podcasts[podcasts.length - 1].id + 1 : 1;
    reqJson.uri = `/audio/${req.file.filename}`;
    reqJson.createDate = new Date().toISOString();
    reqJson.modifiedDate = new Date().toISOString();
    podcasts.push(reqJson);
    fs.writeFile(jsonPath, JSON.stringify(jsonDataStore, undefined, 2), (error) => {
        if (error) throw error;
    });
    res.status(201).json(reqJson);
});

server.put("/podcasts/:id", upload.single("file"), function (req, res) {
    console.log('Updating the existing Podcast');
    const reqJson = JSON.parse(req.body.json);
    const podcast = jsonDataStore.podcasts.find(element => element.id === reqJson.id);
    if (podcast) {
        if (req.file) {
            podcast.uri = `/audio/${req.file.filename}`;
            podcast.duration = reqJson.duration;
        }
        podcast.title = reqJson.title;
        podcast.descrption = reqJson.descrption;
        podcast.author = reqJson.author;
        podcast.category = reqJson.category;
        podcast.tags = reqJson.tags;
        podcast.modifiedDate = new Date().toISOString();
        fs.writeFile(jsonPath, JSON.stringify(jsonDataStore, undefined, 2), (error) => {
            if (error) throw error;
        });
        res.status(200).json(podcast);
    } else {
        res.status(404).json({
            errorCode: "NOT Found",
            errorMessage: "Record not found"
        });
    }
});


server.use(router);

server.listen(4300, () => {
    console.log("Json Server is running..")
});
