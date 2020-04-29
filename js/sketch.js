// Generated by CoffeeScript 2.4.1
var COLORS, ballClicked, balls, clicked, createColors, draw, keyPressed, level, mousePressed, overlap, passive, pattern, radie, range, reset, setup;

balls = [];

radie = 100;

range = _.range;

//röd blå grön gul svart vit cyan magenta
//COLORS = "#f008 #00f8 #0f08 #ff08 #0008 #fff8 #0ff8 #f0f8".split " "
COLORS = [];

clicked = [];

level = 0;

ballClicked = 0;

passive = null;

pattern = "08f";

overlap = function(x1, y1, x2, y2) {
  var result;
  result = dist(x1, y1, x2, y2);
  console.log('overlap', result, radie);
  return result < 0.5 * radie;
};

createColors = function(s) {
  var b, g, k, l, len, len1, len2, m, r, result;
  pattern = s;
  result = [];
  for (k = 0, len = s.length; k < len; k++) {
    r = s[k];
    for (l = 0, len1 = s.length; l < len1; l++) {
      g = s[l];
      for (m = 0, len2 = s.length; m < len2; m++) {
        b = s[m];
        result.push("#" + r + g + b + "8");
      }
    }
  }
  return _.shuffle(result);
};

reset = function(delta) {
  var antal, ball, count, i, j, k, len, ref, results, x, y;
  level += delta;
  if (level === 0) {
    level = 1;
  }
  radie = windowHeight / 2 / (level + 1) ** 0.4;
  balls = [];
  clicked = [];
  passive = 0;
  ref = range(level);
  results = [];
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    results.push((function() {
      var l, len1, len2, m, ref1, results1;
      ref1 = range(2);
      results1 = [];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        j = ref1[l];
        antal = 0;
        while (true) {
          antal++;
          if (antal > 100) {
            break;
          }
          x = int(random(width));
          y = int(random(height));
          count = 0;
          for (m = 0, len2 = balls.length; m < len2; m++) {
            ball = balls[m];
            if (overlap(x, y, ball.x, ball.y)) {
              count++;
            }
          }
          if (count === 0) {
            break;
          }
        }
        console.log('antal', antal);
        results1.push(balls.push({
          x: x,
          y: y,
          rgb: COLORS[i],
          passive: false
        }));
      }
      return results1;
    })());
  }
  return results;
};

setup = function() {
  var params;
  createCanvas(windowWidth, windowHeight);
  radie = windowHeight / 4;
  params = getParameters();
  if (0 !== _.size(params)) {
    pattern = params.pattern;
  }
  COLORS = createColors(pattern);
  return reset(1);
};

