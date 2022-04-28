// Exploring URL Hashes
import { split_hash } from "./util.js"
import { homeView, movieListView, movieView } from "./views.js"

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
        console.log("allMovies: ",allMovies)
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

function getMoviesInSession (session) {
    let moviesInSession = []
    for(let i=0; i<allMovies.length;i++) {
        if (allMovies[i].attributes.offering === session){
            moviesInSession.push(allMovies[i])
        }
    }
    return moviesInSession
}

function buttonHandler(buttonid, movieType){
    let button=document.getElementById(buttonid)
    let data = []
    button.onclick = function () {
        if (movieType === 'S1' || movieType === 'S2'){
            data=getMoviesInSession(movieType)
        } else if (movieType === 'All'){
            data = getMovies()
        } else if (movieType === 'Sorted'){
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

// redraw is called whenever the page needs to be 
// updated, it calls the appropriate view function
const redraw = () => {

    const pathInfo = split_hash(window.location.hash)

    if (pathInfo.path === "movies") {
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


