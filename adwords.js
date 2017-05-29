




var google = require('googleapis');
var urlshortener = google.urlshortener('v1');

var params = {
      shortUrl: 'http://goo.gl/xKbRu3'
};

// get the long url of a shortened url
urlshortener.url.get(params, function (err, response) {
          if (err) {
              console.log('Encountered error', err);
                } else {
                    console.log('Long url is', response.longUrl);
                      }
                      });
