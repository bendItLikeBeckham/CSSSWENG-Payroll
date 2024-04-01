/*
Functions:
-Display of local date and time
*/

setInterval(()=>{
    const time = document.querySelector("#time");
    const date = document.querySelector("#date");
    let clock = new Date();
    let hours = clock.getHours();
    let minutes = clock.getMinutes();
    let seconds = clock.getSeconds();

    let day = clock.getDate();
    let monthIndex = clock.getMonth();
    let weekdayIndex = clock.getDay();
    let year = clock.getFullYear();

    if(hours < 10){
        hours = "0"+ hours;
    }
    if(minutes < 10){
        minutes = "0"+ minutes;
    }
    if(seconds < 10){
        seconds = "0"+ seconds;
    }

    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let month = months[monthIndex];
    let weekday = weekdays[weekdayIndex];

    time.textContent = hours + ":" + minutes + ":" + seconds;
    date.textContent = weekday + ", " + month + " " + day + ", " + year;
})