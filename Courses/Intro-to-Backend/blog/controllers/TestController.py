from BasicController import Handler

from models.User import User


class TestHandler(Handler):

    def index(self):

        # cookie_value = self.request.cookies.get('number_visits')
        # if not(cookie_value):
        #     self.response.set_cookie('number_visits', '0')
        # else:
        #     if int(cookie_value) >= 1000:
        #         self.write("Congrats you are a super user")
        #     cookie_value = int(cookie_value) + 1
        #     self.response.set_cookie('number_visits', str(cookie_value))

        users = User.query(User.username ==
                           "isaias" and User.email == "isaias@gmail.com").get()

        self.write(users)
