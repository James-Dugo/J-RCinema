from flask import flash, render_template
from flask_login import current_user
import requests, shutil
from .models import Movie
from PIL import Image

API_KEY = '2d1262e8082bfa0f8f1c9549cd9cd028'
BASE_MOVIE_SEARCH_URL = f'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&query='
BASE_MOVIE_API_URL="https://api.themoviedb.org/3/movie/"
CONFIG_API_URL=f'https://api.themoviedb.org/3/configuration?api_key={API_KEY}'

CONFIG=requests.get(CONFIG_API_URL).json()
SIZES=CONFIG["images"]["poster_sizes"]
DEFAULT_SIZE="w780"

#may need verification for queries
def searchForMovie(query):
    url=BASE_MOVIE_SEARCH_URL+query
    response=requests.get(url).json()
    if response:
        return  response

def detailsForMovie(id):
    url=BASE_MOVIE_API_URL+str(id)+f'?api_key={API_KEY}&language=en-US'
    response=requests.get(url).json()
    if response:
        movie=response
    return movie

def urlForPoster(poster_path,size):
    if size in SIZES:
        url=f'{CONFIG["images"]["secure_base_url"]}{size}/{poster_path}'
    else:
        url=f'{CONFIG["images"]["secure_base_url"]}w780/{poster_path}'
    return url

def filePathFor(title,size):
    if size in SIZES:
        image_path=f"/static/moviePosters/{size}/{title}.jpg"
    else:
        image_path=f"/static/moviePosters/w780/{title}.jpg"
    return image_path


def savePoster(url,file_path):
    """saves an image from the given url to the given filepath

    Args:
        url (str): the image url
        file_path (str): the local file directory
    """
    response = requests.get(url, stream=True)
    with open(file_path, 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    del response

def translateGenres(tmdb_movie):
    genre_string=""
    flag=True
    for data in tmdb_movie["genres"]:
        if flag:
            flag=False
        else:
            genre_string+=", "
        genre_string+=data["name"]
    return genre_string


def newMovie(tmdb_movie):

    tmdb_poster_path = urlForPoster(tmdb_movie["poster_path"],DEFAULT_SIZE)
    local_file_path = filePathFor(tmdb_movie["original_title"],DEFAULT_SIZE)
    savePoster(tmdb_poster_path,local_file_path)

    genre_string=translateGenres(tmdb_movie)

    movie=Movie(title=tmdb_movie["title"],
                year=tmdb_movie["release_date"].split('-')[0],
                genre=genre_string,
                poster=local_file_path,
                synopsis=tmdb_movie["overview"],
                watched=False
                )

    return movie