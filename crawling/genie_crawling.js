const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var url = 'http://www.genie.co.kr/chart/top100';
var url2 = 'http://www.genie.co.kr/chart/top100?&pg=2';

let jbAry = [];
let jbAry2 = [];
let jbAry3 = [];
let jbAry4 = [];
let jbAry5 = [];
let jbAry6 = [];

let arr = [];

request.get(url, function(err, response, body){

	const $ = cheerio.load(body);


	
	let postElements=$("span.music_area a.title");
	let postElements2=$("span.music_area a.artist");
	let postElements3=$("span.music_area a.albumtitle");


	postElements.each(function() {
	   var postTitle = $(this).text()+'\r\n';
	   jbAry += postTitle;
	});
	postElements2.each(function() {
	   var postTitle2 = $(this).text()+'\r\n';
	   jbAry2 += postTitle2;
	});
	postElements3.each(function() {
	   var postTitle3 = $(this).text()+'\r\n';
	   jbAry3 += postTitle3;
	});

	fs.writeFile('genie_title.txt', jbAry, 'utf-8', function(error) {
		 console.log('writeFile completed');
		 check();
	});
	fs.writeFile('genie_artist.txt', jbAry2, 'utf-8', function(error) {
		 console.log('writeFile completed');
		 check();
	});
	fs.writeFile('genie_album.txt', jbAry3, 'utf-8', function(error) {
		 console.log('writeFile completed');
		 check();
	});

});

const check = () =>{
	arr.push(1);

	if(arr.length ===3) return next();
	else return;
}

const next = () =>{
	request.get(url2, function(err, response, body){

		const $2 = cheerio.load(body);

		let postElements4=$2("span.music_area a.title");
		let postElements5=$2("span.music_area a.artist");
		let postElements6=$2("span.music_area a.albumtitle");

		postElements4.each(function() {
		   var postTitle4 = $2(this).text()+'\r\n';
		   jbAry4 += postTitle4;
		});
		postElements5.each(function() {
		   var postTitle5 = $2(this).text()+'\r\n';
		   jbAry5 += postTitle5;
		});
		postElements6.each(function() {
		   var postTitle6 = $2(this).text()+'\r\n';
		   jbAry6 += postTitle6;
		});

		fs.appendFile('genie_title.txt', jbAry4, 'utf-8', function(error) {
			 console.log('writeFile2 completed');
		});
		fs.appendFile('genie_artist.txt', jbAry5, 'utf-8', function(error) {
			 console.log('writeFile2 completed');
		});
		fs.appendFile('genie_album.txt', jbAry6, 'utf-8', function(error) {
			 console.log('writeFile2 completed');
		});

	});
}

console.log('finish');
