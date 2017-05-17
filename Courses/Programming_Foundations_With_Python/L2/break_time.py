import webbrowser
import time

total_time = 3
cont = 0
print "This program started on: " + time.ctime()
while cont < total_time:
	time.sleep(1)
	webbrowser.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
	cont = cont + 1
