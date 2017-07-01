from BasicController import Handler
from models.Post import Post
from models.User import User
from decorators import login_required


class MyPostsHandler(Handler):

    @login_required
    def index(self):
        """ 
        Shows the List of the logged in Users
        """
        posts = User.get_posts_by_user(self.user.key)
        self.render("myposts.html", posts=posts)
