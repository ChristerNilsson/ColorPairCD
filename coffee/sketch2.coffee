balls = []
radie = 100
range = _.range
COLORS = "#f008 #00f8 #0f08 #ff08".split " " 
clicked = []
level = 0
active = 0

reset = (delta)->
	level += delta
	if level == 0 then level = 1
	balls = []
	clicked = []
	for i in range level
		x = int random width
		y = int random height
		balls.push {x:x, y:y, rgb:COLORS[i], active:true}
		x = int random width
		y = int random height
		balls.push {x:x, y:y, rgb:COLORS[i], active:true}
	active = balls.length

setup = ->
	createCanvas windowWidth, windowHeight
	radie = windowHeight/4
	reset 1

draw = ->
	background 255
	for ball in balls
		if ball.active
			fill ball.rgb
			ellipse ball.x,ball.y,radie*2
			fill 0
			textSize radie/5
			textAlign CENTER,CENTER
			text "#{ball.x} #{ball.y}\n#{ball.rgb}\n#{ball.active}",ball.x,ball.y

mousePressed = ->
	ballClicked = 0
	for ball in balls
		if ball.active and radie > dist ball.x, ball.y, mouseX, mouseY
			ballClicked++
			b = ball

	if ballClicked != 1 then return reset -1
	active--
	b.active = false
	clicked.push b
	if clicked.length != 2 then return
	if clicked[0].rgb != clicked[1].rgb then return reset -1
	if active == 0 then return reset 1
	clicked = []
