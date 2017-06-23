import re
from utils import make_password_hash, valid_password
from BasicController import Handler
from models.User import User


class AuthenticationHandler(Handler):

    user_check = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")
    password_check = re.compile(r"^.{3,20}$")
    email_check = re.compile(r"^[\S]+@[\S]+.[\S]+$")

    # Helpers Functions
    # validates functions
    # validation variables
    def validate_user(self, usuario):
        return self.user_check.match(usuario)

    def validate_password(self, password):
        return self.password_check.match(password)

    def validate_email(self, email):
        return self.email_check.match(email)

    # Controllers Functions
    def signup_create(self):
        self.render('signup.html')

    def signup_store(self):
        username = self.request.get('username')
        password = self.request.get('password')
        email = self.request.get('email')
        verify = self.request.get('verify')
        error_user = ""
        error_password = ""
        error_email = ""
        error_verify = ""
        error_exits_user = ""
        cond_error = False

        user = User.query(User.username == username).get()
        if not user:
            if not self.validate_user(username):
                error_user = "That's not a valid Username papush :V"
                cond_error = True

            if not self.validate_password(password):
                error_password = "That's not a valid Password papush :V"
                cond_error = True
            else:
                if(password != verify):
                    error_verify = "The Password Must be equals papush :V"
                    cond_error = True

            if email:
                if not self.validate_email(email):
                    error_email = "That's not a valid Email Papush"
        else:
            cond_error = True
            error_user = "That's User Already Exits"

        if cond_error:
            self.render('signup.html', username=username, email=email, error_user=error_user,
                        error_password=error_password, error_verify=error_verify, error_email=error_email)
        else:
            user = User(username=username, password=make_password_hash(
                username, password), email=email)
            user.put()
            self.login(user)
            self.redirect('/welcome?username=' + user.username)

    def login_show(self):
        self.render("login.html")

    def login_store(self):
        username = self.request.get("username")
        password = self.request.get("password")
        error_login = ""
        cond_error = False
        user = User.query(
            User.username == username and User.password == password).get()

        if user:
            if valid_password(username, password, str(User.password)):
                self.login(user)
                self.redirect("/welcome?username" + user.username)
            else:
                cond_error = True
        else:
            cond_error = True

        if cond_error:
            error_login = "Invalid Login"
            self.render("login.html", error_login=error_login)

    def welcome(self):
        username = self.request.get("username")
        self.render('welcome.html', username=username)
