from google.appengine.ext import ndb


class Quote(ndb.Model):
    text = ndb.StringProperty(required=True)
    author = ndb.StringProperty(required=True)
    date = ndb.DateProperty(auto_now_add=True)
