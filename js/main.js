
  var BASE_URL = 'https://api.spotify.com/v1/';
  var RELATED_LIMIT = 20;
  var SEARCH_LIMIT = 1;
  var $searchResults = $('#searchresults');
  var $selectedArtistTemplate = $('#selectedartisttemplate');
  var $relatedArtistTemplate = $('#relatedartisttemplate');
  var $spotifyResults = $('#spotifyresults');
  var relatedArtists = [];

  $('#btnsearchartists').on('click', function() {
    // console.log( $('#txtArtistSearch') );
    var query = $('#txtArtistSearch').val();
    if (query.length > 2) {
      $searchResults.html('');
      searchArtists(query);
    }
    setTimeout(function(){renderSearchResults(relatedArtists);}, 2000);
  });


// ajax call 1: search for the artist, return the artist object & their ID
  function searchArtists(query) {
    var oData = {
      q: query,
      type: 'artist',
      limit: SEARCH_LIMIT,
      offset: 0,
      market: 'US',
      id: ' '
    };

    var url = BASE_URL+'search';
    relatedArtists = [];
    $.get(url, oData)
      .pipe(function(data) {
        getRelatedByID(data.artists.items[0].id);
      });
  }
// ajax call 2: using the artist ID, get 3 related artists
  function getRelatedByID(id) {
    $.get(BASE_URL+'artists/'+id+'/related-artists')
      .pipe(function(data){
          storeArtists(trimResults(data.artists));
      });
  }

function trimResults(artists) {
  if (artists.length > RELATED_LIMIT) {
   artists = artists.slice(0, RELATED_LIMIT);
  }
  return artists;
}

function storeArtists(artists) {
  for (var i = artists.length - 1; i >= 0; i--) {

    var artist = {
      id: artists[i].id,
      name: artists[i].name,
      image: artists[i].images[0],
      link: artists[i].uri,
      albums: []
    };

    relatedArtists.push(artist);
  }

  for (var x = 0; x <20; x ++){
    getArtistAlbums(relatedArtists[x]);
  }
}

function getArtistAlbums(artist) {
  var oData = {
    offset: 0,
    limit: 20,
    album_type: 'album'
  };

  var url = BASE_URL+'artists/'+artist.id+'/albums';
   $.get(url, oData)
    .pipe(function(data){
      artist.albums = addAlbumData(data);
    });
}

function addAlbumData(albums){
  var albumData = [];

  for (var n = albums.items.length - 1; n >= 0; n--) {

    var album = {
      id: albums.items[n].id,
      name: albums.items[n].name,
      image: albums.items[n].images[0].url,
      link: albums.items[n].uri
    };
    albumData.push(album);
  }
  return albumData;
}

// render the search results (artist & album object) to html:
function renderSearchResults(response) {
  $('#relatedArtistsResults').html("");
  for (var i = 0; i < response.length; i++) {
$('#relatedArtistsResults').append('<li class="artist"><div class="col s12 m12 l6"><div class="card"><div class="card-image"><img src="'+response[i].albums[0].image+'" /></div><div class="card-action"><ul><li><a href="'+response[i].albums[0].link+'" class="album-title">'+response[i].albums[0].name+'</a></li><li><a href="'+response[i].link+'" class="artist-name">'+response[i].name+'</a></li></ul></div></div></div></li>');
  }
}


//waypoints sticky search

var sticky = new Waypoint.Sticky({
  element: $('.searchArtists')[0]
});




