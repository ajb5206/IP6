import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
$;

process.env.API_KEY;

$(document).ready(function() {
  $('#currencyConvert').click(function() {
    let pair1 = $('#currency1').val();
    let pair2 = $('#currency2').val();
    const money = $('#amount').val();
    $('#currency1').val('');
    $('#currency2').val('');
    $('#amount').val('');

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${pair1}/${pair2}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const responseText = JSON.parse(response);
      $('.showConverted').text(`The conversion rate is ${responseText.conversion_rate} and the total converted amount 
				is ${money * responseText.conversion_rate}`);
    }, function(error) {
      $('.showError').text(`The error is ${error}.`);
    });
  });
});