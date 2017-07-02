from google.appengine.ext import ndb


class Post(ndb.Model):
    subject = ndb.StringProperty(required=True)
    content = ndb.StringProperty(required=True)
    date = ndb.DateProperty(auto_now_add=True)
    user = ndb.KeyProperty(kind='User')

    @classmethod
    def by_id(cls, post_id):
        return Post.get_by_id(post_id)
