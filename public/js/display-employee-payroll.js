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

function doSomething(){
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

/*function Time_Out_Listeners(){
    var time_out_button_2 = document.getElementById("time-out-btn-2");
    time_out_button_2.addEventListener('click', time_out_function_2);

    async function time_out_function_2(event){
        console.log("time out btn clicked function");
        event.preventDefault();

        let current_time = new Date();
        let hours = current_time.getHours();
        let minutes = current_time.getMinutes();

        console.log("hour: " + hours); //remove later
        console.log("minutes: " + minutes); //remove later

        try{ 
            const response = await fetch('/employee_time_out',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  TO_hour: hours,
                  TO_minute: minutes,
                }),
            });
            const data = await response.json();
            
            if(data.success){
                window.location.href = '/employee_dashboard';
            }else{
                console.log("unsuccesful");
            }
        }catch(error){
            console.error(error);
        }
    }
}*/