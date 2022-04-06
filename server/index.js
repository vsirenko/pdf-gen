var express = require('express');
const cors = require('cors');
var app = express();
var pdf = require('html-pdf');
var options = { format: 'A4' };
var fs = require('fs');
var html_to_pdf = require('html-pdf-node');


app.use(cors());
app.use(express.json()); 
app.listen(5000, () => {
    console.log('server work');
})

app.use(express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.post('/generate-pdf', (req, res) => {

    const {data} = req.body;

    console.log(data)



    // const style = '<style> @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"); *{font-family: "Roboto", sans-serif;} p {margin: 0; font-weight:normal; font-size: 13px} strong {font-size:15px; font-weight: 600; font-weight:bold;} div { padding-top: 20px; padding-left: 30px; } tr, td, table, tbody {border: none !important} </style>'
    const string = data;
    const ress = `<div class="wrapper">${string}</div>`
    pdf.create(ress, options).toFile('./public/businesscard7.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    res.send('resolved');
});

