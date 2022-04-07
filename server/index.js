var express = require('express');
const cors = require('cors');
var app = express();
var pdf = require('html-pdf');
const path = require('path');
const uuid = require('uuid');
var options = { format: 'A4',
// "footer": {
//     "height": "28mm",
//     "contents": {
//       first: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',// Any page number is working. 1-based index
//       default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//       last: 'Last Page'
//     }
//   },
};

var fs = require('fs');
var html_to_pdf = require('html-pdf-node');


app.use(cors());
app.use(express.json()); 
app.use(express.static(path.resolve(__dirname, 'public')))
app.listen(5000, () => {
    console.log('server work');
})

app.use(express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.post('/generate-pdf', (req, res) => {

    const {data} = req.body;

    console.log(data)


    const style = '<style> @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"); *{font-family: "Roboto", sans-serif;} p {margin: 0; font-weight:normal; font-size: 13px} strong {font-size:15px; font-weight: 600; font-weight:bold;} tr, td, table, tbody {border: 1px solid #eee;} hr { border: 1px solid #eee;} div.wrapper {padding-left: 20px; padding-right: 20px; }  </style> '

    const string = data;
    const ress = `${style} <div class="wrapper">${string}</div>`
    let fileName = uuid.v4() + ".pdf";
    pdf.create(ress, options).toFile(`./public/${fileName}`, function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    res.send(fileName);
});

