// Generated by CoffeeScript 2.4.1
var Ball, COLORS, active, balls, clicked, createColors, createPair, draw, level, mousePressed, reset, setup;

COLORS = null;

level = 0;

active = 0;

clicked = [];

Ball = class Ball {
  constructor(radie1, x1, y1, col) {
    this.radie = radie1;
    this.x = x1;
    this.y = y1;
    this.col = col;
    this.active = true;
  }

  rita() {
    if (!this.active) {
      return;
    }
    fill(this.col);
    return circle(this.x, this.y, this.radie);
  }

  inside(mx, my) {
    if (!this.active) {
      return false;
    }
    return dist(this.x, this.y, mx, my) < this.radie;
  }

};

balls = [];

reset = function(delta = 1) {
  var i, k, len, ref;
  active = 0;
  balls = [];
  clicked = [];
  level += delta;
  console.log('reset', level);
  if (level < 1) {
    level = 1;
  }
  ref = range(level);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    createPair(i);
  }
  return console.log(balls);
};

createColors = function() {
  var b, g, k, l, len, len1, len2, m, r, ref, ref1, ref2, result;
  result = [];
  ref = '08f';
  for (k = 0, len = ref.length; k < len; k++) {
    r = ref[k];
    ref1 = '08f';
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      g = ref1[l];
      ref2 = '08f';
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        b = ref2[m];
        result.push('#' + r + g + b + '8');
      }
    }
  }
  return result;
};

setup = function() {
  createCanvas(windowWidth, windowHeight);
  COLORS = createColors();
  return reset(1);
};

draw = function() {
  var ball, i, k, l, len, len1, results;
  bg(0.5);
  for (k = 0, len = balls.length; k < len; k++) {
    ball = balls[k];
    ball.rita();
  }
  fc(1);
  textSize(16);
  text(`level ${level}`, 100, 25);
  text(`active ${active}`, 100, 50);
  results = [];
  for (i = l = 0, len1 = balls.length; l < len1; i = ++l) {
    ball = balls[i];
    results.push(text(JSON.stringify(ball), 100, 75 + i * 25));
  }
  return results;
};

mousePressed = function() {
  var ball, candidates;
  candidates = (function() {
    var k, len, results;
    results = [];
    for (k = 0, len = balls.length; k < len; k++) {
      ball = balls[k];
      if (ball.inside(mouseX, mouseY)) {
        results.push(ball);
      }
    }
    return results;
  })();
  if (candidates.length !== 1) {
    reset(-1);
  }
  active--;
  ball = candidates[0];
  ball.active = false;
  clicked.push(ball);
  console.log(`clicked.length ${clicked.length}`);
  if (clicked.length === 2) {
    if (active === 0) {
      reset(1);
      return;
    }
    if (clicked[0].col !== clicked[1].col) {
      reset(-1);
    }
    return clicked = [];
  }
};

