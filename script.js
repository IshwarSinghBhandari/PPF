let slider = document.getElementById("yearly");
let time = document.getElementById("time");
let range1 = document.getElementById("range1");
let range2 = document.getElementById("range2");
let Iamount = document.getElementsByClassName('Iamount')
let maturity = document.getElementsByClassName('maturity')
let Tinterest = document.getElementsByClassName('Tinterest')


let yearlyValue = Number(slider.value) || 0;
let timeValue = Number(time.value) || 1;

slider.addEventListener("change", function (event) {
  range1.value = event.target.value;
});

slider.addEventListener("mousemove", function (event) {
  range1.value = event.target.value;
  yearlyValue = Number(event.target.value);
  calculateTotal();
});

time.addEventListener("change", function (event) {
  range2.value = event.target.value;

});

time.addEventListener("mousemove", function (event) {
  range2.value = event.target.value;
  timeValue = Number(event.target.value);
  calculateTotal();
});

function calculateTotal() {
  let p = yearlyValue;
  let n = timeValue;

  const interestRate = 7.1 / 100;
  const maturityValue = p * (((1 + interestRate) ** n - 1) / interestRate) * (1 + interestRate);
  let totalContribution = p * n;
  const totalInterest = maturityValue - totalContribution;
  Iamount[0].innerHTML = totalContribution;
  maturity[0].innerHTML = Math.round(maturityValue);
  Tinterest[0].innerHTML = Math.round(totalInterest);


  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Name', 'Value'],
      ['Invested amount', totalContribution],
      ['Total interest', Math.round(maturityValue)],
      ['Maturity value', Math.round(totalInterest)]
    ]);

    const options = {
      title: 'PPF Calculation in Graph',
      is3D: true
    };

    const chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);
  }
}

calculateTotal();


range1.addEventListener("keyup", function (event) {
  slider.value = event.target.value;
});
range2.addEventListener("keyup", function (event) {
  time.value = event.target.value;
});