from google.appengine.ext import ndb


class Comment(ndb.Model):
    user = ndb.KeyProperty(kind="User")
    post = ndb.KeyProperty(kind="Post")
    content = ndb.StringProperty(required=True)
    date = ndb.DateProperty(auto_now_add=True)

    @classmethod
    def by_id(cls, comment_id):
        return Comment.get_by_id(comment_id)
