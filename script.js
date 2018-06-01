//INIZIALIZZAZIONI
function setup(){
	//canvas
	width=1000;
	height=500;
	createCanvas(width, height);
	//noStroke();
	//name generator
	ng=new JapaneseNameGenerator(2,6);
	var name="";
	name+=ng.generateName()+" "+ng.generateName();
    document.getElementById("name").value = name;
    //quadrati
    quadrati = [];

	generate();
}

//GENERA IL TERRENO
function generate(){
	//prende come seed il valore dell'input box
	var name=document.getElementById("name").value;
	//trasformo il nome della zona in un numero(per poter essere utilizzato come seed)
	seedName=0;
	for(var i=0; i<name.length; i++){
		seedName+=(name.charCodeAt(i)*Math.pow(10,i));
	}
	noiseSeed(seedName);

	background(0);
    resolution = 40; //risoluzione dell'mmagine(grandezza dei quadrati)

    generaQuadrati();

    var i = 0;
    for (var y = 0; y < height; y += resolution) { //per ogni quadrato del canvas
        for (var x = 0; x < width; x += resolution) {
            fill(quadrati[i].r, quadrati[i].g, quadrati[i].b);
            rect(quadrati[i].x, quadrati[i].y, quadrati[i].w, quadrati[i].h);
            i++;
        }
    }
	
}

function generaQuadrati() {
    for (var y = 0; y < height; y += resolution) { //per ogni quadrato del canvas
        for (var x = 0; x < width; x += resolution) {
            z = 255 * noise(x * 0.005, y * 0.005); //genera un colore con perlin noise con valori x e y
            
            if (noise(x * 0.01, y * 0.01) < 0.4) { //se il noise è minore di 0.4 ()genera valori tra 0 e 1), allora è acqua
                color = "24, 64, 216";
                r = 24;
                g = 64;
                b = 216;
            }
            else { //altrimenti è terreno
                r = z - 20;
                g = z + 30;
                b = z - 15;
            }
            var q = new Quadrato(x, y, resolution, resolution, r, g, b);
            quadrati.push(q);
        }
    }
}

function Quadrato(x, y, w, h, r, g, b) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.g = g;
    this.b = b;
}

