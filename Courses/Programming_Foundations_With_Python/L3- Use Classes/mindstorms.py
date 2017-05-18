import turtle

def draw_square(some_turtle):
	# Draws a square
	for i in range(0,4):
		some_turtle.forward(100)
		some_turtle.left(90)

def draw_triangle(some_turtle):	
	for i in range(0,3):
		some_turtle.forward(100)
		some_turtle.left(120)

def draw_art():
	brad = turtle.Turtle()
	brad.shape("turtle")
	brad.color("white")
	brad.speed(10)
	for i in range(0,37):
		draw_square(brad)
		brad.right(10)
	# # Draw a circle
	# angie = turtle.Turtle()
	# angie.shape("arrow")
	# angie.circle(100)
	# angie.speed(10)
	# angie.color("blue")

	# # Draw a triangle
	# jean = turtle.Turtle()
	# jean.shape("circle")
	# jean.speed(10)

	#draw_triangle(jean)
	
window = turtle.Screen()
window.bgcolor("red")
draw_art()
window.exitonclick()