var formatter = require('formatter');
var request = require('hyperquest');
var JSONStream = require('JSONStream');
var url = formatter('https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key={{ apikey }}&photo_id={{ id }}&format=json&nojsoncallback=1');

/**
  # shaz-flickr

  Add simple flickr integration into the shazam slide builder tools.

  ## Example Usage

  <<< examples/simple.js
**/
module.exports = function(Slide, opts) {
  Slide.prototype.flickr = function(id) {
    var slide = this;

    request.get(url({ apikey: (opts || {}).apikey, id: id }), { withCredentials: false })
      .on('error', function() {
        console.error('could not get flickr image id: ' + id);
      })
      .pipe(JSONStream.parse('sizes.size.*', function(data) {
        if (data.label === 'Large') {
          return data;
        }
      }))
      .on('data', function(data) {
        slide.jpg(data.source);
      });

    return this;
  };
};
