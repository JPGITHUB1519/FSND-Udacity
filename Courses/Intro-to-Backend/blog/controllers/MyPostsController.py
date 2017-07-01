from BasicController import Handler
from models.Post import Post
from decorators import login_required


class MyPostsHandler(Handler):

    def index(self):
        posts = list(Post.query())
        self.render("myposts.html", posts=posts)
