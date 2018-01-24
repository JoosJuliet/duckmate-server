const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const period = 3000;
const url = 'https://music.bugs.co.kr/chart/track/realtime/total';

setInterval( function(){
let jbAry = [];
let jbAry2 = [];
let jbAry3 = [];

let arr = [];
request.get(url, function(err, response, body){

    const $ = cheerio.load(body);

    let postElements=$("p.title");
 //   let postElements2=$("a.MMLIInfo_Artist");
 //   let postElements3=$("a.MMLIInfo_Album");

    postElements.each(function() {
       let postTitle = $(this).text()+'\r\n';
       jbAry += postTitle;
    });
 /*   postElements2.each(function() {
       let postTitle2 = $(this).text()+'\r\n';
       jbAry2 += postTitle2;
    });
    postElements3.each(function() {
       let postTitle3 = $(this).text()+'\r\n';
       jbAry3 += postTitle3;
    });
*/
    fs.writeFile('bugs_title.txt', jbAry, 'utf-8', function(error) {
         console.log('writeFile completed');
         check();
    });
  /*  fs.writeFile('mnet_artist.txt', jbAry2, 'utf-8', function(error) {
         console.log('writeFile completed');
         check();
    });
    fs.writeFile('mnet_album.txt', jbAry3, 'utf-8', function(error) {
         console.log('writeFile completed');
         check();
    });
*/
});


const check = () =>{
  arr.push(1);

  if( arr.length ===3 ) return next();
  else return;
}


console.log('finish');
}, period);

