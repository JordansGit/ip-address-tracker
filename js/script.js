const ipAddressEl = document.getElementById('ip-address');
const locationOutputEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');
const form = document.querySelector('form')

let userLat = 51.505
let userLon = -0.09


// Create Map  
var map = L.map('map').setView([userLat, userLon], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Create Marker Icon 
var customIcon = L.icon({
  iconUrl: './images/icon-location.svg',

  iconSize:     [46, 56], // size of the icon
  iconAnchor:   [22, 36], // point of the icon which will correspond to marker's location
});

// Instantiate Marker Icon, Add It To Map.
var marker = L.marker([userLat, userLon], {icon: customIcon}).addTo(map);



// Event Listeners 
window.addEventListener("load", getUserIp)

form.addEventListener('submit', function(e) {
  let searchbar = document.getElementById('searchbar')

  e.preventDefault()

  getIpInfo(searchbar.value)
})


// Functions 
async function getIpInfo(ipAddress) {
  const res = await fetch(`http://ip-api.com/json/${ipAddress}`)
  const data = await res.json()

  console.log(data)

  if (data.status === 'success') {
    // update info display 
    ipAddressEl.textContent = data.query
    locationOutputEl.textContent = `${data.city}, ${data.country}`
    timezoneEl.textContent = `${data.timezone}`
    ispEl.textContent = data.isp

    // update map
    userLat = data.lat
    userLon = data.lon
    map.panTo([userLat, userLon]);

    marker.remove(); // remove previous marker 
    marker = L.marker([userLat, userLon], {icon: customIcon}).addTo(map); // add new marker 
  }
}


// get user IP and display map location + IP info 
async function getUserIp() {
  let userIp 

  // get user IP
  const res = await fetch('https://ipv4.jsonip.com')
  const data = await res.json()

  userIp = data.ip.toString()
  console.log(`User IP: ${userIp}`); 
  
  // get IP info & map location & display them 
  getIpInfo(userIp)
}