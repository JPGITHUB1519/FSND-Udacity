from google.appengine.ext import ndb
from models.Post import Post


class User(ndb.Model):
    username = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)
    email = ndb.StringProperty()

    @classmethod
    def by_id(cls, user_id):
        return User.get_by_id(user_id)

    @classmethod
    def by_name(cls, username):
        return User.query(User.username == username).get()

    @classmethod
    def get_posts_by_user(cls, user_key):
        return list(Post.query(Post.user == user_key))
