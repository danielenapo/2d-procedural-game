//INIZIALIZZAZIONI
function setup(){
	//canvas
	width=1000;
	height=500;
	createCanvas(width, height);
	noStroke();
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
    resolution = 30; //risoluzione dell'mmagine(grandezza dei quadrati)
    quadrati = [];
    //opzon bioma
    waterLevel = 0.35;
    lGrassLevel = 0.6;
    randomTreasure = 0.005;
    noiseValue = 0;
    //player
    player = new Player(0, 0, resolution, resolution, 5, 100);
    speedCounter = 6;


	generateChunk();
}




function draw() {
    controlli();

    //stampa quadrati
    var i = 0;
    for (var y = 0; y < height * 2; y += resolution) { //per ogni quadrato del canvas
        for (var x = 0; x < width * 2; x += resolution) {
            fill(quadrati[i].r, quadrati[i].g, quadrati[i].b);
            rect(quadrati[i].x, quadrati[i].y, quadrati[i].w, quadrati[i].h);
            i++;
        }
    }

    //stampa giocatore
    fill(0);
    rect(player.x, player.y, player.w, player.h);
}

//CONTROLLI CICLICI
function controlli() {

    //CONTROLLO TASTI PREMUTI
    if (keyIsDown(RIGHT_ARROW) && trovaQuadrato(player.x + resolution, player.y) != 24 && speedCounter > player.speed) {
        player.x += resolution;
        speedCounter = 0;
    }
    else if (keyIsDown(LEFT_ARROW) && trovaQuadrato(player.x - resolution, player.y) != 24 && speedCounter > player.speed){
        player.x -= resolution;
        speedCounter = 0;
    }
    else if (keyIsDown(UP_ARROW) && trovaQuadrato(player.x, player.y - resolution) != 24 && speedCounter > player.speed){
        player.y -= resolution;
        speedCounter = 0;
    }
    else if (keyIsDown(DOWN_ARROW) && trovaQuadrato(player.x, player.y + resolution) != 24 && speedCounter > player.speed){
        player.y += resolution;
        speedCounter = 0;
    }

    speedCounter++;



}


//GENERA CHUNK
function generateChunk() {
    for (var y = 0; y < height * 2; y += resolution) { //per ogni quadrato del canvas
        for (var x = 0; x < width * 2; x += resolution) {
            noiseValue = noise(x * 0.005, y * 0.005)
            z = 255 * noiseValue; //genera un colore con perlin noise con valori x e y

            if (noiseValue > waterLevel && Math.random() <= randomTreasure) {
                r = 255;
                g = 255;
                b = 0;
                quadrato = new Quadrato(x, y, resolution, resolution, r, g, b, true);
                quadrati.push(quadrato);
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
                else {
                    r = 42;
                    g = 76;
                    b = 0;
                }
                var q = new Quadrato(x, y, resolution, resolution, r, g, b, false);
                quadrati.push(q);
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