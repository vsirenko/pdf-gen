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

    const data = req.body.dataHtml;
    const margins = req.body.margins
    console.log(data)

    const options = { 
        format: 'A4',
        orientation: "portrait",
        border: {
            left: `${margins.left}cm`, 
            right: `${margins.right}cm`, 
            top: `${margins.top}cm`, 
            bottom: `${margins.bottom}cm`
        }
    };

    const style = '<style> @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"); *{font-family: "Roboto", sans-serif;} p {margin: 0; font-weight:normal;} strong {font-size:15px; font-weight: 600; font-weight:bold;} hr { border: 1px solid #eee;} div.wrapper { } body {margin: 0px padding: 0px !important} td, th {padding: 0.4rem;} </style> '

    const string = data;
    const ress = `${style} <div class="wrapper">${string}</div>`
    let fileName = uuid.v4() + ".pdf";
    pdf.create(ress, options).toFile(`./public/${fileName}`, function(err, result) {
        if (err) return console.log(err);
        console.log(result); // { filename: '/app/businesscard.pdf' }
        res.send(fileName);
    });
    
});

