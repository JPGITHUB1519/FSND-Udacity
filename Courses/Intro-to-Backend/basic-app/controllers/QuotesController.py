from BasicController import Handler
from models.Quote import Quote


class QuotesHandler(Handler):

    def get(self):
        self.write("klk")

    def index(self):
        self.render("home.html", quotes=list(Quote().query()))

    def create(self):
        self.render("quotes_create.html")

    def store(self):
        text = self.request.get('text')
        author = self.request.get('author')
        error_text = ""
        error_author = ""
        cond_error = False

        if not text:
            error_text = "You Must fill the Text"
            cond_error = True

        if not author:
            error_author = "You must fill the Autor"
            cond_error = True

        if not cond_error:
            quote = Quote(text=text, author=author)
            quote.put()
            self.redirect('/quotes')

        self.render("quotes_create.html", error_text=error_text,
                    error_author=error_author)
