const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const DEBUG = true;


app.set('view engine', 'ejs');
// app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


const landingPage = (req, res) => {
    var data = {
        root: __dirname,
        rows: [
            {
                "name": "One",
                "value": '1'
            },
            {
                "name": "Two",
                "value": '2'
            },
            {
                "name": "Three",
                "value": '3'
            }
        ]
    };
    res.render('./public/index.html', data);

    // return res.sendFile("./public/index.html", data);
};
app.get('/', landingPage);

app.post('/', (req, res) => {
    console.log(req.body);
    // redirect after timeout seconds
    const timeout = 2;
    res.send(`
        <html>
            <head>
            <meta http-equiv="refresh" content="${timeout};url=/" />
            </head>
            <body>Your data is registered successfully.</body>
        </html>
    `);
});

app.listen(port, () => {
    console.log("Server is running at http://localhost:"+port);
});