let canvas; 
let ctx; 
let pixelSize = 15; 

export function initCanvas(canvasId, options = {}) {
  canvas = document.getElementById(canvasId);
  if (!canvas) {
    throw new Error(`Canvas with id "${canvasId}" not found`);
  }

  ctx = canvas.getContext("2d");

  pixelSize = options.pixelSize ?? pixelSize;

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


export function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


export function project_to_screen(point) {
  // NDC
  return { 
    x: (point.x + 1) / 2 * canvas.width, 
    y: (1-(point.y + 1) / 2) * canvas.height,
  }
}


export function convert_3d_to_2d_point(point) {
  // const scale = 1; //zoom 
  // const z = point.z; //pushes shape away from camera
  return {
    x: (point.x / point.z),
    y: (point.y / point.z),
  }
}

export function rotate_xz(point, angle){
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: point.x * c - point.z * s,
    y: point.y,
    z: point.x * s + point.z * c, 
  };
}

export function translate_z(point,dz) {
  return {
    x: point.x,
    y: point.y, 
    z: point.z + dz
  }
}
export function drawPoint(p){
    let point = project_to_screen(convert_3d_to_2d_point(p));
    
    ctx.fillStyle = "green";
    ctx.fillRect(point.x - pixelSize/2, point.y - pixelSize/2,pixelSize, pixelSize);
}

export function drawLine(p1 ,p2){
    //convert 
  let point1 = project_to_screen(convert_3d_to_2d_point(p1));
  let point2 = project_to_screen(convert_3d_to_2d_point(p2));
    
  ctx.strokeStyle = "green";
  ctx.lineWidth = 4; 

  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.stroke();
}