draw = function() {
  var ball, k, len, results;
  background(255);
  fill(240);
  textSize(height / 5);
  textAlign(CENTER, CENTER);
  text(level, width / 2, height / 2);
  text(pattern, width / 2, 300);
  textSize(height / 50);
  fill(0);
  text('0123456789abcdef', width - 100, 50);
  results = [];
  for (k = 0, len = balls.length; k < len; k++) {
    ball = balls[k];
    if (!ball.passive) {
      fill(ball.rgb);
      results.push(ellipse(ball.x, ball.y, radie * 2));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

keyPressed = function() {};

// if key=="2" 
// 	COLORS=createColors "0f"
// 	reset 0
// if key=="3" 
// 	COLORS=createColors "08f"
// 	reset 0
// if key=="4" 
// 	COLORS=createColors "05af"
// 	reset 0
// if key=="5" 
// 	COLORS=createColors "048bf"
// 	reset 0
mousePressed = function() {
  var b, ball, k, len;
  ballClicked = 0;
  for (k = 0, len = balls.length; k < len; k++) {
    ball = balls[k];
    if (!ball.passive && radie > dist(ball.x, ball.y, mouseX, mouseY)) {
      ballClicked++;
      b = ball;
    }
  }
  if (ballClicked !== 1) {
    return reset(-1);
  }
  passive++;
  clicked.push(b);
  b.passive = true;
  if (clicked.length !== 2) {
    return;
  }
  if (clicked[1].rgb !== clicked[0].rgb) {
    return reset(-1);
  } else {
    clicked = [];
  }
  if (passive === balls.length) {
    return reset(1);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsTUFBQSxFQUFBLFdBQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxFQUFBLFlBQUEsRUFBQSxJQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUE7O0FBQUEsS0FBQSxHQUFROztBQUNSLEtBQUEsR0FBUTs7QUFDUixLQUFBLEdBQVEsQ0FBQyxDQUFDLE1BRlY7Ozs7QUFLQSxNQUFBLEdBQVM7O0FBQ1QsT0FBQSxHQUFVOztBQUNWLEtBQUEsR0FBUTs7QUFDUixXQUFBLEdBQWM7O0FBQ2QsT0FBQSxHQUFVOztBQUNWLE9BQUEsR0FBVTs7QUFFVixPQUFBLEdBQVUsUUFBQSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxFQUFVLEVBQVYsQ0FBQTtBQUNULE1BQUE7RUFBQSxNQUFBLEdBQVMsSUFBQSxDQUFLLEVBQUwsRUFBUSxFQUFSLEVBQVcsRUFBWCxFQUFjLEVBQWQ7RUFDVCxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkIsRUFBOEIsS0FBOUI7U0FDQSxNQUFBLEdBQVMsR0FBQSxHQUFNO0FBSE47O0FBS1YsWUFBQSxHQUFlLFFBQUEsQ0FBQyxDQUFELENBQUE7QUFDZCxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0VBQUEsT0FBQSxHQUFVO0VBQ1YsTUFBQSxHQUFTO0VBQ1QsS0FBQSxtQ0FBQTs7SUFDQyxLQUFBLHFDQUFBOztNQUNDLEtBQUEscUNBQUE7O1FBQ0MsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFBLEdB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QyxDQUFwQixFQUFzQixLQUFBLEdBQU0sQ0FBNUIsR0FGRDtLQUFBLE1BQUE7MkJBQUE7O0VBREQsQ0FBQTs7QUFWTTs7QUFlUCxVQUFBLEdBQWEsUUFBQSxDQUFBLENBQUEsRUFBQSxFQXhFYjs7Ozs7Ozs7Ozs7Ozs7QUFzRkEsWUFBQSxHQUFlLFFBQUEsQ0FBQSxDQUFBO0FBQ2QsTUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQTtFQUFBLFdBQUEsR0FBYztFQUNkLEtBQUEsdUNBQUE7O0lBQ0MsSUFBRyxDQUFJLElBQUksQ0FBQyxPQUFULElBQXFCLEtBQUEsR0FBUSxJQUFBLENBQUssSUFBSSxDQUFDLENBQVYsRUFBWSxJQUFJLENBQUMsQ0FBakIsRUFBb0IsTUFBcEIsRUFBNEIsTUFBNUIsQ0FBaEM7TUFDQyxXQUFBO01BQ0EsQ0FBQSxHQUFJLEtBRkw7O0VBREQ7RUFJQSxJQUFHLFdBQUEsS0FBZSxDQUFsQjtBQUF5QixXQUFPLEtBQUEsQ0FBTSxDQUFDLENBQVAsRUFBaEM7O0VBQ0EsT0FBQTtFQUNBLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBYjtFQUNBLENBQUMsQ0FBQyxPQUFGLEdBQVk7RUFDWixJQUFHLE9BQU8sQ0FBQyxNQUFSLEtBQWtCLENBQXJCO0FBQTRCLFdBQTVCOztFQUNBLElBQUcsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLEdBQVgsS0FBa0IsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLEdBQWhDO0FBQXlDLFdBQU8sS0FBQSxDQUFNLENBQUMsQ0FBUCxFQUFoRDtHQUFBLE1BQUE7SUFBOEQsT0FBQSxHQUFVLEdBQXhFOztFQUNBLElBQUcsT0FBQSxLQUFXLEtBQUssQ0FBQyxNQUFwQjtBQUFnQyxXQUFPLEtBQUEsQ0FBTSxDQUFOLEVBQXZDOztBQVpjIiwic291cmNlc0NvbnRlbnQiOlsiYmFsbHMgPSBbXVxyXG5yYWRpZSA9IDEwMFxyXG5yYW5nZSA9IF8ucmFuZ2VcclxuI3LDtmQgYmzDpSBncsO2biBndWwgc3ZhcnQgdml0IGN5YW4gbWFnZW50YVxyXG4jQ09MT1JTID0gXCIjZjAwOCAjMDBmOCAjMGYwOCAjZmYwOCAjMDAwOCAjZmZmOCAjMGZmOCAjZjBmOFwiLnNwbGl0IFwiIFwiXHJcbkNPTE9SUyA9IFtdXHJcbmNsaWNrZWQgPSBbXVxyXG5sZXZlbCA9IDBcclxuYmFsbENsaWNrZWQgPSAwXHJcbnBhc3NpdmUgPSBudWxsXHJcbnBhdHRlcm4gPSBcIjA4ZlwiXHJcblxyXG5vdmVybGFwID0gKHgxLHkxLHgyLHkyKSAtPiBcclxuXHRyZXN1bHQgPSBkaXN0KHgxLHkxLHgyLHkyKSBcclxuXHRjb25zb2xlLmxvZyAnb3ZlcmxhcCcsIHJlc3VsdCxyYWRpZVxyXG5cdHJlc3VsdCA8IDAuNSAqIHJhZGllXHJcblxyXG5jcmVhdGVDb2xvcnMgPSAocyktPlxyXG5cdHBhdHRlcm4gPSBzXHJcblx0cmVzdWx0ID0gW11cclxuXHRmb3IgciBpbiBzXHJcblx0XHRmb3IgZyBpbiBzXHJcblx0XHRcdGZvciBiIGluIHNcclxuXHRcdFx0XHRyZXN1bHQucHVzaCBcIiNcIityK2crYitcIjhcIlxyXG5cdF8uc2h1ZmZsZSByZXN1bHRcclxuXHJcbnJlc2V0ID0gKGRlbHRhKS0+XHJcblx0bGV2ZWwgKz0gZGVsdGFcclxuXHRpZiBsZXZlbCA9PSAwIHRoZW4gbGV2ZWwgPSAxXHJcblx0cmFkaWUgPSB3aW5kb3dIZWlnaHQvMi8obGV2ZWwrMSkqKjAuNFxyXG5cdGJhbGxzID0gW11cclxuXHRjbGlja2VkID0gW11cclxuXHRwYXNzaXZlID0gMFxyXG5cdGZvciBpIGluIHJhbmdlIGxldmVsXHJcblx0XHRmb3IgaiBpbiByYW5nZSAyXHJcblx0XHRcdGFudGFsID0gMFxyXG5cdFx0XHRsb29wXHJcblx0XHRcdFx0YW50YWwrK1xyXG5cdFx0XHRcdGlmIGFudGFsID4gMTAwIHRoZW4gYnJlYWsgXHJcblx0XHRcdFx0eCA9IGludCByYW5kb20gd2lkdGhcclxuXHRcdFx0XHR5ID0gaW50IHJhbmRvbSBoZWlnaHRcclxuXHRcdFx0XHRjb3VudCA9IDBcclxuXHRcdFx0XHRmb3IgYmFsbCBpbiBiYWxsc1xyXG5cdFx0XHRcdFx0aWYgb3ZlcmxhcCB4LHksYmFsbC54LGJhbGwueSB0aGVuIGNvdW50KytcclxuXHRcdFx0XHRpZiBjb3VudCA9PSAwIHRoZW4gYnJlYWtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nICdhbnRhbCcsYW50YWxcclxuXHRcdFx0YmFsbHMucHVzaCB7eDp4LCB5OnksIHJnYjpDT0xPUlNbaV0sIHBhc3NpdmU6ZmFsc2V9XHJcblxyXG5zZXR1cCA9IC0+XHJcblx0Y3JlYXRlQ2FudmFzIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHRcclxuXHRyYWRpZSA9IHdpbmRvd0hlaWdodC80XHJcblx0cGFyYW1zID0gZ2V0UGFyYW1ldGVycygpXHJcblx0aWYgMCAhPSBfLnNpemUgcGFyYW1zIHRoZW4gcGF0dGVybiA9IHBhcmFtcy5wYXR0ZXJuXHJcblx0Q09MT1JTID0gY3JlYXRlQ29sb3JzIHBhdHRlcm5cclxuXHRyZXNldCAxXHJcblxyXG5kcmF3ID0gLT5cclxuXHRiYWNrZ3JvdW5kIDI1NVxyXG5cdGZpbGwgMjQwXHJcblx0dGV4dFNpemUgaGVpZ2h0LzVcclxuXHR0ZXh0QWxpZ24gQ0VOVEVSLENFTlRFUlxyXG5cdHRleHQgbGV2ZWwsd2lkdGgvMixoZWlnaHQvMlxyXG5cdHRleHQgcGF0dGVybix3aWR0aC8yLDMwMFxyXG5cdHRleHRTaXplIGhlaWdodC81MFxyXG5cdGZpbGwgMFxyXG5cdHRleHQgJzAxMjM0NTY3ODlhYmNkZWYnLHdpZHRoLTEwMCw1MFxyXG5cdGZvciBiYWxsIGluIGJhbGxzXHJcblx0XHRpZiBub3QgYmFsbC5wYXNzaXZlXHJcblx0XHRcdGZpbGwgYmFsbC5yZ2IgXHJcblx0XHRcdGVsbGlwc2UgYmFsbC54LGJhbGwueSxyYWRpZSoyXHJcblxyXG5rZXlQcmVzc2VkID0gLT5cclxuXHQjIGlmIGtleT09XCIyXCIgXHJcblx0IyBcdENPTE9SUz1jcmVhdGVDb2xvcnMgXCIwZlwiXHJcblx0IyBcdHJlc2V0IDBcclxuXHQjIGlmIGtleT09XCIzXCIgXHJcblx0IyBcdENPTE9SUz1jcmVhdGVDb2xvcnMgXCIwOGZcIlxyXG5cdCMgXHRyZXNldCAwXHJcblx0IyBpZiBrZXk9PVwiNFwiIFxyXG5cdCMgXHRDT0xPUlM9Y3JlYXRlQ29sb3JzIFwiMDVhZlwiXHJcblx0IyBcdHJlc2V0IDBcclxuXHQjIGlmIGtleT09XCI1XCIgXHJcblx0IyBcdENPTE9SUz1jcmVhdGVDb2xvcnMgXCIwNDhiZlwiXHJcblx0IyBcdHJlc2V0IDBcclxuXHJcbm1vdXNlUHJlc3NlZCA9IC0+XHJcblx0YmFsbENsaWNrZWQgPSAwXHJcblx0Zm9yIGJhbGwgaW4gYmFsbHMgXHJcblx0XHRpZiBub3QgYmFsbC5wYXNzaXZlIGFuZCByYWRpZSA+IGRpc3QgYmFsbC54LGJhbGwueSwgbW91c2VYLCBtb3VzZVlcclxuXHRcdFx0YmFsbENsaWNrZWQrK1xyXG5cdFx0XHRiID0gYmFsbFxyXG5cdGlmIGJhbGxDbGlja2VkICE9IDEgdGhlbiByZXR1cm4gcmVzZXQgLTFcclxuXHRwYXNzaXZlKytcclxuXHRjbGlja2VkLnB1c2ggYiBcclxuXHRiLnBhc3NpdmUgPSB0cnVlXHJcblx0aWYgY2xpY2tlZC5sZW5ndGggIT0gMiB0aGVuIHJldHVyblxyXG5cdGlmIGNsaWNrZWRbMV0ucmdiICE9IGNsaWNrZWRbMF0ucmdiIHRoZW4gcmV0dXJuIHJlc2V0IC0xIGVsc2UgY2xpY2tlZCA9IFtdXHJcblx0aWYgcGFzc2l2ZSA9PSBiYWxscy5sZW5ndGggdGhlbiByZXR1cm4gcmVzZXQgMSJdfQ==
//# sourceURL=c:\github\ColorPairCD\coffee\sketch.coffee