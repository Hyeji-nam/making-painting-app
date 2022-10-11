const saveBtn = document.getElementById("save")
const textInput = document.getElementById("text")
const fileInput = document.getElementById("file")
const modeBtn = document.getElementById("mode-btn")
const destroyBtn = document.getElementById("destroy-btn")
const eraserBtn = document.getElementById("eraser-btn")
// Array.from() : 배열로 만들기
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color")
const lineWidth = document.getElementById("line-width")
const canvas = document.querySelector("canvas");
// context(ctx) = brush
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"
let isPainting = false; 
let isFilling = false;


function onMove(event) {
  // isPainting이 true면 그림 그리기
  if(isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  
  // isPainting이 false면 브러쉬만 움직이기
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting () {
  isPainting = true;
}

function cancelPainting () {
  isPainting = false;
  // 사용자가 선을 그리는 게 끝나면 새로운 path를 시작
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;

  // 사용자에게 색상 알려주기
  color.value = colorValue;
}

function onModeClick () {
  if (isFilling) {
    isFilling = false
    modeBtn.innerText = "Fill"
  } else {
    isFilling = true
    modeBtn.innerText = "Draw"
  }
}

function onCanvasClick() {
  if(isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill"
}

function onFileChange (event) {
  // file 가져오기
  // input tag에 multiple 속성을 사용하면 파일을 여러 개 불러 올 수 있음
  // 여기서는 파일 1개만 허용되기 때문에 file 배열의 첫 번째만 가져옴
  const file = event.target.files[0];

  // 해당 file을 가리키는 url 얻기
  // 유저가 파일을 업로드한 브라우저 안에서만 사용 가능한 url
  const url = URL.createObjectURL(file);

  // = document.createElement("img")
  const image = new Image();
  image.src = url;
  image.onload = function () {
    // ctx.drawImage(image, x, y, width, height)
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  }
}

function onDoubleClick (event) {
  const text = textInput.value;
  if (text !== "") {
  // save(): ctx의 현재 상태를 저장
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "68px sans-serif"
  ctx.fillText(text, event.offsetX, event.offsetY);
  // restore(): 기존으로 돌아감
  ctx.restore();
  }
}

function onSaveClick () {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  // download : "파일명"으로 저장
  a.download = "myDrawing.png";
  // 다운로드 창을 띄워줌
  a.click();
}

// dbclick : mouseup, mousedown이 매우 빠르게 일어나는 것
canvas.addEventListener("dblclick", onDoubleClick)
canvas.addEventListener("mousemove", onMove); // = convas.onmousemove = onMove
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick); 
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);







