COLORS = null
level = 0
active = 0
clicked = []

class Ball
	constructor : (@radie, @x, @y, @col) ->
		@active = true
	rita : ->
		if not @active then return 
		fill @col
		circle @x,@y,@radie
	inside : (mx,my) -> 
		if not @active then return false
		dist(@x,@y,mx,my) < @radie

balls = []

reset = (delta = 1) ->
	active = 0 
	balls = []
	clicked = []
	level += delta
	console.log 'reset',level
	if level < 1 then level = 1
	for i in range level
		createPair COLORS[i]
	console.log balls

createColors = ->
	result = []
	for r in '08f'
		for g in '08f'
			for b in '08f'
				result.push '#'+r+g+b+'8'
	result

setup = ->
	createCanvas windowWidth,windowHeight
	COLORS = createColors()
	reset 1

draw = ->
	bg 0.5
	for ball in balls
		ball.rita()
	fc 1
	textSize 16
	text "level #{level}", 100,25
	text "active #{active}", 100,50
	for ball,i in balls
		text JSON.stringify(ball),100,75+i*25

mousePressed = ->
	candidates = (ball for ball in balls when ball.inside mouseX,mouseY)
	if candidates.length != 1 
		reset -1
		return
	active--
	ball = candidates[0]
	ball.active = false
	clicked.push ball
	console.log "clicked.length #{clicked.length}"
	if clicked.length == 2
		if active == 0
			reset 1
			return
		if clicked[0].col != clicked[1].col
			reset -1
		clicked = []

overlap = (x,y) ->
	for ball in balls 
		if dist(ball.x,ball.y,x,y) < ball.radie then return true
	false
	
createPair = (col) ->
	radie = int windowWidth/(3+level)

	for j in range 2
		active++
		x = int random width
		y = int random height
		while overlap x,y
			x = int random width
			y = int random height
		balls.push new Ball radie,x,y,col