import os
import cgi
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
from jinja2 import Environment, FileSystemLoader, select_autoescape
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

### jinja config
config = {
	"directory": os.path.dirname(os.path.abspath(__file__)),
	"templates_dir": '/templates'
}

directory = os.path.dirname(os.path.abspath(__file__)) 
env = Environment(
		loader = FileSystemLoader(config["directory"] + config['templates_dir']),
		autoescape=select_autoescape('html', 'xml')
	)

### database config
engine = create_engine('sqlite:///restaurantmenu.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bing = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()

class webserverHandler(BaseHTTPRequestHandler):
	def render_str(self, template, **params):
		template = env.get_template(template)
		return template.render(params)
	def render(self, template, **kw):
		self.write(self.render_str(template, **kw))

	def write(self, element):
		self.wfile.write(element)

	def send_headers(self, request_type="get"):
		if request_type == "get":
			self.send_response(200)
		
		if request_type == "post":
			self.send_response(301)

		self.send_header('Content-Type', 'text/html')
		self.end_headers()

	def do_GET(self):
		try:
			if self.path.endswith('/test'):
				self.get_sent_headers()
				self.render("test.html", name="jean")
				return

			if self.path.endswith('/restaurants'):
				self.send_headers()
				restaurants = session.query(Restaurant).all()
				self.render('restaurants.html', restaurants=restaurants)
				return

			if self.path.endswith('/restaurants/create'):
				self.send_headers()
				self.render("restaurants_create.html")
				return

			if self.path.endswith('/restaurants/edit/*'):
				self.send_headers()
				self.write("hey")
				print self.path
				# restaurant = session.query(Restaurant).filter_by(id=id)
				# self.render("restaurants_edit.html")

		except IOError:
			self.send_error(404, "File not found %s" % self.path)

	
	def do_POST(self):
		try:
			if self.path.endswith("/restaurants/store"):
				self.send_headers("post")
				ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
				if ctype == 'multipart/form-data':
					# collect field from the form
					fields = cgi.parse_multipart(self.rfile, pdict)
					name = fields.get('name')
					restaurant = Restaurant(name=name[0])
					session.add(restaurant)
					session.commit()
					# redirect
					self.write("Restaurante Creado %s" % restaurant.name)

			if self.path.endswith('/restaurants/update'):
				pass
			
		except IOError:
			self.send_error(404, "File not found %s" % self.path)

		

def main():
	try:
		port = 8080
		server = HTTPServer(('', port), webserverHandler)
		print "Web Server Running on port %s" % port
		server.serve_forever()
	except KeyboardInterrupt:
		print "^C entered, stopping web server..."
		server.socket.close()

if __name__ == "__main__":
	main()