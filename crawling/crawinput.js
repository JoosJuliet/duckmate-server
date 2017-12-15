var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var request = require('request');
var url = 'http://sbapi.soribada.com/charts/songs/realtime/json?size=100&cache=Y&version=2.5';

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

request({
	url : url,
	method : 'GET'
}, function (error, response, body){

	//var obj = eval(body);
	//	console.log(obj);
	var obj2 = JSON.parse(body);
	var Artistarr = [];
	var Songarr = [];
	var query = "";
	var updatequery = "";

	for(var i=0;i<100;i++){
		Artistarr[i] = obj2.SoribadaApiResponse.Songs.Song[i].Artists.Artist[0].Name;
		Songarr[i] = obj2.SoribadaApiResponse.Songs.Song[i].Name;
	}

	for(var i=0;i<100;i++){
		Artistarr[i] = Artistarr[i].replace(/\n/g, '');
		Artistarr[i] = Artistarr[i].replace("\'", "\\\'");
		Artistarr[i] = Artistarr[i].replace(/\s/g, '');
		Songarr[i] = Songarr[i].replace(/\n/g, '');
		Songarr[i] = Songarr[i].replace("\'", "\\\'");
		Songarr[i] = Songarr[i].replace(/\s/g, '');
	}
	var num = 1;

/*
	for (i=1 ; i<=9 ; i++){
                updatequery += "update singer set album_img = '"+"https://storage.googleapis.com/duckmate_img/%EC%95%A8%EB%B2%94/a-0"+i+".jpg' where singer_id='"+i+"';";
		updatequery += "update singer set singer_img = '"+"https://storage.googleapis.com/duckmate_img/%EA%B0%80%EC%88%98/a-0"+i+".jpg' where singer_id='"+i+"';"; 

        }

	pool.query(updatequery, function(error, rows){
		if(error){
			console.log("connection error" + error);
		}
	});
*/

	for(i in Artistarr){
		query += "update chart_soribada set singer_name = '"+ Artistarr[i] +"' where idx='" + num + "'; ";
		num=num+1;
	}
	num = 1;
	for(i in Songarr){
		query += "update chart_soribada set song = '"+ Songarr[i] +"' where idx='" + num + "'; ";
	num=num+1;
	}

	pool.query(query, function(error, rows){
					if(error){
									console.log("connection error" + error);
					}
	});

		//console.log(obj.SoribadaApiResponse.Song[0].Rank);

}); //soribada
/*
fs.readFile('/home/node/duckmate-server/crawling/genie_artist.txt', function(err, data){
	if(err) throw err;
	var array = data.toString().split("\r");
	var query = "";
	var num = 1;
	for(i in array){
		array[i] = array[i].replace(/\n/g, '');
		array[i] = array[i].replace("\'", "\\\'");
		array[i] = array[i].replace(/\s/g, '');
	}

	for(i in array){
		query += "update chart_genie set singer_name = '"+ array[i] +"' where idx='" + num + "'; ";
	num=num+1;
	}

	pool.query(query, function(error, rows){
		if(error){
		console.log("connection error" + error);
		}
	});

});

fs.readFile('/home/node/duckmate-server/crawling/genie_title.txt', function(err, data){
        if(err) throw err;
        var array = data.toString().split("\r");
        var query = "";
        var num = 1;

        for(i in array){
                array[i] = array[i].replace(/\n/g, '');
                array[i] = array[i].replace("\'", "\\\'");
                array[i] = array[i].replace(/\s/g, '');
        }


        for(i in array){
                query += "update chart_genie set song = '"+ array[i] +"' where idx='" + num + "'; ";
        num=num+1;
        }

        pool.query(query, function(error, rows){
                if(error){
                        console.log("connection error" + error);
                }
        });

});
*/
fs.readFile('/home/node/duckmate-server/crawling/mnet_artist.txt', function(err, data){

        if(err) throw err;
        var array = data.toString().split("\r");
        var query = "";
        var num = 1;


        for(i in array){
                array[i] = array[i].replace(/\n/g, '');
                array[i] = array[i].replace("\'", "\\\'");
                array[i] = array[i].replace(/\s/g, '');
        }

        for(i in array){
                query += "update chart_mnet set singer_name = '"+ array[i] +"' where idx='" + num + "'; ";
        num=num+1;
        }

        pool.query(query, function(error, rows){
                if(error){
                console.log("connection error" + error);
                }
        });
//      fs.close();



});


fs.readFile('/home/node/duckmate-server/crawling/mnet_title.txt', function(err, data){
        if(err) throw err;

        var array = data.toString().split("\r");
        var query = "";
        var num = 1;

        for(i in array){
                array[i] = array[i].replace(/\n/g, '');
                array[i] = array[i].replace("\'", "\\\'");
                array[i] = array[i].replace(/\s/g, '');
        }


        for(i in array){
                query += "update chart_mnet set song = '"+ array[i] +"' where idx='" + num + "'; ";
        num=num+1;
        }

        pool.query(query, function(error, rows){
                if(error){
                        console.log("connection error" + error);
                }
        });
//      fs.close();
});
