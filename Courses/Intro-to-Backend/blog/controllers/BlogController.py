from BasicController import Handler
from models.Post import Post


class BlogHandler(Handler):

    def index(self):
        self.render("home.html", posts=list(Post().query()))

    def show(self, post_id):
        post = Post.get_by_id(int(post_id))
        self.render("post_permalink.html", post=post)

    def create(self):
        self.render("post_create.html")

    def store(self):
        subject = self.request.get('subject')
        content = self.request.get('content')
        error_subject = ""
        error_content = ""
        cond_error = False

        if not subject:
            error_subject = "You must fill the Subject"
            cond_error = True

        if not content:
            error_content = "You must fill the Content"
            cond_error = True

        if not cond_error:
            post = Post(subject=subject, content=content)
            post.put()
            self.redirect('/blog/%s' % post.key.id())

        self.render("post_create.html", subject=subject, content=content, error_subject=error_subject,
                    error_content=error_content)
