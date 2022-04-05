var express = require('express');
var app = express();
var pdf = require('html-pdf');
var options = { format: 'A4' };
var fs = require('fs');
var html_to_pdf = require('html-pdf-node');


app.listen(5000, () => {
    console.log('server work');
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    const style = '<style> @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"); *{font-family: "Roboto", sans-serif;} p {margin: 0; font-weight:normal; font-size: 13px} strong {font-size:15px; font-weight: 600; font-weight:bold;} div { padding-top: 20px; padding-left: 30px; }</style>'
    const string = '<div><p><strong>Dr. Gilles TARDIEU</strong></p><p>M&eacute;decine g&eacute;n&eacute;rale</p><p>N&deg;RCC : N284622</p><p>&nbsp;</p><p><strong>Cabinet M&eacute;dical Villeneuve Montreux,&nbsp;</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;the 05.04.2022</p><p>Rue des Fortifications 8ba</p><p>1821 Montreux</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>Concerns: Cher Dr. Tardieu,</strong></p><hr /><p>&nbsp;</p></div>'
    const ress = `${style} ${string}`
    pdf.create(ress, options).toFile('./businesscard7.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
});

