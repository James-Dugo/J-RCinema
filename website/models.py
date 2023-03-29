from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(256))
    data = db.relationship("Data")

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300))
    year = db.Column(db.Integer)
    genre = db.Column(db.String(60))
    ratings = db.relationship("Data")
    average_rating = db.Column(db.Float)
    poster = db.Column(db.String(100))
    synopsis = db.Column(db.String(10000))

class Data(db.Model):
    movie_id = db.Column(db.Integer, db.ForeignKey("movie.id"),primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"),primary_key=True)
    rating = db.Column(db.Integer)
    watched = db.Column(db.Boolean)


