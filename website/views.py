from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Movie
from . import db
import json

views = Blueprint('views', __name__)

@views.route('/')
@login_required
def home():
    return render_template("home.html", user=current_user)

@views.route('/reset')
@login_required
def reset():
    db.drop_all()
    db.create_all()


@views.route('/delete-movie', methods=['POST'])
def delete_movie():
    movie = json.loads(request.data)
    movieId = movie['movieId']
    movie = Movie.query.get(movieId)
    if movie:
        db.session.delete(movie)
        db.session.commit()

    return jsonify({})