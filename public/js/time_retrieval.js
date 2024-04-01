document.addEventListener("DOMContentLoaded", function(){
    console.log("time_retrieval js part");
    var time_out_button = document.getElementById("time-out-btn");
    time_out_button.addEventListener('click', time_out_function);

    async function time_out_function(event){
        console.log("time out funtion");
        event.preventDefault();

        let current_time = new Date();
        let hours = current_time.getHours();
        let minutes = current_time.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes; // prepend '0' to minutes
        }
        let weekdayIndex = current_time.getDay();

        console.log("TO hour: " + hours); //remove later
        console.log("TO minutes: " + minutes); //remove later

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
            
            if(data.success){
                if(data.type === "Emp"){
                    
                }else{
                   
                }
            }else{
                console.log("unsuccesful");
            }
        }catch(error){
            console.error(error);
        }
    }
});

//type: "Employee",