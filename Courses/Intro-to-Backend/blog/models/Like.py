from google.appengine.ext import ndb


class Like(ndb.Model):
    user = ndb.KeyProperty(kind="User")
    post = ndb.KeyProperty(kind="Post")
