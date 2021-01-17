 let map;

 function initMap() {
     let losAngeles = {
         lat: 34.063380,
         lng: -118.358080
     };
     map = new google.maps.Map(document.getElementById("map"), {
         center: losAngeles,
         zoom: 8
     });
     createMarker();
 }

 const createMarker = () => {
     let marker = new google.maps.Marker({
         position: {
             lat: 34.063380,
             lng: -118.358080
         },
         map: map
     });
 }