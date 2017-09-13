var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var router = express.Router();

const db_config = require('../../config/db_config.json');
console.log(db_config);
const connectionLimit = 50;

global.pool = mysql.createPool({
	host : db_config.host,
	port : db_config.port,
	user : db_config.user,
	password : db_config.password,
	database : db_config.database,
	connectionLimit : db_config.connectionLimit,
	multipleStatements : true
});

fs.readFile('/home/crawling/genie_artist.txt', function(err, data){
	if(err) throw err;
	var array = data.toString().split("\r");
	var query = "";
	for(i in array){
		console.log(array[i]);
	}
	for(i in array){
	var num = 1;
		query += "insert into chart_genie (singer_name) values (" + array[i] + ") where idx='" + num + "'; ";
	num++;
	}

	console.log(query);
	
	pool.query(query, function(error, rows){
		if(error){
			console.log("connection error" + error);
		}
	});
});


module.exports = router;

