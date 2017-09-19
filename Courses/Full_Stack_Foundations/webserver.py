from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import cgi

class webserverHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		try:
			if self.path.endswith('/hello'):
				self.send_response(200)
				self.send_header('Content-Type', 'text/html')
				self.end_headers()

				output = ""

				output += """
				<html>
					<body>
						Hello
						<a href="/hello">Back to Hello</a>
				"""

				output += """
				<form method='post' enctype='multipart/form-data' action="/hello">
					<h2>What would you like me to say</h2>
					<input name='message' type='text'>
					<input type='submit' value='Submit'>
				</form>
				"""

				output += "</body></html>"

				self.wfile.write(output)
				print output
				return

			if self.path.endswith('/hola'):
				self.send_response(200)
				self.send_header('Content-Type', 'text/html')
				self.end_headers()

				output = ""

				output += """
				<html>
					<body>
						&#161Hola
						<a href="/hello">Back to Hello</a>
				"""

				output += """
				<form method='POST' enctype='multipart/form-data' action="/hello">
					<h2>What would you like me to say</h2>
					<input name='message' type='text'>
					<input type='submit' value='Submit'>
				</form>
				"""

				output += "</body></html>"

				self.wfile.write(output)
				print output
				return
		except IOError:
			self.send_error(404, "File not found %s" % self.path)

	def do_POST(self):
		try:
			self.send_response(301)
			self.send_header('Content-Type', 'text/html')
			self.end_headers()

			ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
			if ctype == 'multipart/form-data':
				# collect field from the form
				fields = cgi.parse_multipart(self.rfile, pdict)
				message_content = fields.get('message')

			output = """
			<html>
			<body>
				<h2>Okay, how about this: </h2>
				<h1>{0}</h1>
			""".format(message_content[0])

			output += """
			<form method='post' enctype='multipart/form-data' action="/hello">
				<h2>What would you like me to say</h2>
				<input name='message' type='text'>
				<input type='submit' value='Submit'>
			</form>
			"""
			output += "</body></html>"
			self.wfile.write(output)
			print output
		except:
			pass
def main():
	try:
		port = 8080
		server = HTTPServer(('', port), webserverHandler)
		print "Web Server Running on port %s" % port
		server.serve_forever()
	except KeyBoardInterrupt:
		print "^C entered, stopping web server..."
		server.socket.close()

if __name__ == "__main__":
	main()