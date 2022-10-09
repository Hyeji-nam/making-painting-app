# canvas API
[CANVAS API 바로가기](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)


# example

```javascript
// rect(x, y, width, height)
// shortcut : fillRect()
ctx.rect(50, 50, 100, 100);
ctx.fillStyle = "tan"
ctx.fill();

// beginPath : 경로(path) 나누기(이전 경로와 단절)
ctx.beginPath();
ctx.rect(150, 150, 100, 100);
ctx.fillStyle = "lavender"
ctx.fill();

// moveTo(x, y)
ctx.moveTo(50, 50);


// lineTo(x, y)
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);

ctx.stroke()

// 집 만들기

ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.fillRect(300, 300, 50, 100);
ctx.fillRect(200, 200, 200, 20);
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();

// 사람 만들기

ctx.fillRect(210 - 40, 200 - 30, 15, 100);
ctx.fillRect(350 - 40, 200 - 30, 15, 100);
ctx.fillRect(260 - 40, 200 - 30, 60, 200);

// 원 만들기
// arc(x, y, radius, startAngle, endAngle)
ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white"
ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.fill();

// 컬러 추출하기

[flat ui colors](https://flatuicolors.com/palette/us)

// 마우스를 올렸을 때 그림 그리기

const colors = [
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#dfe6e9"
]

function onClick(event) {
  ctx.beginPath();
  ctx.moveTo(400, 400);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
canvas.addEventListener("mousemove", onClick);

```