createPair = function(i) {
  var j, k, len, radie, ref, results, x, y;
  radie = windowWidth / (3 + level);
  ref = range(2);
  results = [];
  for (k = 0, len = ref.length; k < len; k++) {
    j = ref[k];
    active++;
    x = int(random(width));
    y = int(random(height));
    results.push(balls.push(new Ball(radie, x, y, COLORS[i])));
  }
  return results;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxZQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsWUFBQSxFQUFBLEtBQUEsRUFBQTs7QUFBQSxNQUFBLEdBQVM7O0FBQ1QsS0FBQSxHQUFROztBQUNSLE1BQUEsR0FBUzs7QUFDVCxPQUFBLEdBQVU7O0FBRUosT0FBTixNQUFBLEtBQUE7RUFDQyxXQUFjLE9BQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUFPLElBQUMsQ0FBQTtJQUFHLElBQUMsQ0FBQTtJQUFHLElBQUMsQ0FBQTtJQUMvQixJQUFDLENBQUEsTUFBRCxHQUFVO0VBREc7O0VBRWQsSUFBTyxDQUFBLENBQUE7SUFDTixJQUFHLENBQUksSUFBQyxDQUFBLE1BQVI7QUFBb0IsYUFBcEI7O0lBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxHQUFOO1dBQ0EsTUFBQSxDQUFPLElBQUMsQ0FBQSxDQUFSLEVBQVUsSUFBQyxDQUFBLENBQVgsRUFBYSxJQUFDLENBQUEsS0FBZDtFQUhNOztFQUlQLE1BQVMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFBO0lBQ1IsSUFBRyxDQUFJLElBQUMsQ0FBQSxNQUFSO0FBQW9CLGFBQU8sTUFBM0I7O1dBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxDQUFOLEVBQVEsSUFBQyxDQUFBLENBQVQsRUFBVyxFQUFYLEVBQWMsRUFBZCxDQUFBLEdBQW9CLElBQUMsQ0FBQTtFQUZiOztBQVBWOztBQVdBLEtBQUEsR0FBUTs7QUFFUixLQUFBLEdBQVEsUUFBQSxDQUFDLFFBQVEsQ0FBVCxDQUFBO0FBQ1AsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQTtFQUFBLE1B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LENBQUQsQ0FBQTtBQUNaLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQSxFQUFBO0VBQUEsS0FBQSxHQUFRLFdBQUEsR0FBWSxDQUFDLENBQUEsR0FBRSxLQUFIO0FBRXBCO0FBQUE7RUFBQSxLQUFBLHFDQUFBOztJQUNDLE1BQUE7SUFDQSxDQUFBLEdBQUksR0FBQSxDQUFJLE1BQUEsQ0FBTyxLQUFQLENBQUo7SUFDSixDQUFBLEdBQUksR0FBQSxDQUFJLE1BQUEsQ0FBTyxNQUFQLENBQUo7aUJBQ0osS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFJLElBQUosQ0FBUyxLQUFULEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixNQUFPLENBQUEsQ0FBQSxDQUExQixDQUFYO0VBSkQsQ0FBQTs7QUFIWSIsInNvdXJjZXNDb250ZW50IjpbIkNPTE9SUyA9IG51bGxcclxubGV2ZWwgPSAwXHJcbmFjdGl2ZSA9IDBcclxuY2xpY2tlZCA9IFtdXHJcblxyXG5jbGFzcyBCYWxsXHJcblx0Y29uc3RydWN0b3IgOiAoQHJhZGllLCBAeCwgQHksIEBjb2wpIC0+XHJcblx0XHRAYWN0aXZlID0gdHJ1ZVxyXG5cdHJpdGEgOiAtPlxyXG5cdFx0aWYgbm90IEBhY3RpdmUgdGhlbiByZXR1cm4gXHJcblx0XHRmaWxsIEBjb2xcclxuXHRcdGNpcmNsZSBAeCxAeSxAcmFkaWVcclxuXHRpbnNpZGUgOiAobXgsbXkpIC0+IFxyXG5cdFx0aWYgbm90IEBhY3RpdmUgdGhlbiByZXR1cm4gZmFsc2VcclxuXHRcdGRpc3QoQHgsQHksbXgsbXkpIDwgQHJhZGllXHJcblxyXG5iYWxscyA9IFtdXHJcblxyXG5yZXNldCA9IChkZWx0YSA9IDEpIC0+XHJcblx0YWN0aXZlID0gMCBcclxuXHRiYWxscyA9IFtdXHJcblx0Y2xpY2tlZCA9IFtdXHJcblx0bGV2ZWwgKz0gZGVsdGFcclxuXHRjb25zb2xlLmxvZyAncmVzZXQnLGxldmVsXHJcblx0aWYgbGV2ZWwgPCAxIHRoZW4gbGV2ZWwgPSAxXHJcblx0Zm9yIGkgaW4gcmFuZ2UgbGV2ZWxcclxuXHRcdGNyZWF0ZVBhaXIgaVxyXG5cdGNvbnNvbGUubG9nIGJhbGxzXHJcblxyXG5jcmVhdGVDb2xvcnMgPSAtPlxyXG5cdHJlc3VsdCA9IFtdXHJcblx0Zm9yIHIgaW4gJzA4ZidcclxuXHRcdGZvciBnIGluICcwOGYnXHJcblx0XHRcdGZvciBiIGluICcwOGYnXHJcblx0XHRcdFx0cmVzdWx0LnB1c2ggJyMnK3IrZytiKyc4J1xyXG5cdHJlc3VsdFxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyB3aW5kb3dXaWR0aCx3aW5kb3dIZWlnaHRcclxuXHRDT0xPUlMgPSBjcmVhdGVDb2xvcnMoKVxyXG5cdHJlc2V0IDFcclxuXHJcbmRyYXcgPSAtPlxyXG5cdGJnIDAuNVxyXG5cdGZvciBiYWxsIGluIGJhbGxzXHJcblx0XHRiYWxsLnJpdGEoKVxyXG5cdGZjIDFcclxuXHR0ZXh0U2l6ZSAxNlxyXG5cdHRleHQgXCJsZXZlbCAje2xldmVsfVwiLCAxMDAsMjVcclxuXHR0ZXh0IFwiYWN0aXZlICN7YWN0aXZlfVwiLCAxMDAsNTBcclxuXHRmb3IgYmFsbCxpIGluIGJhbGxzXHJcblx0XHR0ZXh0IEpTT04uc3RyaW5naWZ5KGJhbGwpLDEwMCw3NStpKjI1XHJcblxyXG5tb3VzZVByZXNzZWQgPSAtPlxyXG5cdGNhbmRpZGF0ZXMgPSAoYmFsbCBmb3IgYmFsbCBpbiBiYWxscyB3aGVuIGJhbGwuaW5zaWRlIG1vdXNlWCxtb3VzZVkpXHJcblx0aWYgY2FuZGlkYXRlcy5sZW5ndGggIT0gMSB0aGVuIHJlc2V0IC0xXHJcblx0YWN0aXZlLS1cclxuXHRiYWxsID0gY2FuZGlkYXRlc1swXVxyXG5cdGJhbGwuYWN0aXZlID0gZmFsc2VcclxuXHRjbGlja2VkLnB1c2ggYmFsbFxyXG5cdGNvbnNvbGUubG9nIFwiY2xpY2tlZC5sZW5ndGggI3tjbGlja2VkLmxlbmd0aH1cIlxyXG5cdGlmIGNsaWNrZWQubGVuZ3RoID09IDJcclxuXHRcdGlmIGFjdGl2ZSA9PSAwXHJcblx0XHRcdHJlc2V0IDFcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRpZiBjbGlja2VkWzBdLmNvbCAhPSBjbGlja2VkWzFdLmNvbFxyXG5cdFx0XHRyZXNldCAtMVxyXG5cdFx0Y2xpY2tlZCA9IFtdXHJcblxyXG5jcmVhdGVQYWlyID0gKGkpIC0+XHJcblx0cmFkaWUgPSB3aW5kb3dXaWR0aC8oMytsZXZlbClcclxuXHJcblx0Zm9yIGogaW4gcmFuZ2UgMlxyXG5cdFx0YWN0aXZlKytcclxuXHRcdHggPSBpbnQgcmFuZG9tIHdpZHRoXHJcblx0XHR5ID0gaW50IHJhbmRvbSBoZWlnaHRcclxuXHRcdGJhbGxzLnB1c2ggbmV3IEJhbGwgcmFkaWUseCx5LENPTE9SU1tpXSJdfQ==
//# sourceURL=c:\github\ColorPairCD\coffee\sketch.coffee