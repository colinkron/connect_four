const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();
var port = process.env.PORT || 3000;

app.use(express.static('public'));

const DATABASE_NAME = 'FinalProject';
const MONGO_URL = "mongodb+srv://colinjames1:jamescolin1@cluster0-ztasy.mongodb.net/test?retryWrites=true&w=majority";
// const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

const mongoose = require("mongoose");
mongoose
	.connect(MONGO_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
	// .then(() => console.log( 'Database Connected' ))
  // .catch(err => console.log( err ))

let db = null;
let collection = null;

app.use(bodyParser.urlencoded({extended: true}));

//update database or add new things to it
app.post('/game', (req, res) => {
	MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, db) => {
			if (err) {
					console.log("Error.");
					res.statusCode = 404;
			}
		var dbase = db.db('FinalProject')
	 	var users = dbase.collection('login')

		var username = req.body.username;
		var image = req.body.image; //need to access the picture link!!!!

		users.findOne({username:username}, (err, user) => {
			console.log(err);
			if(err) {
				console.log("Failed to connect.");
				res.send(false);
			}

			if (user) {
				res.redirect('https://connect-four-final.herokuapp.com/index.html?status=failure');
				// res.send("This username is alredy taken");

			} else {
				console.log("Success: Signing you up...");
				var newEntry = {username: username, image: image};
				users.insertOne(newEntry, (err2, res2) =>  {
					console.log(err2);
					if (err2) {
						console.log("Error: Couldn't sign you up. Try again");
						res.send(false);
					} else {
							console.log("Success: Sign up complete.");
							res.redirect('https://connect-four-final.herokuapp.com/game.html?username=' + username + '&image=' + image);
						}
					});
				}
		});
	});
});


app.listen(port, () => {
	console.log("Listening on port 8000!")
});
