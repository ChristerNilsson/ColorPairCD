COLORS = null
level = 0
active = 0
balls = []
clicked = []
radie = 0

range = _.range

newBall = (x,y,rgb) ->
	x : x
	y : y
	rgb : rgb
	active : true
	rita : ->
		if not @active then return
		stroke '#000'
		strokeWeight 4
		fill @rgb
		ellipse @x,@y,2*radie
	inside : (mx,my) ->
		if not @active then return false
		radie > dist @x,@y,mx,my

reset = (delta = 1) ->
	COLORS = _.shuffle COLORS
	active = 0
	balls = []
	clicked = []
	level += delta
	if level < 1 then level = 1
	for i in range level
		createPair COLORS[i]

createCOLORS = (pattern) ->
	# _.flatten ('#'+r+g+b+'8' for r in pattern for g in pattern for b in pattern)
	result = []
	for r in pattern
		for g in pattern
			for b in pattern
				result.push '#'+r+g+b+'8'
	result

setup = ->
	createCanvas windowWidth,windowHeight
	COLORS = createCOLORS '05af' # 0f 08f 05af 58be 68ac
	textSize 100
	textAlign CENTER,CENTER
	reset 1

draw = ->
	background '#fff'
	for ball in balls
		ball.rita()
	fill '#000'
	text level,width/2,height/2

mousePressed = ->
	candidates = (ball for ball in balls when ball.inside mouseX,mouseY)
	if candidates.length != 1 then return reset -1
	active--
	ball = candidates[0]
	ball.active = false
	clicked.push ball
	if clicked.length == 2
		if active == 0 then return reset 1
		if clicked[0].rgb != clicked[1].rgb then reset -1
		clicked = []

overlap = (x,y) ->
	for ball in balls
		if 0.5 * radie > dist ball.x,ball.y,x,y then return true
	false

createPair = (rgb) ->
	radie = int 1.5 * windowWidth/(3+level)
	for j in range 2
		active++
		loop
			x = int random width
			y = int random height
			break if not overlap x,y
		balls.push newBall x,y,rgb