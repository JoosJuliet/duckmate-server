var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var request = require('request');

const db_config = require('/home/node/duckmate-server/config/db_config.json');
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

var url = 'http://sbapi.soribada.com/charts/songs/realtime/json?size=100&cache=Y&version=2.5';

request({
	url : url,
	method : 'GET'
}, function (error, response, body){

	console.log(body.SoribadaApiResponse.Song[0].Rank);

});
