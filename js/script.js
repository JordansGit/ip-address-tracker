let ipAddress = document.getElementById('ip-address');
let locationOutput = document.getElementById('location');
let timezone = document.getElementById('timezone');
let isp = document.getElementById('isp');


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
  iconAnchor:   [22, 36], // point of the icon which will correspond to marker's location
});

// standard icon on page load. 
var marker = L.marker([51.5, -0.09], {icon: customIcon}).addTo(map);


// click events 
function onMapClick(e) {
  marker.remove(); // remove previous marker 
  console.log("You clicked the map at " + e.latlng);
  marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: customIcon}).addTo(map); // add new marker 
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); // add popup to new marker 

  ipAddress.textContent = 'ip address';
  locationOutput.textContent = 'location';
  timezone.textContent = 'timezone';
  isp.textContent = 'isp';
  console.log(e);
}

map.on('click', onMapClick); // event listener 


// form 
let form = document.querySelector('form');
let searchbar = document.getElementById('searchbar');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let IpAddValue = searchbar.value;
  ipAddress.textContent = IpAddValue;
})
