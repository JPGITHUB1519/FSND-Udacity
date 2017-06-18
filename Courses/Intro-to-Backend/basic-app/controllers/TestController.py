from BasicController import Handler


class TestHandler(Handler):

    def index(self):
        self.write("Basic Controller")
