/*
Functions:
-Request to server-side for new employee time-out
*/

document.addEventListener("DOMContentLoaded", function(){
    var time_out_button = document.getElementById("time-out-btn");
    time_out_button.addEventListener('click', time_out_function);

    async function time_out_function(event){
        event.preventDefault();

        let current_time = new Date();
        let hours = current_time.getHours();
        let minutes = current_time.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        let weekdayIndex = current_time.getDay();

        try{ 
            const response = await fetch('/employee_time_out',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  TO_hour: hours,
                  TO_minute: minutes,
                  TO_weekdayIndex: weekdayIndex
                }),
            });
            const data = await response.json();
            
        }catch(error){
            console.error(error);
        }
    }
});
