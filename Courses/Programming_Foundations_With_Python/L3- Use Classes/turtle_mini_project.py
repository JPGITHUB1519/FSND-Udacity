import turtle

window = turtle.Screen()
window.bgcolor("red")
# Draw J
jeanJ = turtle.Turtle()
jeanJ.forward(90)
jeanJ.left(90)
jeanJ.forward(120)
jeanJ.left(90)
jeanJ.forward(70)
jeanJ.backward(140)

# Draw P
jeanP = turtle.Turtle()
jeanP.setx(200)
# jeanP.color("red")
# jeanP.forward(200)
# jeanP.color("black")
jeanP.left(90)
jeanP.forward(120)
jeanP.right(90)
jeanP.forward(100)
jeanP.right(90)
jeanP.forward(70)
jeanP.right(90)
jeanP.forward(100)

window.exitonclick()