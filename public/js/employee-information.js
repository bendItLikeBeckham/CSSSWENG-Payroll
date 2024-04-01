/*
Functions:
-Request data for Admin: Employee Management - Employee Information Page depenging on the chosen employee
*/

var curr_emp;

document.addEventListener("DOMContentLoaded", function(){
    fetch("/display_employee_records")
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html;
    })
    .catch(error =>{
        console.error('Error fetching /display_employee_records', error);
    });
});

function displayInfo(){
    var selectedEmployee = document.getElementById("selectedEmployee");
    var selectedEmployeeEmail = selectedEmployee.options[selectedEmployee.selectedIndex].text;
    curr_emp = selectedEmployeeEmail;

    fetch('/display_specific_employee_records', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: selectedEmployeeEmail }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        document.body.innerHTML = html;
        document.getElementById("current-emp-option").innerHTML = curr_emp;
    })
    .catch(error => {
        console.error('Error fetching /display_specific_employee_records', error);
    });
}
