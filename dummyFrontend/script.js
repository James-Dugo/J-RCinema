// Exploring URL Hashes
import { split_hash } from "./util.js"
import { homeView, addNewMovieView, movieListView, movieView } from "./views.js"

// allMovies is a global variable that will hold the array
// of Movies loaded from Strapi
let allMovies = []
const dbUrl = 'http://localhost:1337/api/movies?populate=*'

// loadData will load the data using fetch
// and call redraw() when it is ready
const loadData = () => {
    fetch(dbUrl)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        allMovies = data.data
        redraw()
    })
}

const getMovies = () => {
    return allMovies
}

const getMovie = (movieId) => {
    return allMovies.find(movie => movie.id == movieId)
}

function sortMovies() {
    let sortedMovies=[]
    sortedMovies=[...allMovies].sort((a, b) => a.attributes.enrolments-b.attributes.enrolments)
    return sortedMovies
}

function getMoviesWatched (flag) {
    let moviesWatched = []
    for(let i=0; i<allMovies.length;i++) {
        if (allMovies[i].attributes.watched&flag){
            moviesWatched.push(allMovies[i])
        } else{
            moviesWatched.push(allMovies[i])
        }
    }
    return movieWatched
}

function buttonHandler(buttonid, buttonType){
    let button=document.getElementById(buttonid)
    let data = []
    button.onclick = function () {
        if (buttonType === 'Watched' || buttonType === 'S2'){
            data = getMoviesInSession(buttonType)
        } else if (buttonType === 'All'){
            data = getMovies()
        } else if (buttonType === 'Sorted'){
            data = sortMovies()
        }
        movieListView('content', data)
        bindings()
    }
}

function bindings(){
    buttonHandler('action1','S1')
    buttonHandler('action2','S2')
    buttonHandler('action3','All')
    buttonHandler('action4','Sorted')
}

const btn = document.querySelector('button');

function sendData( data ) {
  console.log( 'Sending data' );

  const XHR = new XMLHttpRequest();

  let urlEncodedData = "",
      urlEncodedDataPairs = [],
      name;

  // Turn the data object into an array of URL-encoded key/value pairs.
  for( name in data ) {
    urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behavior of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

  // Define what happens on successful data submission
  XHR.addEventListener( 'load', function(event) {
    alert( 'Yeah! Data sent and response loaded.' );
  } );

  // Define what happens in case of error
  XHR.addEventListener( 'error', function(event) {
    alert( 'Oops! Something went wrong.' );
  } );

  // Set up our request
  XHR.open( 'POST', 'https://example.com/cors.php' );

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

  // Finally, send our data.
  XHR.send( urlEncodedData );
}

btn.addEventListener( 'click', function() {
  sendData( allMovies[0] );
} )

// redraw is called whenever the page needs to be 
// updated, it calls the appropriate view function
const redraw = () => {

    const pathInfo = split_hash(window.location.hash)

    if (pathInfo.path === "movieform"){
        addNewMovieView('content')
    }else if (pathInfo.path === "movies") {
        if (pathInfo.id){
            const movie = getMovie(pathInfo.id)
            movieView('content',movie)
        } else{
            const bmovies = getMovies()
            movieListView('content', allMovies)
            bindings()
        }
    } else {
        homeView('content',allMovies)
    }

}

window.onload = loadData; 
window.onhashchange = redraw;


