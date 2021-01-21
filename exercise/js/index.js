 let map;
 let infoWindow;
 /*pass:  Database7*/
 *
 /

 function initMap() {
     let losAngeles = {
         lat: 34.063380,
         lng: -118.358080
     };
     map = new google.maps.Map(document.getElementById("map"), {
         center: losAngeles,
         zoom: 8
     });
     infoWindow = new google.maps.InfoWindow();
     getStores();

 }

 const getStores = () => {
     const API_URL = `http://localhost:3000/api/stores`;
     fetch(API_URL).then((response) => {
         if (response.status == 200) {
             return response.json();
         } else {
             throw new Error(response.status);
         }
     }).then((data) => {
         searchLocationsNear(data);
     });
 }

 const searchLocationsNear = (stores) => {
     stores.forEach((store, index) => {
         let latlng = new google.maps.LatLng(
             store.location.coordinates[1],
             store.location.coordinates[0]);
         let name = store.storeName;
         let address = store.addressLines[0];
         let phone = store.phoneNumber;
         let openStatusText = store.openStatusText;
         bounds.extend(latlng);
         createMarker(latlng, name, address, openStatusText, phone, index + 1);
     });
     map.fitBounds(bounds);
 }

 const createMarker = (latlng, name, address, openStatusText, phone, storeNumber) => {
     let html = `
     <div class="store-info-window">
     <div class="store-info-name">${name}</div>
     <div class="store-info-open-status">${openStatusText}</div>
     <div class="store-info-address">
     <div class="icon">
     <i class="fas fa-location-arrow" ></i>
     </div>
     <span>${address}</span></div>
     <div class="store-info-phone">
     <div class="icon"><i class="fas fa-phone-alt"></i></div>
     <span><a href="tel:${phone}">${phone}</a>
     </span>
     </div>
     </div>
     `;

     let marker = new google.maps.Marker({
         position: latlng,
         map: map,
         label: `${storeNumber}`
     });

     google.maps.event.addEventListener(marker, 'click', function() {
         infoWindow.setContent(html);
         infoWindow.open(map, marker);
     })
 }