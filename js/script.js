let ipAddressEl = document.getElementById('ip-address');
let locationOutputEl = document.getElementById('location');
let timezoneEl = document.getElementById('timezone');
let ispEl = document.getElementById('isp');

let userLat = 51.505
let userLon = -0.09
// let userLat = 51.3981801 
// let userLon = 0.5521803

// get user's lon lat. NOTE:
navigator.geolocation.getCurrentPosition((position) => {
  userLat = position.coords.latitude
  userLon = position.coords.longitude
});
console.log(userLat, userLon)
setTimeout(x, 1000)
function x (){
  console.log(userLat, userLon)
}



// map 
var map = L.map('map').setView([userLat, userLon], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// create marker icon 
var customIcon = L.icon({
  iconUrl: './images/icon-location.svg',

  iconSize:     [46, 56], // size of the icon
  iconAnchor:   [22, 36], // point of the icon which will correspond to marker's location
});

// instantiate marker icon, add it to map.
var marker = L.marker([userLat, userLon], {icon: customIcon}).addTo(map);

// map.on('click', onMapClick); // event listener 



// click events 
// function onMapClick(e) {
//   marker.remove(); // remove previous marker 
//   console.log("You clicked the map at " + e.latlng);
//   marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: customIcon}).addTo(map); // add new marker 
//   marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); // add popup to new marker 

//   ipAddressEl.textContent = 'ip address';
//   locationOutputEl.textContent = 'location';
//   timezoneEl.textContent = 'timezone';
//   ispEl.textContent = 'isp';
//   console.log(e);
// }


// form 
let form = document.querySelector('form');
let searchbar = document.getElementById('searchbar');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  getIpInfo(searchbar.value)
  console.log(e)
})

/* 
search for IP address or domain and see key information. specifically: 
  ip address 
  location
  timezone 
  ISP 
load user's ip address & location on initial page load. 
*/ 





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

    console.log(data.lat)
    console.log(data.lon)
    console.log(data.query)
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
window.addEventListener("load", getUserIp)



  // this all fails because I'm not it's not running synchronously. I need to use await. 
  // use type = module. then await for the stuff on page load. 




/* UPDATE 
  ** ENDING PROJECT HERE, WON'T CONTINUE ANY MORE. 

  I can't get lon lat from IP address search because you need the paid version to do that. 
  so this ends this project. 

  If I could get lat lon, I would: 
    get lat,lon from geo.ipify fetch call. 
    searches would not only update the info section but would change map to location aswell. 

    on page load, i'd call getCurrentPosition() to get user's lon,lat & update the map. 
      if no lon, lat is given, i'd use the default lon lat.  
      - I could do this now but i'd need to learn how to call this function w/ await 

    unsure how i'd get the users IP address on page load. 
      maybe a search query using the lon lat on geo.ipify would give me the ip address. 

  I cba to continue the project from here. will move on. 

  i'm guessing the api changed their free use because idk what frontendmentor would include this API in their recommended projects otherwise. 

  -----------------------
  **UPDATE 
  using a different API. provides everything I need except timezone data isn't in words instead of numbers 
*/ 