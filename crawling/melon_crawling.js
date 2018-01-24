const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const period = 3000;
const url = 'http://www.mnet.com/chart/TOP100';
const url2 = 'http://www.mnet.com/chart/TOP100?pNum=2';

setInterval( function(){
let jbAry = [];
let jbAry2 = [];
let jbAry3 = [];
let jbAry4 = [];
let jbAry5 = [];
let jbAry6 = [];

let arr = [];
request.get(url, function(err, response, body){

    const $ = cheerio.load(body);

    let postElements=$("a.MMLI_Song");
    
    postElements.each(function() {
       let postTitle = $(this).text()+'\r\n';
       jbAry += postTitle;
    });
    postElements2.each(function() {
       let postTitle2 = $(this).text()+'\r\n';
       jbAry2 += postTitle2;
    });
    postElements3.each(function() {
       let postTitle3 = $(this).text()+'\r\n';
       jbAry3 += postTitle3;
    });

    fs.writeFile('mnet_title.txt', jbAry, 'utf-8', function(error) {
         console.log('writeFile completed');
         check();
    });
    fs.writeFile('mnet_artist.txt', jbAry2, 'utf-8', function(error) {
         console.log('writeFile completed');
         check();
    });
    fs.writeFile('mnet_album.txt', jbAry3, 'utf-8', function(error) {
         console.log('writeFile completed');
         check();
    });

});


const check = () =>{
  arr.push(1);

  if( arr.length ===3 ) return next();
  else return;
}
//setTimeout(
const next = () =>{
  request.get(url2, function(err, response, body){

  	var $2 = cheerio.load(body);

  	var postElements4=$2("a.MMLI_Song");
  	var postElements5=$2("a.MMLIInfo_Artist");
  	var postElements6=$2("a.MMLIInfo_Album");

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

  	fs.appendFile('mnet_title.txt', jbAry4, 'utf-8', function(error) {
  		console.log('writeFile2 completed');
  	});
  	fs.appendFile('mnet_artist.txt', jbAry5, 'utf-8', function(error) {
  		console.log('writeFile2 completed');
  	});
  	fs.appendFile('mnet_album.txt', jbAry6, 'utf-8', function(error) {
  		console.log('writeFile2 completed');
  	});

  });
}

//	}, 1000);

console.log('finish');
}, period);
