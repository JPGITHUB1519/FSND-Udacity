import logging
import time
from google.appengine.ext import ndb
from google.appengine.api import memcache
from BasicController import Handler
from models.Post import Post
from models.Comment import Comment
from models.Like import Like
from decorators import login_required


class BlogHandler(Handler):

    def index(self):
        self.render("home.html", posts=list(Post().query()), user=self.user)

    def show(self, post_id):
        post = Post.get_by_id(int(post_id))
        if post:
            # comment = Comment(user=self.user.key, post=post.key,
            #                   content="Tester Comment")
            # comment.put()
            comments = Comment.query(Comment.post == post.key).fetch()
            # memcache.flush_all()
            if self.user:
                like = Like.query(
                    ndb.AND(Like.user == self.user.key, Like.post == post.key)).get()
            else:
                like = None
            self.render("post_permalink.html", post=post,
                        comments=comments, like=like, user=self.user)
        else:
            self.render("post_notfound.html")

    @login_required
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
            post = Post(subject=subject, content=content, user=self.user.key)
            post.put()
            self.redirect('/blog/%s' % post.key.id())

        self.render("post_create.html", subject=subject, content=content, error_subject=error_subject,
                    error_content=error_content)

    @login_required
    def edit(self, post_id):
        post = Post.by_id(int(post_id))
        if post:
            if post.user == self.user.key:
                self.render("post_update.html", post=post)
            else:
                self.render(
                    "error.html", message="You only can edit your posts")
        else:
            self.render("404.html")

    def update(self, post_id):
        post = Post.by_id(int(post_id))
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
            post.subject = subject
            post.content = content
            post.put()
            self.redirect('/blog/%s' % post.key.id())
        else:
            self.render("post_update.html", post=post, user=self.user, error_subject=error_subject,
                        error_content=error_content, subject=subject)

    def destroy(self, post_id):
        post = Post.by_id(int(post_id))
        if post:
            if post.user == self.user.key:
                post.key.delete()
                self.redirect("/blog")
            else:
                self.render(
                    "error.html", message="You only can delete your posts")
        else:
            self.render("404.html")

    def like(self, post_id):
        post = Post.by_id(int(post_id))
        like = Like.query(
            ndb.AND(Like.user == self.user.key, Like.post == post.key)).get()
        if like:
            like.key.delete()
            post.likes = post.likes - 1
            post.put()
        else:
            like = Like(user=self.user.key, post=post.key)
            like.put()
            post.likes = post.likes + 1
            post.put()
        # memcache problem fix
        time.sleep(0.1)
        self.redirect('/blog/%s' % post_id)
