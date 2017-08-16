from BasicController import Handler
from models.Comment import Comment


class CommentHandler(Handler):

    def destroy(self, comment_id):
        comment = Comment.by_id(int(comment_id))
        if comment:
            comment.key.delete()
            self.redirect("/blog/%s" % comment.post.id())
        else:
            self.render("error.html", message="This Comment does not exists")
