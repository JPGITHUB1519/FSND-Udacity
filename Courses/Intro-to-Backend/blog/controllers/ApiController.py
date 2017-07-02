import json
from BasicController import Handler
from models.Post import Post


class ApiHandler(Handler):
    # Post Enpoints

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
        post = Post.by_id(int(post_id)).to_dict()
        # fixing not serializable json data
        post["date"] = str(post["date"])
        post["user"] = post["user"].id()
        self.response.out.write(json.dumps(post))

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
        post = Post.by_id(int(post_id))
        post.delete()
        response = {"status": "success", data: None}
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
