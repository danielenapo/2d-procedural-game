//INIZIALIZZAZIONI
function setup(){
	//name generator
	ng=new JapaneseNameGenerator(2,6);
	var name="";
	name+=ng.generateName()+" "+ng.generateName();
    document.getElementById("name").value = name;
    var name = document.getElementById("name").value;
    frameRate(30);
    //seed
    seedName = 0;
    for (var i = 0; i < name.length; i++) {
        seedName += (name.charCodeAt(i) * Math.pow(10, i));
    }
    noiseSeed(seedName);
    background(0);
    //quadrati
    res = 15; //risoluzione dell'mmagine(grandezza dei quadrati)
    quadrati = [];
    //opzon bioma
    waterLevel = 0.35;
    lGrassLevel = 0.60;
    randomTreasure = 0.0005;
    noiseValue = 0;
    //player
    maxHealth=100
    playerSpeed=1;
    player = new Player(0,0, res, res, playerSpeed, maxHealth);
    speedCounter = 6;
    //enemy
    enemy = new Enemy(10,0, res, res, playerSpeed, maxHealth);
    //canvas
    width=30*res;
    height=15*res;
    createCanvas(width, height);
    noStroke();

    generateChunk(0,0);
    camera=quadrati;    //quadrati da visualizzare, come una telecamera che vede dall'alto il giocatore
    generateChunk(0,-height);
    generateChunk(0,height);
    generateChunk(width,0);
    generateChunk(-width,0);
    generateChunk(width, height);
    generateChunk(width, -height);
    generateChunk(-width, height);
    generateChunk(-width, -height);

}




function draw() {
    controlli();
    //stampa quadrati
    for (var x =0; x < width/res; x += 1) { //per ogni quadrato del canvas
        for (var y = 0; y<height/res; y += 1) {
            fill(camera[x][y].r, camera[x][y].g, camera[x][y].b);
            rect(camera[x][y].x*res, camera[x][y].y*res, camera[x][y].w, camera[x][y].h);
        }
    }

    //stampa giocatore
    fill(0);
    rect((player.x)*res, (player.y)*res, player.w, player.h);
    //stampa nemico
    if(enemy.health>0){
        fill("red");
        rect((enemy.x)*res, (enemy.y)*res, enemy.w, enemy.h);
    }
}

//CONTROLLI CICLICI
function controlli() {
    //TASTI PREMUTI       
    if (keyIsDown(RIGHT_ARROW) && quadrati[player.x+1][player.y].r != 24 && speedCounter > player.speed) {
        player.x += 1;
        speedCounter = 0;
       // shiftCamera();
       // console.log(camera[width/res][player.y])
    }
    else if (keyIsDown(LEFT_ARROW) && quadrati[player.x-1][player.y].r != 24 && speedCounter > player.speed){
        player.x -= 1;
        speedCounter = 0;
    }
    else if (keyIsDown(UP_ARROW) && quadrati[player.x][player.y-1].r != 24 &&  speedCounter > player.speed){
        player.y -= 1;
        speedCounter = 0;
    }
    else if (keyIsDown(DOWN_ARROW) && quadrati[player.x][player.y+1].r!= 24 && speedCounter > player.speed){
        player.y += 1;
        speedCounter = 0;
    }
    speedCounter++;

    //NEMICO
    if(player.x==enemy.x && player.y==enemy.y){
        if(keyIsDown(32))
            enemy.health=0;
    }
    if(enemy.health<=0)
        enemy.x=width+1;

}


//GENERA CHUNK
function generateChunk(cx, cy) {
    for (var x = (cx/res); x < (width+cx)/res ; x += 1) { //per ogni quadrato del canvas
        if(!Array.isArray(quadrati[x]))
            quadrati[x]=new Array();
        for (var y = (cy/res); y < (height+cy)/res ; y += 1) {
            noiseValue = noise(x * 0.08, y* 0.08)
            z = 255 * noiseValue; //genera un colore con perlin noise con valori x e y

            if (noiseValue > waterLevel && Math.random() <= randomTreasure) {
                r = 255;
                g = 255;
                b = 0;
                quadrato = new Quadrato(x, y, res, res, r, g, b, true);
                quadrati[x][y]=quadrato;
            }
            else {
                if (noiseValue < waterLevel) { //se il noise è minore di 0.4 ()genera valori tra 0 e 1), allora è acqua
                    r = 24;
                    g = 64;
                    b = 216;
                }
                else if (noiseValue > waterLevel && noiseValue < lGrassLevel) { //altrimenti è terreno
                    r = 70;
                    g = 127;
                    b = 0;
                }
                else { //altrimenti è erba alta
                    r = 42;
                    g = 76;
                    b = 0;
                }
                var q = new Quadrato(x, y, res, res, r, g, b, false);
                quadrati[x][y]=q;
            }
        }
    }
}


function shiftCamera() {
   for (var x =0; x < width/res; x += 1) { //per ogni quadrato del canvas
        camera[x].shift();
        camera[x].push(quadrati[width/res+x][player.y])
    }
}




/*LIST OF GOOD SEEDS
yarumusawa hamiru

*/