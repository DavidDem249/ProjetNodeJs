require('babel-register');

const express = require('express');

let app = require('express')()

app.set('view engine', 'ejs')


let mysql = require('mysql')

let connection = mysql.createConnection({

	host: "localhost",
	user: "root",
	password: "",
	database: "bd_ivoirenutri"
});

connection.connect((err) => {

	if(err)
		console.log(err.message)
	else
		console.log('connected')

	connection.query("SELECT * FROM users", (err, rows, fields) =>{

		if(err) throw err;

		for(var i = 0; i < rows.length; i++){

			result = rows;
		}
	})

	
	app.post((req, res, next) => {

		var nom = ['nom']
		var prenom = ['prenom']
		var adresse = ['adress']
		var numero = ['numero']
		var commande = ['commande']


		connection.query("INSERT INTO users SET nom=?, prenom=?, adresse=?, numero=?, categoris=?", [nom, prenom, adresse, numero, commande], function(err, rows) {

			if(err){
				res.json(error(err.message))
			}
			else{
				res.render('/acheter')
			}
		})
	})
	
})



app.get('/', (req, res) =>{

	res.render('pages/indexApi')
})

app.use('/commandes', require('./routes/commandes'));


//Les middlewres

app.use(express.static('public'));


app.listen(8000, () => console.log('Vous êtes sur le port 8000'))


