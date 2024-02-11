function calculateAndDisplayRoute() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
  suppressMarkers: true 
  });
  const map = new google.maps.Map(document.getElementById("map"), {
zoom: 7,
center: { lat: 41.85, lng: -87.65 },
disableDefaultUI: true,
});
directionsRenderer.setMap(map);
directionsRenderer.setPanel(document.getElementById("sidebar"));
const startLocation = document.getElementById("start").value;
const endLocation = document.getElementById("end").value;
const geocoder = new google.maps.Geocoder();
geocoder.geocode({ address: startLocation }, (startResults, startStatus) => {
if (startStatus === "OK") {
  const startLatLng = startResults[0].geometry.location;
  geocoder.geocode({ address: endLocation }, (endResults, endStatus) => {
      if (endStatus === "OK") {
          const endLatLng = endResults[0].geometry.location;
          const startMarker = new google.maps.Marker({
              position: startLatLng,
              icon: {
                  url: './assets/images/blue.png',
                  scaledSize: new google.maps.Size(50, 50),
              },
              map: map,
          });
          const endMarker = new google.maps.Marker({
              position: endLatLng,
              icon: {
                  url: './assets/images/yellow.png',
                  scaledSize: new google.maps.Size(50, 50),
              },
              map: map,
          });
          directionsService.route({
              origin: startLatLng,
              destination: endLatLng,
              travelMode: google.maps.TravelMode.DRIVING,
          })
          .then((response) => {
              directionsRenderer.setDirections(response);
              startMarker.setPosition(response.routes[0].legs[0].start_location);
              endMarker.setPosition(response.routes[0].legs[0].end_location);
              // Display duration
              const duration = response.routes[0].legs[0].duration.text;
              document.getElementById("duration").innerText = "Duration: " + duration;
          })
          .catch((e) => window.alert("Directions request failed due to " + status));
      } else {
          window.alert("Geocoding failed for end location due to " + endStatus);
      }
  });
} else {
  window.alert("Geocoding failed for start location due to " + startStatus);
}
});
}