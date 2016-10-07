/*
Title: MyRide.io
Authors: Kandance Ferguson, Johnny Garces
*/

var authorInfo = {
  author: 'Kandance Ferguson and Johnny Garces',
  title: 'MyRide.io'
}

authorInfo = JSON.stringify(authorInfo);
console.log(authorInfo);

//var elements
var mapDiv = document.getElementById('map');
var outputTest = document.getElementById('location-test');
var latOutput = document.getElementById('lat-location');
var lngOutput = document.getElementById('lng-location');
//HTML 5 navigator geolocation

//Does geolocation exist in this browser?

if(!navigator.geolocation){
  outputTest.innerHTML = 'Geoocation is supported in your browser';
}else{
  outputTest.innerHTML = 'Your map will come up real quick... WE DA BEST!!!';
}

//define success callback function that will return coordinates once HTML5 api completes

function success(position){
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  console.log(lat, lng);
  outputTest.innerHTML = '';
  latOutput.innerHTML = lat;
  lngOutput.innerHTML = lng;
  //display the coordinates in a google map
  var center = new google.maps.LatLng(lat,lng);

  //map options for displaying on the map go here
  var mapOptions = {
    zoom: 16,
    center: center
  }
  //display the map
  var map = new google.maps.Map(mapDiv, mapOptions);
  //instantiate a bounds so that the map can be properly displayed within bounds
  var bounds = new google.maps.LatLngBounds();

  //display Marker
  var marker = new google.maps.Marker({
    position: center,
    map: map,
    title: 'Hello World!',
    animation: google.maps.Animation.DROP
  });
  console.log(marker.position);
  //fit bounds
  bounds.extend(marker.position);
  //display outputlocation

}

//define error callback function if coordinates are not found or some error happens

function error(){
  alert('Unable to find your location :((');
}

navigator.geolocation.watchPosition(success, error, {
  timeout: 120000,
  enableHighAccuracy: true,
  maximumAge: 1000
});
