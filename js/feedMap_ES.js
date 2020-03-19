// Variables
var state = '';
var country = '';
var lastUpdate = '';
var confirmed = '';
var deaths = '';
var recovered = '';
var lat = '0';
var long = '0';

var place = '';

var deathsRate = 0;
var recoveredRate = 0;

var covid19Map = '';
var tile = '';

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function initMap(){
  covid19Map = L.map('covid19Map').setView([24, 1], 3);

  tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:
    'COV-19 Map creado por <a href="https://github.com/reymundotenorio" target="_blank">Reymundo Tenorio</a>, ' +
    'Repositorio de datos por <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Johns Hopkins CSSE</a>, ' +
    'Datos del mapa Contribuyentes &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, Imágenes © ' +
    '<a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
    id: 'mapbox/dark-v10',
    maxZoom: 18,
    minZoom: 2,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmV5bXVuZG90ZW5vcmlvIiwiYSI6ImNrN3czMWh0bDAwMjgzbW80cWh4Zjk1M3QifQ.ossT_YGTfaI8I-cZPkbpcg'
  }).addTo(covid19Map);
}

function resetData() {
  state = '';
  country = '';
  lastUpdate = '';
  confirmed = '';
  deaths = '';
  recovered = '';
  place = '';
}

function drawInfection(state, country, lastUpdate, confirmed, deaths, recovered, lat, long){
  // Reset data
  resetData();

  place = (state != '' ? `${state}, ${country}` : `${country}`);
  deathsRate = (parseInt(deaths) / parseInt(confirmed)) * 100;
  recoveredRate = (parseInt(recovered) / parseInt(confirmed)) * 100;

  var radius = (parseInt(confirmed) * 20);

  if (radius < 70000){
    radius = 70000;
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
  }).addTo(covid19Map);

  circle.bindPopup(
    `<div class="detail-popup">
    <p class="place">${place}</p>

    <p class="confirmed">Confirmados: <span>${formatNumber(confirmed)}</span></p>
    <p class="deaths">Muertes: <span>${formatNumber(deaths)} (${deathsRate.toFixed(2)}%)</span></p>
    <p class="recovered">Recuperados: <span>${formatNumber(recovered)} (${recoveredRate.toFixed(2)}%)</span></p>

    <p class="lastUpdate">${moment(lastUpdate).locale('es').format('DD [de] MMMM, YYYY - hh:mm A')}</p>
    </div>`
  );

  // circle.openPopup();
}


$(document).ready(function() {
  // Init Map
  initMap();

  var virusData = [];
  var todayFileName = moment().subtract(1, 'days').format('MM-DD-YYYY');
  var dataURL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${todayFileName}.csv`;

  // console.log(todayFileName);

  var covid19Promise = $.get(dataURL , function(response) {
    virusData = $.csv.toArrays(response);
    // console.log(virusData);

  }).done(function(){

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

        // console.log(lastUpdate);

        drawInfection(state, country, lastUpdate, confirmed, deaths, recovered, lat, long);
      }
    });

  }).fail(function() {
    console.error('Something was wrong');
  });

});
