// Generated by CoffeeScript 2.4.1
var Ball, COLORS, active, balls, clicked, createColors, createPair, draw, level, mousePressed, overlap, reset, setup;

COLORS = null;

level = 0;

active = 0;

balls = [];

clicked = [];

Ball = class Ball {
  constructor(radie1, x1, y1, col1) {
    this.radie = radie1;
    this.x = x1;
    this.y = y1;
    this.col = col1;
    this.active = true;
  }

  rita() {
    if (!this.active) {
      return;
    }
    sc(0);
    sw(4);
    fill(this.col);
    return circle(this.x, this.y, this.radie);
  }

  inside(mx, my) {
    if (!this.active) {
      return false;
    }
    return this.radie > dist(this.x, this.y, mx, my);
  }

};

reset = function(delta = 1) {
  var i, k, len, ref, results;
  COLORS = _.shuffle(COLORS);
  active = 0;
  balls = [];
  clicked = [];
  level += delta;
  if (level < 1) {
    level = 1;
  }
  ref = range(level);
  results = [];
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    results.push(createPair(COLORS[i]));
  }
  return results;
};

createColors = function(pattern) {
  var b, g, r;
  return _.flatten((function() {
    var k, len, results;
    results = [];
    for (k = 0, len = pattern.length; k < len; k++) {
      b = pattern[k];
      results.push((function() {
        var l, len1, results1;
        results1 = [];
        for (l = 0, len1 = pattern.length; l < len1; l++) {
          g = pattern[l];
          results1.push((function() {
            var len2, m, results2;
            results2 = [];
            for (m = 0, len2 = pattern.length; m < len2; m++) {
              r = pattern[m];
              results2.push('#' + r + g + b + '8');
            }
            return results2;
          })());
        }
        return results1;
      })());
    }
    return results;
  })());
};

setup = function() {
  createCanvas(windowWidth, windowHeight);
  COLORS = createColors('05af'); // 0f 08f 05af 58be 68ac
  textSize(100);
  textAlign(CENTER, CENTER);
  return reset(1);
};

draw = function() {
  var ball, k, len;
  bg(1);
  for (k = 0, len = balls.length; k < len; k++) {
    ball = balls[k];
    ball.rita();
  }
  fc(0);
  return text(level, width / 2, height / 2);
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
    return reset(-1);
  }
  active--;
  ball = candidates[0];
  ball.active = false;
  clicked.push(ball);
  if (clicked.length === 2) {
    if (active === 0) {
      return reset(1);
    }
    if (clicked[0].col !== clicked[1].col) {
      reset(-1);
    }
    return clicked = [];
  }
};

overlap = function(x, y) {
  var ball, k, len;
  for (k = 0, len = balls.length; k < len; k++) {
    ball = balls[k];
    if (0.5 * ball.radie > dist(ball.x, ball.y, x, y)) {
      return true;
    }
  }
  return false;
};

