// Generated by CoffeeScript 2.4.1
var Ball, active, balls, createBall, draw, level, mousePressed, reset, setup, start, stopp;

level = 0;

active = 0;

start = null;

stopp = null;

Ball = class Ball {
  constructor(radie1, x1, y1, dx1, dy1, col1) {
    this.radie = radie1;
    this.x = x1;
    this.y = y1;
    this.dx = dx1;
    this.dy = dy1;
    this.col = col1;
    this.active = true;
  }

  rita() {
    if (!this.active) {
      return;
    }
    if (this.x > width - this.radie) {
      this.dx = -this.dx;
    }
    if (this.x < this.radie) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    if (this.y > height - this.radie) {
      this.dy = -this.dy;
    } else {
      this.dy += 0.1;
    }
    this.y += this.dy;
    fill(this.col);
    return circle(this.x, this.y, this.radie);
  }

  inside(mx, my) {
    return dist(this.x, this.y, mx, my) < this.radie;
  }

};

balls = [];

reset = function() {
  var i, j, len, ref, results;
  start = new Date();
  level++;
  balls = [];
  ref = range(level);
  results = [];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    results.push(createBall());
  }
  return results;
};

setup = function() {
  createCanvas(800, 600);
  reset();
  textSize(100);
  return textAlign(CENTER, CENTER);
};

draw = function() {
  var ball, j, len;
  bg(0);
  for (j = 0, len = balls.length; j < len; j++) {
    ball = balls[j];
    ball.rita();
  }
  if (active === 0) {
    fc(1);
    return text((stopp - start) / 1000, width / 2, height / 2);
  }
};

