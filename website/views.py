from flask import Blueprint, render_template, request, flash, jsonify, url_for
from flask_login import login_required, current_user
from .models import Movie, User
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/')
def home():
    movies=Movie.query.all()
    if movies:
        return render_template("home.html", user=current_user, movies=movies)
    else:
        return render_template("home.html", user=current_user)

@views.route('/reset')
@login_required
def reset():
    db.drop_all()
    db.create_all()

@views.route("/add-movie", methods=["GET", "POST"])
@login_required
def add_movie():
    if request.method == "POST":
        title = request.form.get("title")
        year = request.form.get("year")
        genre = request.form.get("genre")
        poster = request.form.get("poster")
        synopsis = request.form.get("synopsis")
        new_movie = Movie(title=title, year=year, genre=genre,poster=poster,synopsis=synopsis)
        print(new_movie)
        db.session.add(new_movie)
        db.session.commit()
        print("title: "+title)
        print("year: "+year)
        print("genre: "+genre)
        print("poster: "+poster)
        print("synopsis: "+synopsis)
    return render_template("manual-movie-entry.html", user=current_user)

@views.route('/delete-movie', methods=['POST'])
def delete_movie():
    movie = json.loads(request.data)
    movieId = movie['movieId']
    movie = Movie.query.get(movieId)
    if movie:
        db.session.delete(movie)
        db.session.commit()

    return jsonify({})