createPair = function(col) {
  var j, k, len, radie, ref, results, x, y;
  radie = int(1.5 * windowWidth / (3 + level));
  ref = range(2);
  results = [];
  for (k = 0, len = ref.length; k < len; k++) {
    j = ref[k];
    active++;
    x = int(random(width));
    y = int(random(height));
    while (overlap(x, y)) {
      x = int(random(width));
      y = int(random(height));
    }
    results.push(balls.push(new Ball(radie, x, y, col)));
  }
  return results;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxZQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsWUFBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7O0FBQUEsTUFBQSxHQUFTOztBQUNULEtBQUEsR0FBUTs7QUFDUixNQUFBLEdBQVM7O0FBQ1QsS0FBQSxHQUFROztBQUNSLE9BQUEsR0FBVTs7QUFFSixPQUFOLE1BQUEsS0FBQTtFQUNDLFdBQWMsT0FBQSxJQUFBLElBQUEsTUFBQSxDQUFBO0lBQUMsSUFBQyxDQUFBO0lBQU8sSUFBQyxDQUFBO0lBQUcsSUFBQyxDQUFBO0lBQUcsSUFBQyxDQUFBO0lBQVEsSUFBQyxDQUFBLE1BQUQsR0FBVTtFQUFwQzs7RUFDZCxJQUFPLENBQUEsQ0FBQTtJQUNOLElBQUcsQ0FBSSxJQUFDLENBQUEsTUFBUjtBQUFvQixhQUFwQjs7SUFDQSxFQUFBLENBQUcsQ0FBSDtJQUNBLEVBQUEsQ0FBRyxDQUFIO0lBQ0EsSUFBQSxDQUFLLElBQUMsQ0FBQSxHQUFOO1dBQ0EsTUFBQSxDQUFPLElBQUMsQ0FBQSxDQUFSLEVBQVUsSUFBQyxDQUFBLENBQVgsRUFBYSxJQUFDLENBQUEsS0FBZDtFQUxNOztFQU1QLE1BQVMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFBO0lBQ1IsSUFBRyxDQUFJLElBQUMsQ0FBQSxNQUFSO0FBQW9CLGFBQU8sTUFBM0I7O1dBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUSxJQUFDLENBQUEsQ0FBVCxFQUFXLEVBQVgsRUFBYyxFQUFkO0VBRkQ7O0FBUlY7O0FBWUEsS0FBQSxHQUFRLFFBQUEsQ0FBQyxRQUFRLENBQVQsQ0FB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RUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLENBQUEsRUFBQTtFQUFBLEtBQUEsR0FBUSxHQUFBLENBQUksR0FBQSxHQUFNLFdBQU4sR0FBa0IsQ0FBQyxDQUFBLEdBQUUsS0FBSCxDQUF0QjtBQUNSO0FBQUE7RUFBQSxLQUFBLHFDQUFBOztJQUNDLE1BQUE7SUFDQSxDQUFBLEdBQUksR0FBQSxDQUFJLE1BQUEsQ0FBTyxLQUFQLENBQUo7SUFDSixDQUFBLEdBQUksR0FBQSxDQUFJLE1BQUEsQ0FBTyxNQUFQLENBQUo7QUFDSixXQUFNLE9BQUEsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFOO01BQ0MsQ0FBQSxHQUFJLEdBQUEsQ0FBSSxNQUFBLENBQU8sS0FBUCxDQUFKO01BQ0osQ0FBQSxHQUFJLEdBQUEsQ0FBSSxNQUFBLENBQU8sTUFBUCxDQUFKO0lBRkw7aUJBR0EsS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFJLElBQUosQ0FBUyxLQUFULEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixHQUFuQixDQUFYO0VBUEQsQ0FBQTs7QUFGWSIsInNvdXJjZXNDb250ZW50IjpbIkNPTE9SUyA9IG51bGxcclxubGV2ZWwgPSAwXHJcbmFjdGl2ZSA9IDBcclxuYmFsbHMgPSBbXVxyXG5jbGlja2VkID0gW11cclxuXHJcbmNsYXNzIEJhbGxcclxuXHRjb25zdHJ1Y3RvciA6IChAcmFkaWUsIEB4LCBAeSwgQGNvbCkgLT4gQGFjdGl2ZSA9IHRydWVcclxuXHRyaXRhIDogLT5cclxuXHRcdGlmIG5vdCBAYWN0aXZlIHRoZW4gcmV0dXJuIFxyXG5cdFx0c2MgMFxyXG5cdFx0c3cgNFxyXG5cdFx0ZmlsbCBAY29sXHJcblx0XHRjaXJjbGUgQHgsQHksQHJhZGllXHJcblx0aW5zaWRlIDogKG14LG15KSAtPiBcclxuXHRcdGlmIG5vdCBAYWN0aXZlIHRoZW4gcmV0dXJuIGZhbHNlXHJcblx0XHRAcmFkaWUgPiBkaXN0IEB4LEB5LG14LG15XHJcblxyXG5yZXNldCA9IChkZWx0YSA9IDEpIC0+XHJcblx0Q09MT1JTID0gXy5zaHVmZmxlIENPTE9SU1xyXG5cdGFjdGl2ZSA9IDAgXHJcblx0YmFsbHMgPSBbXVxyXG5cdGNsaWNrZWQgPSBbXVxyXG5cdGxldmVsICs9IGRlbHRhXHJcblx0aWYgbGV2ZWwgPCAxIHRoZW4gbGV2ZWwgPSAxXHJcblx0Zm9yIGkgaW4gcmFuZ2UgbGV2ZWxcclxuXHRcdGNyZWF0ZVBhaXIgQ09MT1JTW2ldXHJcblxyXG5jcmVhdGVDb2xvcnMgPSAocGF0dGVybikgLT4gXy5mbGF0dGVuICgnIycrcitnK2IrJzgnIGZvciByIGluIHBhdHRlcm4gZm9yIGcgaW4gcGF0dGVybiBmb3IgYiBpbiBwYXR0ZXJuKVxyXG5cclxuc2V0dXAgPSAtPlxyXG5cdGNyZWF0ZUNhbnZhcyB3aW5kb3dXaWR0aCx3aW5kb3dIZWlnaHRcclxuXHRDT0xPUlMgPSBjcmVhdGVDb2xvcnMgJzA1YWYnICMgMGYgMDhmIDA1YWYgNThiZSA2OGFjXHJcblx0dGV4dFNpemUgMTAwXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHRyZXNldCAxXHJcblxyXG5kcmF3ID0gLT5cclxuXHRiZyAxXHJcblx0Zm9yIGJhbGwgaW4gYmFsbHNcclxuXHRcdGJhbGwucml0YSgpXHJcblx0ZmMgMFxyXG5cdHRleHQgbGV2ZWwsd2lkdGgvMixoZWlnaHQvMlxyXG5cclxubW91c2VQcmVzc2VkID0gLT5cclxuXHRjYW5kaWRhdGVzID0gKGJhbGwgZm9yIGJhbGwgaW4gYmFsbHMgd2hlbiBiYWxsLmluc2lkZSBtb3VzZVgsbW91c2VZKVxyXG5cdGlmIGNhbmRpZGF0ZXMubGVuZ3RoICE9IDEgdGhlbiByZXR1cm4gcmVzZXQgLTFcclxuXHRhY3RpdmUtLVxyXG5cdGJhbGwgPSBjYW5kaWRhdGVzWzBdXHJcblx0YmFsbC5hY3RpdmUgPSBmYWxzZVxyXG5cdGNsaWNrZWQucHVzaCBiYWxsXHJcblx0aWYgY2xpY2tlZC5sZW5ndGggPT0gMlxyXG5cdFx0aWYgYWN0aXZlID09IDAgdGhlbiByZXR1cm4gcmVzZXQgMVxyXG5cdFx0aWYgY2xpY2tlZFswXS5jb2wgIT0gY2xpY2tlZFsxXS5jb2wgdGhlbiByZXNldCAtMVxyXG5cdFx0Y2xpY2tlZCA9IFtdXHJcblxyXG5vdmVybGFwID0gKHgseSkgLT5cclxuXHRmb3IgYmFsbCBpbiBiYWxscyBcclxuXHRcdGlmIDAuNSAqIGJhbGwucmFkaWUgPiBkaXN0IGJhbGwueCxiYWxsLnkseCx5IHRoZW4gcmV0dXJuIHRydWVcclxuXHRmYWxzZVxyXG5cclxuY3JlYXRlUGFpciA9IChjb2wpIC0+XHJcblx0cmFkaWUgPSBpbnQgMS41ICogd2luZG93V2lkdGgvKDMrbGV2ZWwpXHJcblx0Zm9yIGogaW4gcmFuZ2UgMlxyXG5cdFx0YWN0aXZlKytcclxuXHRcdHggPSBpbnQgcmFuZG9tIHdpZHRoXHJcblx0XHR5ID0gaW50IHJhbmRvbSBoZWlnaHRcclxuXHRcdHdoaWxlIG92ZXJsYXAgeCx5XHJcblx0XHRcdHggPSBpbnQgcmFuZG9tIHdpZHRoXHJcblx0XHRcdHkgPSBpbnQgcmFuZG9tIGhlaWdodFxyXG5cdFx0YmFsbHMucHVzaCBuZXcgQmFsbCByYWRpZSx4LHksY29sIl19
//# sourceURL=c:\github\ColorPairCD\coffee\sketch.coffee