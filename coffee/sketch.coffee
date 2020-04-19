level = 0

active = 0

class Ball
	constructor : (@radie, @x, @y, @col) ->
		@active = true
	rita : ->
		if not @active then return 
		fill @col
		circle @x,@y,@radie
	inside : (mx,my) -> dist(@x,@y,mx,my) < @radie

balls = []

reset = () ->
	level++
	balls = []
	for i in range level
		createBall i

setup = ->
	createCanvas windowWidth,windowHeight
	reset()

draw = ->
	bg 0
	for ball in balls
		ball.rita()

mousePressed = ->
	if active==0
		reset()
	else
		for ball in balls
			if ball.inside mouseX,mouseY 
				ball.active = false
				active--

createBall = (i) ->
	active++
	x = random width
	y = random height
	
	radie = windowWidth/4
	col = "#f008 #0f08 #00f8".split ' '
	balls.push new Ball radie,x,y,col[i]