import requests, json

API_KEY = '2d1262e8082bfa0f8f1c9549cd9cd028'
BASE_MOVIE_SEARCH = f'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&query='

# just takes the first result from tmdb for now
def searchForMovie(query):
    url=BASE_MOVIE_SEARCH+query
    reply=requests.get(url).json()
    if reply:
        movie=reply['results'][0]
    return movie
