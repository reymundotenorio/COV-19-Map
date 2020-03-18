// Variables
var virusData = [];
var state = "";
var country = "";
var lastUpdate = "";
var confirmed = "";
var deaths = "";
var recovered = "";
var lat = "0";
var long = "0";

var place = "";

var deathsRate = 0;
var recoveredRate = 0;

var cov_19_map = "";
var tile = "";


function initMap(){
  cov_19_map = L.map('cov_19_map').setView([23.6, 11.6], 3);

  tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:
    'COV-19 Map created by &copy; <a href="https://ni.js.org/" target="_blank">JavaScript Nicaragua</a>, ' +
    'Data Repository by <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Johns Hopkins CSSE</a>, ' +
    'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, Imagery © ' +
    '<a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
    id: 'mapbox/dark-v10',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmV5bXVuZG90ZW5vcmlvIiwiYSI6ImNrN3czMWh0bDAwMjgzbW80cWh4Zjk1M3QifQ.ossT_YGTfaI8I-cZPkbpcg'
  }).addTo(cov_19_map);
}
// Marker
// var marker = L.marker([23.6, 11.6]).addTo(cov_19_map);

// Polygon
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(cov_19_map);

function resetData() {
  state = "";
  country = "";
  lastUpdate = "";
  confirmed = "";
  deaths = "";
  recovered = "";
  place = "";
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function drawInfection(state, country, lastUpdate, confirmed, deaths, recovered, lat, long){
  // Reset data
  resetData();

  place = (state != "" ? `${state}, ${country}` : `${country}`);
  deathsRate = (parseInt(deaths) / parseInt(confirmed)) * 100;
  recoveredRate = (parseInt(recovered) / parseInt(confirmed)) * 100;

  var radius = (parseInt(confirmed) * 20);

  if (radius < 50000){
    radius = 50000;
  }
  else if (radius > 500000){
    radius = 500000;
  }

  // Circle
  var circle = L.circle([parseFloat(lat), parseFloat(long)], {
    color: '#C70039',
    fillColor: '#C70039',
    fillOpacity: 0.5,
    radius: radius
  }).addTo(cov_19_map);

  circle.bindPopup(
    `<div class="detail-popup">
    <p class="place">${place}</p>

    <p class="confirmed">Confirmed: <span>${formatNumber(confirmed)}</span></p>
    <p class="deaths">Deaths: <span>${formatNumber(deaths)} (${deathsRate.toFixed(2)}%)</span></p>
    <p class="recovered">Recovered: <span>${formatNumber(recovered)} (${recoveredRate.toFixed(2)}%)</span></p>

    <p class="lastUpdate">${moment(lastUpdate).format("MMMM do, YYYY - HH:mm")}</p>
    </div>`
  );

  // circle.openPopup();
}


$(document).ready(function() {

  // Init Map
  initMap();

  $.get( "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-16-2020.csv", function(response) {
    virusData = $.csv.toArrays(response);
    // console.log(virusData);


    $.each(virusData, function(index, value) {
      if (index != 0){
        // Assign data
        state = value[0];
        country = value[1];
        lastUpdate = value[2];
        confirmed = value[3];
        deaths = value[4];
        recovered = value[5];
        lat = value[6];
        long = value[7];

        console.log(lastUpdate);

        drawInfection(state, country, lastUpdate, confirmed, deaths, recovered, lat, long);
      }
    });
  });


});
