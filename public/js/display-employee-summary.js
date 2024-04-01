/*
Functions:
-Request data for Admin: Time-In/Out Logs
-Implemented Sidebar button functions
*/

document.addEventListener("DOMContentLoaded", function (){
    current_date_logs();

    var input_date = document.getElementById("get-date-id");
    input_date.addEventListener('change', get_date);

    var emp_mgm_button = document.getElementById("emp-mgm-id");
    emp_mgm_button.addEventListener('click', emp_mgm_redirect_0);

    async function emp_mgm_redirect_0(event){
        event.preventDefault();

        window.location.href = '/admin_empman_attendrecs';
    }

    async function current_date_logs(){
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var year = today.getFullYear();
        var current_date = year + '-' + month + '-' + day;

        var day2 = new Date(current_date);
        var day_of_the_week = day2.getDay();
        var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var day_name = day_names[day_of_the_week];

        fetch(`/retrieve_employee_summary?s_date=${current_date}&d_week=${day_name}`)
        .then(response =>{
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html =>{
            document.body.innerHTML = html; 
            sidebar_buttons();
        })
        .catch(error =>{
            console.error('Error fetching /retrieve_employee_summary:', error);
        });
    } 
});

function get_date (){
    var input_date = document.getElementById("get-date-id");
    var selected_date = input_date.value;

    var day = new Date(selected_date);
    var day_of_the_week = day.getDay();
    var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day_name = day_names[day_of_the_week];

    fetch(`/retrieve_employee_summary?s_date=${selected_date}&d_week=${day_name}`)
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html; 
        sidebar_buttons();
    })
    .catch(error =>{
        console.error('Error fetching /retrieve_employee_summary:', error);
    });
}

function sidebar_buttons(){
    var emp_mgm_button = document.getElementById("emp-mgm-id");
    emp_mgm_button.addEventListener('click', emp_mgm_redirect);

    var input_date = document.getElementById("get-date-id");
    input_date.addEventListener('change', get_date);
    

    async function emp_mgm_redirect(event){
        event.preventDefault();

        window.location.href = '/admin_empman_emprecs';
    }
}