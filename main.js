var canvas = document.getElementById('canvas');
var particles = [];
var tick = 0;
var count = 0;
var scores=0;
                   
function loop() {	    
    if(count >=1){
        createParticles(); 
        drawParticles();    
        updateParticles();    
        killParticles();
		document.getElementById('start').removeEventListener("click", loop)
		}
}
function randColor() {
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}
function createParticles() {
    if(tick % 20 == 0) {
         if(particles.length < 30) { 
            particles.push({
                    x: Math.random()*canvas.width,
                    y: 0,
                    speed: 2+Math.random(), 
                    color: randColor(),
            });
         } 
    }
}
function turn(event){
	if(event.target.id == "start"){	count++; score.innerText =0;scores=0; }
	else if(event.target.id == "stop"){	
	count = 0;
	particles.length = 0;
	document.getElementById('start').addEventListener('click', loop)
   }
}
 function updateParticles() {
	tick++
	for(let i = 0; i < particles.length; i++) {   	
	      	particles[i].y += particles[i].speed
	   }}
function killParticles() {
    for(var i in particles) {
        var part = particles[i];
        if(part.y > canvas.height) {
            part.y = 0;
        }
    }
}

function drawParticles() {
    var c = canvas.getContext('2d');
    c.fillStyle = "yellow";
    c.fillRect(0,0,canvas.width,canvas.height);
    for(var i in particles) {
        var part = particles[i];
        c.beginPath();
        c.rect(part.x, part.y, 30, 30);
        c.closePath();
        c.fillStyle = part.color;
        c.fill();
    }
}
function getClickXY(event){
	 let x = event.clientX,
	     y = event.clientY;
	     for(let i = 0; i < particles.length; i++){
	                if((y <= (particles[i].y + 30)) && (y >= (particles[i].y - 30)) && (x <= (particles[i].x + 30)) && (x >= (particles[i].x - 30))){
	                particles.splice(i, 1);        
	              	score.innerText = ++scores;
                    if (scores==10){
                        alert("Молодец");
                    }
	         }else{
	     console.log(x +' x '+ y);
	        }
	         }
}
 


document.getElementById('start').addEventListener('click', loop);
document.getElementById('start').addEventListener('click', turn);
document.getElementById("stop").addEventListener('click', turn);
canvas.addEventListener('click', getClickXY, false);
setInterval(loop, 1000 / 60);
