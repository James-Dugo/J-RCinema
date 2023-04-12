from flask import Blueprint, redirect, render_template, request, flash, jsonify, url_for
from flask_login import login_required, current_user
from .models import Movie
from .tmdbRequester import newMovie, searchForMovie, detailsForMovie
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html", user=current_user)

@views.route('/movies')
def movies():
    movies=Movie.query.all()
    return render_template("movies.html",user=current_user, movies=movies)

@views.route('/reset')
@login_required
def reset():
    db.drop_all()
    db.create_all()

@views.route("/admin/new-movie", methods=["GET", "POST"])
@login_required
def new_movie():
    if request.method == "POST":
        query=request.form.get("title")
        response = searchForMovie(query)
        return render_template("confirmation.html", response=response, user=current_user)
    return render_template("tmdb-request.html", user=current_user)

@views.route("/admin/new-movie/", methods=["GET","POST"])
@login_required
def movie_confirmed():
    movie=detailsForMovie(request.args.get("id"))
    if "success" in movie:
        flash("something went wrong",category="error")
    else:
        my_movie=newMovie(movie)
        db.session.add(my_movie)
        db.session.commit()
        flash(f'{movie["original_title"]} added successfully',category="success")
    return redirect(url_for("views.new_movie"))

@views.route("/test-movie", methods=["GET", "POST"])
@login_required
def test_movie():
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