mousePressed = function() {
  var ball, j, len, results;
  if (active === 0) {
    return reset();
  } else {
    results = [];
    for (j = 0, len = balls.length; j < len; j++) {
      ball = balls[j];
      if (ball.inside(mouseX, mouseY)) {
        ball.active = false;
        active--;
        if (active === 0) {
          results.push(stopp = new Date());
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
};

createBall = function() {
  var col, dx, dy, radie, x, y;
  active++;
  x = random(50, width);
  y = random(50, 100);
  dx = random(-2, 2);
  dy = random(-0.3, 0.3);
  radie = 50;
  col = "#f00 #0f0 #00f".split(' ');
  return balls.push(new Ball(radie, x, y, dx, dy, col[0]));
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsWUFBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBOztBQUFBLEtBQUEsR0FBUTs7QUFFUixNQUFBLEdBQVM7O0FBQ1QsS0FBQSxHQUFROztBQUNSLEtBQUEsR0FBUTs7QUFFRixPQUFOLE1BQUEsS0FBQTtFQUNDLFdBQWMsT0FBQSxJQUFBLElBQUEsS0FBQSxLQUFBLE1BQUEsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUFPLElBQUMsQ0FBQTtJQUFHLElBQUMsQ0FBQTtJQUFHLElBQUMsQ0FBQTtJQUFJLElBQUMsQ0FBQTtJQUFJLElBQUMsQ0FBQTtJQUN6QyxJQUFDLENBQUEsTUFBRCxHQUFVO0VBREc7O0VBRWQsSUFBTyxDQUFBLENBQUE7SUFDTixJQUFHLENBQUksSUFBQyxDQUFBLE1BQVI7QUFBb0IsYUFBcEI7O0lBQ0EsSUFBRyxJQUFDLENBQUEsQ0FBRCxHQUFLLEtBQUEsR0FBTSxJQUFDLENBQUEsS0FBZjtNQUEwQixJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsSUFBQyxDQUFBLEdBQWxDOztJQUNBLElBQUcsSUFBQyxDQUFBLENBQUQsR0FBSyxJQUFDLENBQUEsS0FBVDtNQUFvQixJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsSUFBQyxDQUFBLEdBQTVCOztJQUNBLElBQUMsQ0FBQSxDQUFELElBQU0sSUFBQyxDQUFBO0lBRVAsSUFBRyxJQUFDLENBQUEsQ0FBRCxHQUFLLE1BQUEsR0FBTyxJQUFDLENBQUEsS0FBaEI7TUFBMkIsSUFBQyxDQUFBLEVBQUQsR0FBTSxDQUFDLElBQUMsQ0FBQSxHQUFuQztLQUFBLE1BQUE7TUFBMkMsSUFBQyxDQUFBLEVBQUQs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dG9wcCA9IG51bGxcclxuXHJcbmNsYXNzIEJhbGxcclxuXHRjb25zdHJ1Y3RvciA6IChAcmFkaWUsIEB4LCBAeSwgQGR4LCBAZHksIEBjb2wpIC0+XHJcblx0XHRAYWN0aXZlID0gdHJ1ZVxyXG5cdHJpdGEgOiAtPlxyXG5cdFx0aWYgbm90IEBhY3RpdmUgdGhlbiByZXR1cm4gXHJcblx0XHRpZiBAeCA+IHdpZHRoLUByYWRpZSB0aGVuIEBkeCA9IC1AZHhcclxuXHRcdGlmIEB4IDwgQHJhZGllIHRoZW4gQGR4ID0gLUBkeFxyXG5cdFx0QHggKz0gQGR4XHJcblxyXG5cdFx0aWYgQHkgPiBoZWlnaHQtQHJhZGllIHRoZW4gQGR5ID0gLUBkeSBlbHNlIEBkeSs9MC4xXHJcblxyXG5cdFx0QHkgKz0gQGR5XHJcblx0XHRmaWxsIEBjb2xcclxuXHRcdGNpcmNsZSBAeCxAeSxAcmFkaWVcclxuXHRpbnNpZGUgOiAobXgsbXkpIC0+IGRpc3QoQHgsQHksbXgsbXkpIDwgQHJhZGllXHJcblxyXG5iYWxscyA9IFtdXHJcblxyXG5yZXNldCA9ICgpIC0+XHJcblx0c3RhcnQgPSBuZXcgRGF0ZSgpXHJcblx0bGV2ZWwrK1xyXG5cdGJhbGxzID0gW11cclxuXHRmb3IgaSBpbiByYW5nZSBsZXZlbFxyXG5cdFx0Y3JlYXRlQmFsbCgpXHJcblxyXG5zZXR1cCA9IC0+XHJcblx0Y3JlYXRlQ2FudmFzIDgwMCw2MDBcclxuXHRyZXNldCgpXHJcblx0dGV4dFNpemUgMTAwXHJcblx0dGV4dEFsaWduIENFTlRFUixDRU5URVJcclxuXHJcbmRyYXcgPSAtPlxyXG5cdGJnIDBcclxuXHRmb3IgYmFsbCBpbiBiYWxsc1xyXG5cdFx0YmFsbC5yaXRhKClcclxuXHRpZiBhY3RpdmUgPT0gMFxyXG5cdFx0ZmMgMVxyXG5cdFx0dGV4dCAoc3RvcHAtc3RhcnQpLzEwMDAsIHdpZHRoLzIsaGVpZ2h0LzJcclxuXHJcbm1vdXNlUHJlc3NlZCA9IC0+XHJcblx0aWYgYWN0aXZlPT0wXHJcblx0XHRyZXNldCgpXHJcblx0ZWxzZVxyXG5cdFx0Zm9yIGJhbGwgaW4gYmFsbHNcclxuXHRcdFx0aWYgYmFsbC5pbnNpZGUgbW91c2VYLG1vdXNlWSBcclxuXHRcdFx0XHRiYWxsLmFjdGl2ZSA9IGZhbHNlXHJcblx0XHRcdFx0YWN0aXZlLS1cclxuXHRcdFx0XHRpZiBhY3RpdmUgPT0gMFxyXG5cdFx0XHRcdFx0c3RvcHAgPSBuZXcgRGF0ZSgpIFxyXG5cclxuY3JlYXRlQmFsbCA9IC0+XHJcblx0YWN0aXZlKytcclxuXHR4ID0gcmFuZG9tIDUwLHdpZHRoXHJcblx0eSA9IHJhbmRvbSA1MCwxMDBcclxuXHRkeCA9IHJhbmRvbSAtMiwyXHJcblx0ZHkgPSByYW5kb20gLTAuMywwLjNcclxuXHJcblx0cmFkaWUgPSA1MFxyXG5cdGNvbCA9IFwiI2YwMCAjMGYwICMwMGZcIi5zcGxpdCAnICdcclxuXHRiYWxscy5wdXNoIG5ldyBCYWxsIHJhZGllLHgseSxkeCxkeSxjb2xbMF0iXX0=
//# sourceURL=c:\github\ColorPairCD\coffee\sketch.coffee