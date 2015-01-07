<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
  <title>Spotify Artist Discovery</title>
  <link href="http://fonts.googleapis.com/css?family=PT+Sans:400,700" rel="stylesheet">
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection">
  
  <style>
  
a {
  color: #84bd00;
  text-decoration: none;
}
a:hover{
  text-decoration: none;
}

.icon-block {
  padding: 0 15px;
}

.row {
  border: 0px solid green;
}




.card.small {
  height: 150px;
  position: relative;
  margin-top: 10px;
}

.card.small .card-image {
  overflow: hidden;
  height: 100px;
  max-height: 100px;
}

.card.small .card-content {
  overflow: hidden;
  height: 50px;
  line-height: 15px;
  padding: 5px;
  padding-top: 15px;
}

.card.small .card-content .card-title  {
  font-size: 13px;
  font-weight: normal;
  line-height: 6px;
}

input[type=text], input[type=password], input[type=email], input[type=date], textarea {
  border: 1px solid #ebedf2;
  border-radius: 4px;
}

.input-field label {
  padding-left: 5px;
}



.card .card-reveal {
  width: 100%;
}

.card .card-image {
  height: 200px;
}

.border-bottom {
  border-bottom: 3px solid #84bd00;
  height: 30px;
}
.border-right {
  border-right: 3px solid #84bd00;
  height: 30px;
}
.border-top {
  border-top: 3px solid #84bd00;
  height: 30px;
}
.border-left {
  border-left: 3px solid #84bd00;
  height: 30px;
}


.row-no-bottom-margin {
  margin-bottom: 0;
}

.row:before, .row:after {
  display: table;
  content: " ";
}

.spotifynav {
  background-color: rgba(0,0,0,0.9) !important;
  margin-bottom: 50px;
} 

nav .brand-logo {
  font-size: 1.8rem;
  color: #84bd00;
  font-weight: bolder;
  text-decoration: none;
}

nav ul li:hover, nav ul li.active {
  background-color: #84bd00;
  text-decoration: none;
}



html, body {
  font-family: 'PT Sans', sans-serif;
}

.spotify-green {
  background-color: rgba(0,0,0,0.9) !important;
}



.footer-copyright-spotify {
  line-height: 20px;
  background-color: #84bd00;
}


.mdi-action-info {
  color: #84bd00;
  font-size: 44px;

}

</style>

</head>
<body>






  <nav class="spotifynav" role="navigation">
    <div class="container">
      <div class="nav-wrapper"><img height="40" style="margin-top: 10px; margin-right: 10px;" src="images/logo-navbar.png"><a id="logo-container" href="#" class="brand-logo">Artist Discovery</a>
        <ul id="nav-mobile" class="right side-nav">
          <li><a href="#">Navbar Link</a></li>
          <li><a class="waves-effect waves-light modal-trigger" href="#ajaxmodal">Ajax Log</a></li>
        </ul><a href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
      </div>
    </div>
  </nav>


  <div class="section no-pad-bot" id="index-banner">
    <div class="container">
      <div class="row row-no-bottom-margin">
        <div class="input-field col s6">
          <i class="mdi-av-my-library-music prefix"></i>
          <input id="txtArtistSearch" type="text">
          <label for="txtArtistSearch">Enter An Artist's Name</label>
        </div>
        <div class="col s6">
           <button type="button" class="btn btn-primary" id="btnsearchartists">
            Search For Artists
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
           <ul id="searchresults"></ul>
        </div>
      </div>
      <div id="spotifyresults">    
      <!--template data populated from API call will be inserted here-->
      </div>
    </div>
  </div>

  
  <!--
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    
    -->

<!-- Ajax Modal -->
  <div id="ajaxmodal" class="modal">
    <h4>Log Of Ajax Calls</h4>
    <p id="ajaxlog"></p>
    <a href="#" class="waves-effect btn-flat modal-close">Close</a>
  </div>

  
<script id="relatedartisttemplate" type="text/x-jquery-tmpl">
  <div class="col m2">
    <div class="card small">
      <div class="card-image">
       <img src="${images[1].url}">
      </div>
      <div class="card-content">
        <span class="card-title grey-text text-darken-4">${name}</span>
      </div>
    </div>        
  </div>
</script>
        
  <script id="selectedartisttemplate" type="text/x-jquery-tmpl">
     <div class="row row-no-bottom-margin" style="margin-bottom: 0; padding-bottom: 0;">
        <div class="col s4">&nbsp;</div>     
        <div class="col s4">
          <div class="card">
              <div class="card-image waves-effect waves-block waves-light"><img src="${images[0].url}"></div>
              <div class="card-content"><span class="card-title activator grey-text text-darken-4">${name} <i class="mdi-action-info right"></i></span></div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${name} <i class="mdi-navigation-close right"></i></span>
                <p>ID: ${id}</p>
                <p>Popularity: ${popularity}</p>
                <p><a href="${href}" target="_blank">Spotify Link</a></p>
              </div>
          </div>
       </div>
        <div class="col s4">&nbsp;</div>        
      </div>
      <div class="row row-no-bottom-margin">
        <div class="col s6 offset-s6 border-left" style="height: 50px;"></div>      
      </div>      
      <div class="row row-no-bottom-margin">
        <div class="col s1 border-right"></div>
        <div class="col s1 border-top"></div> 
        <div class="col s1 border-top border-right"></div>
        <div class="col s1 border-top"></div>
        <div class="col s1 border-top border-right"></div> 
        <div class="col s1 border-top"></div>
        <div class="col s1 border-top border-right"></div>
        <div class="col s1 border-top"></div> 
        <div class="col s1 border-top border-right"></div>
        <div class="col s1 border-top"></div>
        <div class="col s1 border-top border-right"></div> 
        <div class="col s1"></div>        
      </div>        
      
       <div class="row" id="relatedartists"> 
      

      </div>
      <!--
      <div class="row row-no-bottom-margin">
        <div class="col s1 border-right"></div>
        <div class="col s1"></div> 
        <div class="col s1 border-right"></div>
        <div class="col s1"></div>
        <div class="col s1 border-right"></div> 
        <div class="col s1"></div>
        <div class="col s1 border-right"></div>
        <div class="col s1"></div> 
        <div class="col s1 border-right"></div>
        <div class="col s1"></div>
        <div class="col s1 border-right"></div> 
        <div class="col s1"></div>        
      </div>
      -->
      <div class="row" id="subrelated">
        <div class="col s2" id="subrelated-0"></div> 
        <div class="col s2" id="subrelated-1"></div>
        <div class="col s2" id="subrelated-2"></div>
        <div class="col s2" id="subrelated-3"></div>
        <div class="col s2" id="subrelated-4"></div>
        <div class="col s2" id="subrelated-5"></div>
      </div>   
  </script>




<br><br><br><br><br>
<br><br><br><br><br>

  <footer class="spotify-green">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Company Bio</h5>
          <p class="grey-text text-lighten-4">asdf</p>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Settings</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Connect</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright-spotify">
      <div class="container">
      &nbsp;
      </div>
    </div>
  </footer>

  <!--  Scripts-->
  <script src="src/vendors/jquery/dist/jquery.min.js"></script>
  <script src="src/vendors/materialize/dist/js/materialize.min.js"></script>
  <script src="src/vendors/jquerytemplate/jquery.tmpl.min.js"></script>
  <script src="src/js/main.js"></script>
  <script>



  </script>

  </body>
</html>
