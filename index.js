const express = require('express');

const bodyParser = require('body-parser');

const PORT = 8080;

const path = require('path');

const app = new express();

const router = require('./routes/index');

app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded(
		{
			extended: true
		}
	)
)

app.use(function(req, res, next) {
    console.log(req.method, req.url)
    next();
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

app.set('port', PORT);
const db_connection = require('./util/database');

var server = app.listen(
	app.get('port'), function() {
		var port = server.address().port;
		console.log("Server is running on port: " + port);
		db_connection
    .sync()
    .then(() => {
        console.log('Database connected!');
    })
    .catch(err => {
        console.log(err);
    });
	}
);
