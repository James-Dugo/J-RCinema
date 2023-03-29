from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(256))
    watched_movies = db.relationship("Movie")

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300))
    year = db.Column(db.Integer)
    genre = db.Column(db.String(60))
    ratings = db.relationship("Rating")
    average_rating = db.Column(db.Float)
    poster = db.Column(db.String(100))
    synopsis = db.Column(db.String(10000))

class Rating(db.Model):
    movie_id = db.Column(db.Integer, db.ForeignKey("movie.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    rating = db.Column(db.Integer)


