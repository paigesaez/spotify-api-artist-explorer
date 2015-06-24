
  var BASE_URL = 'https://api.spotify.com/v1/';
  var SEARCH_LIMIT = 1;
  var RELATED_LIMIT = 3;
  var $searchResults = $('#searchresults');
  var $selectedArtistTemplate = $('#selectedartisttemplate');
  var $relatedArtistTemplate = $('#relatedartisttemplate');
  var $spotifyResults = $('#spotifyresults');
  var searchResultData = {};
  var relatedArtists = [];

  $('#btnsearchartists').on('click', function(e) {
    // console.log( $('#txtArtistSearch') );
    var query = $('#txtArtistSearch').val();
    if (query.length > 2) {
      $searchResults.html('');
      searchArtists(query);
    }
  });


  $('body').on('click', '.artist', function(e) {
    e.preventDefault();
    selectedIndex = $(this).attr('data-selected-index');
    selectedID = $(this).attr('href');
    selectedArtistData = searchResultData.artists.items[selectedIndex];
    console.log('passed to template1: ', selectedArtistData);
    var $renderedTemplate = $selectedArtistTemplate.tmpl(selectedArtistData);
    console.log('renderedTemplate: ', $renderedTemplate);
    $spotifyResults.html($renderedTemplate);
    getRelatedByID(selectedID);
    $('#searchcard').addClass('hidden');
    $('#hiddenrow').removeClass('hidden').addClass('animated bounceInDown');
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
    // return $.get(url, oData);
    $.get(url, oData)
    //pass the artist ID to getRelatedByID
      .pipe(function(data) {
        console.log("data...");
        console.log(data.artists.items[0].id);
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

  for (var x = 0; x < 3; x ++){
    getArtistAlbums(relatedArtists[x]);
  }
}

function getArtistAlbums(artist) {
  var oData = {
    offset: 0,
    limit: 3,
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


// // render the artists object to html:

  function renderSearchResults(response) {
//look to his example on github


 var ul = $('<ul>');

 for (var i = artists.length - 1; i >= 0; i--) {

  var li = $('<li>').addClass('artist').append(artists[i]);
   ul.append(li);
  }

 $('#searchResults').append(ul);



   }



//        result += '<li>Artist Image</li><li><a class="artist" data-selected-index="'+i+'" data-artist-name="'+artistName+'" href="'+artistID+'">'+artistName+'</a></li>';

//       //print artists and their albums

//         result +='<li><a class="albumName" data-selected-index="'+i+'" data-album-name="'+albumName+'" href="'+spotifyLink+'">'+albumName+'</a></li><li><a class="albumArt" data-selected-index="'+i+'" data-album-art="'+albumArt+'" href="'+spotifyLink+'">'+albumArt+'</a></li><li><a class="playableLink" data-selected-index="'+i+'" data-playable-link="'+playableLink+'" href="'+playableLink+'">'+playableLink+'</a></li>';
//       }


//     }
//     $searchResults.html(result);
// }


//   function renderRelatedTemplate(relatedArtists) {
//     console.log('relatedArtists: ', relatedArtists);
//     console.log('passed to template2: ', relatedArtists.artists);
//     var $renderedTemplate = $relatedArtistTemplate.tmpl(relatedArtists.artists);
//     console.log('renderedTemplate: ', $renderedTemplate);
//     $('#relatedartists').html($renderedTemplate);
//   }




// function justDisplayResponse(response) {
//   console.log('response: ', response);
// }
