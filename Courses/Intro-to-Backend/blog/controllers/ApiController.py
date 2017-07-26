import json
import logging
from myJsonEncoder import MyJsonEncoder
from BasicController import Handler
from models.User import User
from models.Post import Post
from models.Comment import Comment


class ApiHandler(Handler):
    ##### Post Enpoints  #####

    def post_index(self):
        """ Get all Posts """
        self.response.headers['Content-Type'] = 'application/json'
        self.write(Post.query().fetch())
        # self.response.out.write(json.dumps(post.to_dict()
        #                                    for p in Post.query().fetch()))

    def post_show(self, post_id):
        """
        Get a post by id
        """
        self.response.headers['Content-Type'] = 'application/json'
        post = Post.by_id(int(post_id))
        if post:
            post = post.to_dict()
            # fixing not serializable json data
            # post["date"] = str(post["date"])
            # post["user"] = post["user"].id()
            response = json.dumps(post, cls=MyJsonEncoder)
        else:
            response = json.dumps({})
        self.response.out.write(response)

    def post_update(self, post_id):
        self.response.headers['Content-Type'] = 'application/json'
        subject = self.request.get("subject")
        content = self.request.get("content")
        post = Post.by_id(int(post_id))
        post.subject = subject
        post.content = content
        post.put()
        response = {"status": "success"}
        self.response.write(json.dumps(response))

    def post_destroy(self, post_id):
        self.response.headers['Content-Type'] = 'application/json'
        try:
            post = Post.by_id(int(post_id))
            post.key.delete()
            response = {"status": "success", "data": post.key.id()}
        except:
            response = {"status": "fail", "data": None}
        self.response.write(json.dumps(response))

    def post_http_wrapper(self, *args):
        """
        This method is used to mimic PUT and Delete Methods
        """
        method = self.request.get("_method")
        if method == "post":
            pass
        elif method == "put" or method == "patch":
            self.post_update(*args)
        elif method == "delete":
            self.post_destroy(*args)
        else:
            self.error(405)

    def comments_index(self, post_id):
        """ Get all Comments """
        self.response.headers['Content-Type'] = 'application/json'
        post = Post.get_by_id(int(post_id))
        if post:
            comments = Comment.query(Comment.post == post.key).fetch()
        if comments:
            self.write(json.dumps(
                [comment.to_dict() for comment in comments], cls=MyJsonEncoder))
        else:
            self.writeson.dumps({""})

    def comments_create(self):
        self.response.headers['Content-Type'] = 'application/json'
        content = self.request.get('content')
        user = User.by_id(int(self.request.get('user_id')))
        post = Post.by_id(int(self.request.get('post_id')))
        comment = Comment(content=content, user=user.key, post=post.key)
        comment.put()
        response = json.dumps(comment.to_dict(), cls=MyJsonEncoder)
        self.write(response)

    def comments_delete(self, comment_id):
        self.response.headers['Content-Type'] = 'application/json'
        comment = Comment.by_id(int(comment_id))
        comment.delete()
        response = {"status": "ok"}
        self.write(json.dumps(response))
