var mapimg;

var clat = 0;
var clon = 0;

//Shanghai latitude and longitude; 31.2304° N, 121.4737°
//var lat = 31.2304;
//var lon = 121.4737;
var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

var colourchange;
//var colour;

//this is preloading in the map image by using the api
function preload() {
mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
  clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
  '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');//my api key
//load strings is loading in the data from the source
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

//converting the location so can draw it
function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan( PI/4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(ww,hh);//creating a canvas
  translate(width / 2, height / 2)//moving the canvas to the middle
  imageMode(CENTER);// changes where the image is drawn from
  image(mapimg, 0, 0);

    var cx = mercX(clon);
    var cy = mercY(clat);

//looping the arrays and splitting up the data into more manageable variables
    for (var i = 1; i < earthquakes.length; i++) {
      var data = earthquakes[i].split(/,/);
      console.log(data);
      var lat = data[1];
      var lon = data[2];
      var mag = data[4];
      var x = mercX(lon) - cx;// converts it to an x and y so can draw an ellipse
      var y = mercY(lat) - cy;
      // This addition fixes the case where the longitude is non-zero and
      // points can go off the screen.
      if(x < - width/2) {
        x += width;
      } else if(x > width / 2) {
        x -= width;
      }
      mag = pow(10, mag);//sets the mag variable to power of 10
      mag = sqrt(mag);//sets the square root of the magnitude
      var magmax = sqrt(pow(10, 10));// gets a new maximum magnitude
      var d = map(mag, 0, magmax, 0, 180);//sets the diameter in order to map the ellipses
      stroke(255, 0, 255);//adds a stroke to the ellipses
      fill(random(100,255), random(100,255), random(100,255)); // fills the ellipses with a random colour
      //colour = (255,0, 255,0);
      ellipse(x, y, d*2, d*2);// drawing the ellipses onto the canvas
}}

//tried incorparating a button which could change the colour of the data but it was messing with accessing my data and however couldn't incorparate it
/*colourchange = createButton('change colours');
colourchange.position(10,550);
colourchange.mousePressed(changecolour);
}

function draw() {
  fill(colour);

function changecolour() {
  stroke(255,0, 255);
  fill(0,255, 0);
  console.log('green');
}}}*/
