balls = []
radie = 100
range = _.range
#röd blå grön gul svart vit cyan magenta
#COLORS = "#f008 #00f8 #0f08 #ff08 #0008 #fff8 #0ff8 #f0f8".split " "
COLORS = []
clicked = []
level = 0
ballClicked = 0
passive = null
pattern = "08f"

overlap = (x1,y1,x2,y2) -> 
	result = dist(x1,y1,x2,y2) 
	console.log 'overlap', result,radie
	result < 0.5 * radie

createColors = (s)->
	pattern = s
	result = []
	for r in s
		for g in s
			for b in s
				result.push "#"+r+g+b+"8"
	_.shuffle result

reset = (delta)->
	level += delta
	if level == 0 then level = 1
	radie = windowHeight/2/(level+1)**0.4
	balls = []
	clicked = []
	passive = 0
	for i in range level
		for j in range 2
			antal = 0
			loop
				antal++
				if antal > 100 then break 
				x = int random width
				y = int random height
				count = 0
				for ball in balls
					if overlap x,y,ball.x,ball.y then count++
				if count == 0 then break

			console.log 'antal',antal
			balls.push {x:x, y:y, rgb:COLORS[i], passive:false}

setup = ->
	createCanvas windowWidth, windowHeight
	radie = windowHeight/4
	params = getParameters()
	if 0 != _.size params then pattern = params.pattern
	COLORS = createColors pattern
	reset 1

draw = ->
	background 255
	fill 240
	textSize height/5
	textAlign CENTER,CENTER
	text level,width/2,height/2
	text pattern,width/2,300
	textSize height/50
	fill 0
	text '0123456789abcdef',width-100,50
	for ball in balls
		if not ball.passive
			fill ball.rgb 
			ellipse ball.x,ball.y,radie*2

keyPressed = ->
	# if key=="2" 
	# 	COLORS=createColors "0f"
	# 	reset 0
	# if key=="3" 
	# 	COLORS=createColors "08f"
	# 	reset 0
	# if key=="4" 
	# 	COLORS=createColors "05af"
	# 	reset 0
	# if key=="5" 
	# 	COLORS=createColors "048bf"
	# 	reset 0

mousePressed = ->
	ballClicked = 0
	for ball in balls 
		if not ball.passive and radie > dist ball.x,ball.y, mouseX, mouseY
			ballClicked++
			b = ball
	if ballClicked != 1 then return reset -1
	passive++
	clicked.push b 
	b.passive = true
	if clicked.length != 2 then return
	if clicked[1].rgb != clicked[0].rgb then return reset -1 else clicked = []
	if passive == balls.length then return reset 1