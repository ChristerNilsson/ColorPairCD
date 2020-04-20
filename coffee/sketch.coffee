COLORS = null
level = 0
active = 0
balls = []
clicked = []

class Ball
	constructor : (@radie, @x, @y, @col) -> @active = true
	rita : ->
		if not @active then return 
		sc 1
		sw 4
		fill @col
		circle @x,@y,@radie
	inside : (mx,my) -> 
		if not @active then return false
		@radie > dist @x,@y,mx,my

reset = (delta = 1) ->
	COLORS = _.shuffle COLORS
	active = 0 
	balls = []
	clicked = []
	level += delta
	if level < 1 then level = 1
	for i in range level
		createPair COLORS[i]

createColors = (pattern) -> _.flatten ('#'+r+g+b+'8' for r in pattern for g in pattern for b in pattern)

setup = ->
	createCanvas windowWidth,windowHeight
	COLORS = createColors '05af' # 0f 08f 05af 58be 68ac
	reset 1

draw = ->
	bg 0.5
	for ball in balls
		ball.rita()

mousePressed = ->
	candidates = (ball for ball in balls when ball.inside mouseX,mouseY)
	if candidates.length != 1 then return reset -1
	active--
	ball = candidates[0]
	ball.active = false
	clicked.push ball
	if clicked.length == 2
		if active == 0 then return reset 1
		if clicked[0].col != clicked[1].col then reset -1
		clicked = []

overlap = (x,y) ->
	for ball in balls 
		if 0.5 * ball.radie > dist ball.x,ball.y,x,y then return true
	false

createPair = (col) ->
	radie = int 1.5 * windowWidth/(3+level)
	for j in range 2
		active++
		x = int random width
		y = int random height
		while overlap x,y
			x = int random width
			y = int random height
		balls.push new Ball radie,x,y,col