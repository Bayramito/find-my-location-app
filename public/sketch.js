document.getElementById('send').addEventListener('click', getMyLocation);


const attribution = 'copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    attribution
});

function getMyLocation() {
    if ('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(async position => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;

            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            const mood = document.getElementById('mood').value;
            const data = {
                lon,
                lat,
                mood
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }

            const response = await fetch('/api', options);
            const json = await response.json();
            const mymap = L.map('mapid').setView([json.latitute, json.longitute], 20);
            tiles.addTo(mymap);
            const marker = L.marker([json.latitute, json.longitute]).addTo(mymap);

        });
    } else {
        console.log('GeoLocation is not available');
    }
}