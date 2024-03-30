document.addEventListener("DOMContentLoaded", function (){
    console.log("DOM display employee payroll");

    fetch("/employee_dashboard")
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html;
        //Time_Out_Listeners();
    })
    .catch(error =>{
        console.error('Error fetching /employee_dashboard:', error);
    });
});

function selectWeek(){
    var selectedWeek = document.getElementById("emp-dropdown-week-id").selectedIndex - 1;
    console.log(selectedWeek);

    fetch('/retrieve_employee_payroll', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ week: selectedWeek }), // Pass the selected Week
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        document.body.innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching /display_selected_week_emp', error);
    });
}