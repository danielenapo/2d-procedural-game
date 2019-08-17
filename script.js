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
    resolution = 15; //risoluzione dell'mmagine(grandezza dei quadrati)
    quadrati = [];
    //opzon bioma
    waterLevel = 0.35;
    lGrassLevel = 0.55;
    randomTreasure = 0.005;
    noiseValue = 0;
    //player
    maxHealth=100
    playerSpeed=3;
    playerPos=[];   //playerPos is an array of two elements and it determines the pposition of the player in the quadrati matrix
    playerPos.push(0); //playerPos[0] is x value
    playerPos.push(0); //playerPos[1] is y value
    player = new Player(playerPos[0], playerPos[1], resolution, resolution, playerSpeed, maxHealth);
    speedCounter = 6;

    //canvas
    width=50*resolution;
    height=30*resolution;
    createCanvas(width, height);
    noStroke();

    //generate world
	generateChunk();


}




function draw() {
    controlli();

    //stampa quadrati
    for (var x = 0; x < width * 2; x += resolution) { //per ogni quadrato del canvas
        for (var y = 0; y < height * 2; y += resolution) {
            fill(quadrati[x][y].r, quadrati[x][y].g, quadrati[x][y].b);
            rect(quadrati[x][y].x, quadrati[x][y].y, quadrati[x][y].w, quadrati[x][y].h);
        }
    }

    //stampa giocatore
    fill(0);
    rect(player.x, player.y, player.w, player.h);
}

//CONTROLLI CICLICI
function controlli() {
    //CONTROLLO TASTI PREMUTI       
    if (keyIsDown(RIGHT_ARROW) && quadrati[playerPos[0]+resolution][playerPos[1]].r != 24 && speedCounter > player.speed) {
        playerPos[0]+=resolution;
        player.x += resolution;
        speedCounter = 0;
    }
    else if (keyIsDown(LEFT_ARROW) && quadrati[playerPos[0]-resolution][playerPos[1]].r != 24 && speedCounter > player.speed){
        playerPos[0]-=resolution;
        player.x -= resolution;
        speedCounter = 0;
    }
    else if (keyIsDown(UP_ARROW) && quadrati[playerPos[0]][playerPos[1]-resolution].r != 24 && speedCounter > player.speed){
        playerPos[1]-=resolution;
        player.y -= resolution;
        speedCounter = 0;
    }
    else if (keyIsDown(DOWN_ARROW) && quadrati[playerPos[0]][playerPos[1]+resolution].r!= 24 && speedCounter > player.speed){
        playerPos[1]+=resolution;
        player.y += resolution;
        speedCounter = 0;
    }
    speedCounter++;
}


//GENERA CHUNK
function generateChunk() {
    for (var x = 0; x < width * 2; x += resolution) { //per ogni quadrato del canvas
        quadrati[x]=new Array();
        for (var y = 0; y < height * 2; y += resolution) {
            noiseValue = noise(x * 0.005, y * 0.005)
            z = 255 * noiseValue; //genera un colore con perlin noise con valori x e y

            if (noiseValue > waterLevel && Math.random() <= randomTreasure) {
                r = 255;
                g = 255;
                b = 0;
                quadrato = new Quadrato(x, y, resolution, resolution, r, g, b, true);
                quadrati[x][y]=quadrato;
            }
            else {
                if (noiseValue < waterLevel) { //se il noise è minore di 0.4 ()genera valori tra 0 e 1), allora è acqua
                    r = 24;
                    g = 64;
                    b = 216;
                }
                else if (noiseValue > waterLevel && noise(x * 0.01, y * 0.01) < lGrassLevel) { //altrimenti è terreno
                    r = 70;
                    g = 127;
                    b = 0;
                }
                else { //altrimenti è erba alta
                    r = 42;
                    g = 76;
                    b = 0;
                }
                var q = new Quadrato(x, y, resolution, resolution, r, g, b, false);
                quadrati[x][y]=q;
            }
        }
    }
}

function trovaQuadrato(cercaX, cercaY){
    var i = 0;
    for (var y = 0; y < height * 2; y += resolution) { //per ogni quadrato del canvas
        for (var x = 0; x < width * 2; x += resolution) {         
            if (y == cercaY && x==cercaX)
                return quadrati[i].r;
            i++;
        }
    }

}