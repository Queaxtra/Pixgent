const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const randomstring = require("random-string-gen");
const database = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './database')
    },
    filename: function (req, file, callback) {
        const code = randomstring({
            length: 4,
            type: 'alphabetic'
        });
        callback(null, code + path.extname(file.originalname));
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/*', (req, res) => {
    res.render('404');
});

app.get('/privacypolicy', (req, res) => {
    res.redirect("https://pdfhost.io/v/.L3U6AxDr_a3cfcf0f5ba747399bd9f9425cf28eeca041782ed59346aa8fa49bfbade82342")
});

app.get('/discord', (req, res) => {
    res.redirect("https://discord.gg/TACc9B8hQU")
});

app.get('/twitter', (req, res) => {
    res.redirect("https://twitter.com/Queaxtra")
});

app.get('/sponsor', (req, res) => {
    res.redirect("https://discord.gg/UDC9cXG6RP")
});

app.post('/', multer({ storage: database }).single("pixgent_database"), (req, res) => {
    if (req.file) {
        res.send(`Successful! \nYour photo has been successfully uploaded to the system! \n/uploads/${req.file.filename}`)
    } else {
        res.end('Please upload a photo!')
    }
});

app.get('/uploads/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'database', req.params.name))
});

app.post('/', function (req, res) {
    const uploadedPhoto = multer({
        storage: database,
        fileFilter: function (req, file, callback) {
            const photoFiletype = path.extname(file.originalname);
            if (photoFiletype !== '.png' && photoFiletype !== '.jpg' && photoFiletype !== '.jpeg' && photoFiletype !== '.gif' && photoFiletype !== '.txt' && photoFiletype !== '.pdf' && photoFiletype !== '.doc' && photoFiletype !== '.docx' && photoFiletype !== '.xls' && photoFiletype !== '.xlsx' && photoFiletype !== '.ppt' && photoFiletype !== '.pptx' && photoFiletype !== '.zip' && photoFiletype !== '.rar') {
                return callback(res.end(""), null)
            } callback(null, true);
        }
    }).single("pixgent_database");
    uploadedPhoto(req, res, function (err) {
        res.send(`Successful! \nYour photo has been successfully uploaded to the system! \n/uploads/${req.file.filename}`)
    })
});

app.listen(1422, console.log(`[SERVER] Server has been started.`));