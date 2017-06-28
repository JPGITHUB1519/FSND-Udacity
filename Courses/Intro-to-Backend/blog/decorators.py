import logging


def login_required(handler_method):
    """ For Handler Login Required Decorator.  Use this for page that needs be logging on """

    def check_login(self, *args):
        if self.request.method != 'GET':
            raise webapp.error(
                'The check_login decorator can only be used for GET request')
        if not self.user:
            self.redirect('/login')
        else:
            handler_method(self, *args)
    return check_login
