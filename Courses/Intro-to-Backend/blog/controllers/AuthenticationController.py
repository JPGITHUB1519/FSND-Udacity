import re
from utils import make_password_hash
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
        confirm_password = self.request.get('confirm_password')
        error_username = ""
        error_password = ""
        error_email = ""
        error_confirm_password = ""
        cond_error = False

        if not self.validate_user(username):
            error_username = "That's not a valid Username papush :V"
            cond_error = True

        if not self.validate_password(password):
            error_password = "That's not a valid Password papush :V"
            cond_error = True
        else:
            if(password != confirm_password):
                error_confirm_password = "The Password Must be equals papush :V"
                cond_error = True

        if email:
            if not self.validate_email(email):
                error_email = "That's not a valid Email Papush"

        if cond_error:
            self.render('signup.html', username=username, email=email, error_username=error_username,
                        error_password=error_password, error_confirm_password=error_confirm_password, error_email=error_email)
        else:
            user = User(username=username, password=make_password_hash(
                username, password), email=email)
            user.put()
            self.login(user)
            self.redirect('/welcome')

    def welcome(self):
        self.write('Welcome')
