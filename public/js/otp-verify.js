window.onload  = async function enableButton(){
  const response = await fetch('/time_in_status', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { time_in_status } = await response.json();
  console.log(time_in_status);
  if (time_in_status === true){
    enableTimeOut();
  }
  else{
    enableTimeIn();
  }
}

function timeIn(){
  enableTimeOut();
          //changes start here
          let current_time = new Date();
          let hours = current_time.getHours();
          let minutes = current_time.getMinutes();
          let weekdayIndex = current_time.getDay();
          let formattedTime = hours + ':' + minutes;

          let month = current_time.getMonth()+1;
          let day = current_time.getDate();
          let year = current_time.getFullYear();
          month = (month < 10 ? '0' : '') + month;
          day = (day < 10 ? '0' : '') + day;
          let formattedDate = year + '-' + month + '-' + day; 

          console.log("hour: " + hours); //remove later
          console.log("minutes: " + minutes); //remove later
          console.log("weekday: " + weekdayIndex); //remove later
          console.log("formattedTime: " + formattedTime); //remove later
          console.log("formattedTime: " + formattedDate); //remove later

          fetch('/employee_time_in',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Time_In: formattedTime,
              TI_weekdayIndex: weekdayIndex,
              Time_In_Date: formattedDate
              }),
          })
}

function togglePopup(){
    closeBtn();
    generateOtp();
    //otp_window(); 
}

function closeBtn(){
    document.getElementById("popup-1").classList.toggle("active");
}

function generateOtpAndOpenOTPWindow(){
  generateOtp();
  //otp_window();
}

function generateOtp(){
    fetch('/generate_otp', { method: 'POST' })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error generating number:', error));
  }

  function submitOtp(event) {
    event.preventDefault();
  
    const otpInput = document.getElementById('otp_value');
    const otp = otpInput.value;
  
    fetch('/verify_otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.correctNumber == otp) {
          alert(`Your input (${otp}) is correct.`);

          enableTimeOut();
          //include functions here if otp is correct, time-in post method here?
          //changes start here
          let current_time = new Date();
          let hours = current_time.getHours();
          let minutes = current_time.getMinutes();
          let weekdayIndex = current_time.getDay();
          let formattedTime = hours + ':' + minutes;

          let month = current_time.getMonth()+1;
          let day = current_time.getDate();
          let year = current_time.getFullYear();
          month = (month < 10 ? '0' : '') + month;
          day = (day < 10 ? '0' : '') + day;
          let formattedDate = year + '-' + month + '-' + day; 

          console.log("hour: " + hours); //remove later
          console.log("minutes: " + minutes); //remove later
          console.log("weekday: " + weekdayIndex); //remove later
          console.log("formattedTime: " + formattedTime); //remove later
          console.log("formattedTime: " + formattedDate); //remove later

          fetch('/employee_time_in',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Time_In: formattedTime,
              TI_weekdayIndex: weekdayIndex,
              Time_In_Date: formattedDate
              }),
          })

          //changes end here
          //window.location.href = '/employee_clockpage';
          closeBtn();
        } else {
          alert(`Sorry, your input (${otp}) is incorrect.`);
        }
      })
      .catch(error => console.error('Error submitting otp:', error));
  
    otpInput.value = '';
  }

  function enableTimeIn(){
    document.getElementById("time-in-btn").disabled = false;
    document.getElementById("time-out-btn").disabled = true;
  }

  function enableTimeOut(){
    document.getElementById("time-in-btn").disabled = true;
    document.getElementById("time-out-btn").disabled = false;
  }

  // function otp_window(){
  //   //add here
  //   window.open('/otp_page', '_blank');//check for wfh
  // }
