const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const colors = [
	'white',
	'rgba(255, 255, 255, 0.3)',
	'rgba(173, 216, 230, 0.8)',
	'rgba(211, 211, 211, 0.8)',
	'rgba(137, 196, 244, 1)',
	'rgba(0, 0, 255, .155)',
	'rgba(34, 49, 63, .2)',
	'rgba(58, 83, 155, .4)',
];

const [minSize, maxSize] = [0, 40];
const mouseRadius = 60;


const mouse = {
  x: null,
  y: null
};
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// constructor 
function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  // ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.fillStyle = this.color;
  // ctx.strokeStyle = this.color;
  ctx.fill();
  // ctx.stroke();
}

Particle.prototype.update = function() {
  if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
    this.directionX = -this.directionX
  }

  if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
    this.directionY = -this.directionY;
  }

  this.x += this.directionX;
  this.y += this.directionY;

  // mouse interactivity
  if (
		mouse.x - this.x < mouseRadius &&
		mouse.x - this.x > -mouseRadius &&
		mouse.y - this.y < mouseRadius &&
		mouse.y - this.y > -mouseRadius
	) {
		if (this.size < maxSize) {
			this.size += 20;
		}
	} else if (this.size > minSize) {
		this.size -= 0.01;
	}

	if (this.size < 0) {
		this.size = 0;
	}

  this.draw();
}

function init() {
  particleArray = [];
  for (let i = 0; i < 1000; i++) {
    let size = 0;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = (Math.random() * .2) - .1;
    let directionY = (Math.random() * .2) - .1;
    let color = colors[Math.floor(Math.random() * colors.length)];
    
    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();

setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 1000);


document.body.append(canvas);