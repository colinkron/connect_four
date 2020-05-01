const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

const DATABASE_NAME = 'FinalProject';
const MONGO_URL = "mongodb+srv://colinjames1:jamescolin1@cluster0-ztasy.mongodb.net/test?retryWrites=true&w=majority";
// const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

const mongoose = require("mongoose");
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

let db = null;
let collection = null;

app.use(bodyParser.urlencoded({extended: true}));

//update database or add new things to it
app.post('/game', (req, res) => {
	MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, db) => {
			if (err) {
					console.log("Error: Connecting to MongoDB.");
					res.statusCode = 404;
			}
		var dbase = db.db('FinalProject')
	 	var users = dbase.collection('login')

		var username = req.body.username;
		// var password = req.body.password;

		users.findOne({username:username}, (err, user) => {
			console.log(err);
			if(err) {
				console.log("Failed to connect.");
				res.send(false);
			}

			if (user) {

				// figure this out
				// this is for when the username already has been used before



			} else {
				console.log("Success: Signing you up...");
				var newEntry = {username: username};
				users.insertOne(newEntry, (err2, res2) =>  {
					console.log(err2);
					if (err2) {
						console.log("Error: Couldn't sign you up. Try again");
						res.send(false);
					} else {
							console.log("Success: Sign up complete.");
							res.redirect('http://localhost:8000/game.html?username=' + username);
						}
					});
				}
		});
	});
});


app.listen(8000, () => {
	console.log("Listening on port 8000!")
});
