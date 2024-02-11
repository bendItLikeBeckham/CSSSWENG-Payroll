var hourlyPay = 10;
var total = 0;
var bale = parseFloat(document.getElementById('bale').innerText);
var bonus = parseFloat(document.getElementById('bonus').innerText);
var deductions = parseFloat(document.getElementById('deductions').innerText);

// Loop through each day and calculate the total
for (var i = 1; i <= 8; i++) {
    var hours = parseInt(document.getElementById('dayHours' + i).innerText);
    var minutes = parseInt(document.getElementById('dayMinutes' + i).innerText);
    var totalMinutes = hours * 60 + minutes;
    var totalPay = totalMinutes * (hourlyPay / 60);
    total += totalPay;

    // Update the total cell for each day
    document.getElementById('dayTotal' + i).innerText = totalPay.toFixed(2);
}

document.getElementById('hourlyPay').innerText = hourlyPay.toFixed(2);
document.getElementById('minutePay').innerText = (hourlyPay / 60).toFixed(2);


// Update the total weekly salary cell
document.getElementById('totalWeeklySalary').innerText = (total + bonus - deductions - bale).toFixed(2);


