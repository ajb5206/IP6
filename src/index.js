import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConverterService from './converter-service.js';

process.env.API_KEY;

function clearFields() {  
  $('#currency1').val('');
  $('#currency2').val('');
  $('#amount').val('');
}

$(document).ready(function() {
  $('#currencyConvert').click(function() {
    let pair1 = $('#currency1').val();
    let pair2 = $('#currency2').val();
    const money = $('#amount').val();
    clearFields();
    let promise = ConverterService.convert(pair1, pair2);
    
    promise.then(function(response) {
      const responseText = JSON.parse(response);
      $('.showConverted').text(`The conversion rate is ${responseText.conversion_rate} and the total converted amount 
				is ${money * responseText.conversion_rate}`);
    }, function(response) {
      let errorText = JSON.parse(response);
      $('.showError').text(`There is an ${errorText.result} due to ${errorText["error-type"]}.`);
    });
  });
});