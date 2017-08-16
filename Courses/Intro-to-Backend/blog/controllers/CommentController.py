import time
from BasicController import Handler
from models.Comment import Comment
from decorators import login_required


class CommentHandler(Handler):

    @login_required
    def edit(self, comment_id):
        comment = Comment.by_id(int(comment_id))
        if comment:
            if comment.user == self.user.key:
                self.render("comment_update.html", comment=comment)
            else:
                self.render(
                    "error.html", message="You only can edit your comments")
        else:
            self.render("404.html")

    def update(self, comment_id):
        comment = Comment.by_id(int(comment_id))
        content = self.request.get("content")
        error_content = ""
        cond_error = False
        if comment:
            if not content:
                error_content = "You must fill the content"
                cond_error = True

        if not cond_error:
            comment.content = content
            comment.put()
            time.sleep(0.1)
            self.redirect("/blog/%s" % comment.post.id())
        else:
            self.render("404.html")

    def destroy(self, comment_id):
        comment = Comment.by_id(int(comment_id))
        if comment:
            comment.key.delete()
            # forse to update the values on redirect
            time.sleep(0.1)
            self.redirect("/blog/%s" % comment.post.id())
        else:
            self.render("error.html", message="This Comment does not exists")
