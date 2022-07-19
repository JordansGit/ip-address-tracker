// map 
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// marker 
var customIcon = L.icon({
  iconUrl: './images/icon-location.svg',

  iconSize:     [46, 56], // size of the icon
  iconAnchor:   [22, 36], // [22, 56] point of the icon which will correspond to marker's location
});

var marker = L.marker([51.5, -0.09], {icon: customIcon}).addTo(map);

//var marker = L.marker([51.5, -0.09]).addTo(map);  // this is the code for the default marker. 


// popup 
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);


// click events 
function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);
