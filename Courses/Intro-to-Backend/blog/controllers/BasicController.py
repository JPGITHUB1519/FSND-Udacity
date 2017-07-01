import webapp2
import os
import jinja2
import logging
from utils import make_secure_val, check_secure_val
from models.User import User
from decorators import login_required

template_dir = os.path.join(os.path.dirname(__file__), '../templates')
jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(template_dir), autoescape=True)


class Handler(webapp2.RequestHandler):

    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        # using user as a global variable to use in all templates
        self.write(self.render_str(template, **dict(kw, user=self.user)))

    def login(self, user):
        self.response.set_cookie(
            "user_id", make_secure_val(str(user.key.id())))

    def get_cookie_value(self, name):
        """
        Get the Value of a cookie
        """
        cookie_value = self.request.cookies.get(name)
        return cookie_value

    def initialize(self, *a, **kw):
        """
        This is called everytime we make a request
        """
        webapp2.RequestHandler.initialize(self, *a, **kw)
        user_cookie_value = self.get_cookie_value('user_id')
        if user_cookie_value:
            if check_secure_val(user_cookie_value):
                aux = user_cookie_value.split('|')
                id = aux[0]
                user = User.get_by_id(int(id))
                self.user = user
                # logging.error(self.user)
            else:
                self.user = None
        else:
            self.user = None

    def login_required(handler_method):
        def check_login(self, *args):
            if self.request.method != 'GET':
                raise webapp.error(
                    'The check_login decorator can only be used for GET request')

            if not self.user:
                self.redirect('/login')
            else:
                handler_method(self, *args)

        return check_login
