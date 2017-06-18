#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import webapp2
import jinja2


class Handler(webapp2.RequestHandler):

    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))


class MainHandler(webapp2.RequestHandler):

    def get(self):
        self.response.write('Hello world!')


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    # ('/test', 'controllers.QuotesController.QuotesHandler'),
    webapp2.Route('/quotes', handler="controllers.QuotesController.QuotesHandler",
                  handler_method="index", methods=['GET']),

    # create and store and in the same method to force webapp2 to be a little
    # like resful controllers
    webapp2.Route('/quotes/create', handler="controllers.QuotesController.QuotesHandler",
                  handler_method="create", methods=['GET']),

    webapp2.Route('/quotes/create', handler="controllers.QuotesController.QuotesHandler",
                  handler_method="store", methods=['POST']),

    webapp2.Route('/test', handler="controllers.TestController.TestHandler",
                  handler_method="index", methods=['GET'])
], debug=True)
