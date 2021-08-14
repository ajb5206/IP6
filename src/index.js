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
      $('.showConverted').text(`The conversion rate is $${responseText.conversion_rate} and the total converted amount 
				is $${money * responseText.conversion_rate}`);
      $('.showError').text('');
      $('.showErrorType').text('');
    }, function(response) {
      let errorText = JSON.parse(response);
      $('.showConverted').text('');
      $('.showError').text(`There is an ${errorText.result} due to ${errorText["error-type"]}.`);
      if (errorText["error-type"] === "malformed-request") {
        $('.showErrorType').text(`One or more of your currency codes was entered improperly.`);
      } else if (errorText["error-type"] === "unsupported-code") {
        $('.showErrorType').text(`One or more of your currency codes isnt supported.`);
      } else if (errorText["error-type"] === "quota-reached") {
        $('.showErrorType').text("The account has reached the the number of API requests allowed by the plan.");
      } else
        $('.showErrorText').text();
    });
  });
});