
const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');
const { randomUUID } = require('crypto');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, "/static/audio"));
    },
    filename: function(req, file, callback){
        callback(null, randomUUID() + "." + file.mimetype.split("/")[1]);
    },
});

const upload = multer({storage});
const server = jsonServer.create();
const router  = jsonServer.router(path.join(__dirname, "db.json"));
const middleWares = jsonServer.defaults({static: "./static"});

server.use(middleWares);


server.post("/podcasts", upload.single("file"), function (req, res) {
    res.json({uri: `/audio/${req.file.filename}`})
});

server.put("/podcasts/:id", upload.single("file"), function (req, res) {
    res.json({uri: `/audio/${req.file.filename}`})
});


server.use(router);

server.listen(3004, () => {
    console.log("Json Server is running..")
});
