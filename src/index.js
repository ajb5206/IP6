import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
$;

//const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/EUR/GBP`
// or	const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${pair1}/${pair2}`
//      https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD

process.env.API_KEY;

$(document).ready(function() {
  $('#currencyConvert').click(function() {
    let pair1 = $('#currency1').val();
		let pair2 = $('#currency2').val();
		const money = $('#amount').val();
    
		let request = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${pair1}/${pair2}`;
		
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();
		
    function getElements(response) {
      let exchangeRate = response.conversion_rate;
      $('.showConverted').text(`The conversion rate is ${exchangeRate} and the total is ${money * exchangeRate}`);
      //$('.showError').text(`The error is ${response.conversion_rate}.`);
    }
  });
});