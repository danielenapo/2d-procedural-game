function JapaneseNameGenerator(min, max){
  this.list=["a","i","u","e","o","ka","ki","ku","ke","ko","ta","chi","tsu","te","to","sa","shi","su","se","so","na","ni","nu","ne","no","n","ha","hi","fu","he","ho","ma","mi","mu","me","mo","ya","yu","yo","ra","ri","ru","re","ro","wa","wo"];
  this.name="";
  this.min= min;
  this.max= max;

  this.generateName= function(){
    name="";
    if(this.min==undefined || this.max==undefined){
      this.min= 2;
      this.max= 5;
    }
    multiplier=this.max-this.min;
    length=Math.floor((Math.random()*multiplier)+min);
    for(var i=0; i<length; i++){
      name+=this.list[Math.floor(Math.random()*this.list.length)];
    }
    return name;
  }

}
