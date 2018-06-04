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
    //quadrati
    quadrati = [];
    waterLevel = 0.35;
    lGrassLevel = 0.6;
    randomTreasure = 0.005;
    noiseValue = 0;
	generateChunk();
}

//GENERA IL TERRENO
function generateChunk(){
	//prende come seed il valore dell'input box
	var name=document.getElementById("name").value;
	//trasformo il nome della zona in un numero(per poter essere utilizzato come seed)
	seedName=0;
	for(var i=0; i<name.length; i++){
		seedName+=(name.charCodeAt(i)*Math.pow(10,i));
	}
	noiseSeed(seedName);

	background(0);
    resolution = 30; //risoluzione dell'mmagine(grandezza dei quadrati)

    generaQuadrati();


	
}

function generaQuadrati() {
    for (var y = 0; y < height; y += resolution) { //per ogni quadrato del canvas
        for (var x = 0; x < width; x += resolution) {
            z = 255 * noise(x * 0.005, y * 0.005); //genera un colore con perlin noise con valori x e y

            if (noise(x * 0.005, y * 0.005)> waterLevel && Math.random() <= randomTreasure) {
                r = 255;
                g = 255;
                b = 0;
                quadrato= new Quadrato(x, y,resolution, resolution, r, g, b, true);
                quadrati.push(quadrato);
            }

            else {
                if (noise(x * 0.005, y * 0.005) < waterLevel) { //se il noise è minore di 0.4 ()genera valori tra 0 e 1), allora è acqua
                    r = 24;
                    g = 64;
                    b = 216;
                }
                else if (noise(x * 0.005, y * 0.005) > waterLevel && noise(x * 0.01, y * 0.01) < lGrassLevel) { //altrimenti è terreno
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

function draw() {
    var i = 0;
    for (var y = 0; y < height * 2; y += resolution) { //per ogni quadrato del canvas
        for (var x = 0; x < width * 2; x += resolution) {
            fill(quadrati[i].r, quadrati[i].g, quadrati[i].b);
            rect(quadrati[i].x, quadrati[i].y, quadrati[i].w, quadrati[i].h);
            i++;
        }
    }
}
