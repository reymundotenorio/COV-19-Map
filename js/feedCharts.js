var headerData = [];

var confirmedSum = [];
var deathsSum = [];
var recoveredSum = [];

var confirmedArr = [];
var deathsArr = [];
var recoveredArr = [];

function addThemeToHighcharts(){
  Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Roboto',
    rel: 'stylesheet',
    type: 'text/css'
  }, null, document.getElementsByTagName('head')[0]);

  Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
    '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, '#2a2a2b'],
          [1, '#3e3e40']
        ]
      },
      style: {
        fontFamily: '\'Roboto\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#F0F0F0'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#F0F0F3',
          style: {
            fontSize: '13px'
          }
        },
        marker: {
          lineColor: '#333'
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: 'white'
      },
      errorbar: {
        color: 'white'
      }
    },
    legend: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
        color: '#E0E0E3'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#606063'
      },
      title: {
        style: {
          color: '#C0C0C0'
        }
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    labels: {
      style: {
        color: '#707073'
      }
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },
    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },
    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
          color: '#CCC'
        },
        states: {
          hover: {
            fill: '#707073',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: '#000003',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          }
        }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },
    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      },
      xAxis: {
        gridLineColor: '#505053'
      }
    },
    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    }
  };

  // Apply the theme
  Highcharts.setOptions(Highcharts.theme);
}

function drawChart(){
  var chart = Highcharts.chart('covid19Chart', {
    chart: {
      zoomType: 'x'
    },

    title: {
      text: 'COVID-19 Cases'
    },

    subtitle: {
      text: 'Source: Johns Hopkins CSSE'
    },

    yAxis: {
      title: {
        text: 'Total'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: `From ${headerData[0]} to ${headerData[headerData.lenght]}`
      }
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    },

    series: [
      {
        name: 'Confirmed',
        data: confirmedSum
      },
      {
        name: 'Recovered',
        data: recoveredSum
      },
      {
        name: 'Deaths',
        data: deathsSum
      }
    ]
  });
}

function fillHeaderData(value){
  $.each(value, function(indexArr0, valueArr0) {

    if(indexArr0 > 3){
      headerData.push(valueArr0);
    }

  });
}

// RECOVERED

function initRecoveredData(value){
  $.each(value, function(indexArr1, valueArr1) {

    if(indexArr1 > 3){
      recoveredSum.push(parseInt(valueArr1));
    }

  });
}

function sumRecoveredData(value){
  $.each(value, function(indexArrOthers, valueArrOthers) {

    if(indexArrOthers > 3){
      recoveredSum[indexArrOthers - 4] = recoveredSum[indexArrOthers - 4] + parseInt(valueArrOthers);
    }

  });
}

function getRecoveredData(){
  var recoveredDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv';

  var recoveredPromise = $.get(recoveredDataURL , function(response) {
    recoveredArr = $.csv.toArrays(response);

  }).done(function(){

    $.each(recoveredArr, function(index, value) {
      if (index === 1){

        initRecoveredData(value);

      } else if (index > 1) {

        sumRecoveredData(value);

      }
    });

    // console.log(recoveredSum);

    drawChart();

  }).fail(function() {
    console.error('Something was wrong');
  });

}

// END RECOVERED

// DEATHS

function initDeathsData(value){
  $.each(value, function(indexArr1, valueArr1) {

    if(indexArr1 > 3){
      deathsSum.push(parseInt(valueArr1));
    }

  });
}

function sumDeathsData(value){
  $.each(value, function(indexArrOthers, valueArrOthers) {

    if(indexArrOthers > 3){
      deathsSum[indexArrOthers - 4] = deathsSum[indexArrOthers - 4] + parseInt(valueArrOthers);
    }

  });
}

function getDeathsData(){
  var deathsDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv';

  var deathsPromise = $.get(deathsDataURL , function(response) {
    deathsArr = $.csv.toArrays(response);

  }).done(function(){

    $.each(deathsArr, function(index, value) {
      if (index === 1){

        initDeathsData(value);

      } else if (index > 1) {

        sumDeathsData(value);

      }
    });

    // console.log(deathsSum);

    getRecoveredData();

  }).fail(function() {
    console.error('Something was wrong');
  });

}

// END DEATHS

// CONFIRMED

function initConfirmedData(value){
  $.each(value, function(indexArr1, valueArr1) {

    if(indexArr1 > 3){
      confirmedSum.push(parseInt(valueArr1));
    }

  });
}

function sumConfirmedData(value){
  $.each(value, function(indexArrOthers, valueArrOthers) {

    if(indexArrOthers > 3){
      confirmedSum[indexArrOthers - 4] = confirmedSum[indexArrOthers - 4] + parseInt(valueArrOthers);
    }

  });
}

function getConfirmedData(){
  var confirmedDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

  var confirmedPromise = $.get(confirmedDataURL , function(response) {
    confirmedArr = $.csv.toArrays(response);

  }).done(function(){

    $.each(confirmedArr, function(index, value) {
      if (index === 0){

        fillHeaderData(value);

      } else if (index === 1){

        initConfirmedData(value);

      } else {

        sumConfirmedData(value);

      }
    });


    // console.log(headerData);
    // console.log(confirmedSum);

    getDeathsData();

  }).fail(function() {
    console.error('Something was wrong');
  });

}

// END CONFIRMED


$(document).ready(function() {

  addThemeToHighcharts();
  getConfirmedData();

});
