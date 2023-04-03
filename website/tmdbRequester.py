import requests, json
from .models import Movie

API_KEY = '2d1262e8082bfa0f8f1c9549cd9cd028'
BASE_MOVIE_SEARCH = f'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&query='
BASE_MOVIE_API="https://api.themoviedb.org/3/movie/"
CONFIG_API=f'https://api.themoviedb.org/3/configuration?api_key={API_KEY}'

#may need verification for malformed queries
def searchForMovie(query):
    url=BASE_MOVIE_SEARCH+query
    reply=requests.get(url).json()
    if reply:
        movie=reply['results'][0]
        movie_details=detailsForMovie(movie)
    return movie_details

def detailsForMovie(movie):
    id= str(movie["id"])
    url=BASE_MOVIE_API+id+f'?api_key={API_KEY}&language=en-US'
    reply=requests.get(url).json()
    if reply:
        movie=reply
    return movie

test_movie=searchForMovie("The Godfather")
print(test_movie)

def newMovie(tmdbMovie):
    genreStr=""
    flag=True
    for data in tmdbMovie["genres"]:
        if flag:
            flag=False
        else:
            genreStr.append(", ")

        genreStr.append(data["name"])

    #poster handling section

    movie=Movie(title=tmdbMovie["title"],
                year=tmdbMovie["release_date"].split('-')[0],
                genre=genreStr,
                )

    return movie