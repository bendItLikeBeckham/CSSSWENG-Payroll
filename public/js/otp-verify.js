/*
Functions:
-Request in the server-side for employee time-in status to enable/disable Time-In/Out buttons
-Request to generate new OTP for Employee Type = Employee, verifying of OTP if correct
-Request for new employee time-in logs in the server-side
*/

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
          let current_time = new Date();
          let hours = current_time.getHours();
          let minutes = current_time.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
        }
          let weekdayIndex = current_time.getDay();
          let formattedTime = hours + ':' + minutes;

          let month = current_time.getMonth()+1;
          let day = current_time.getDate();
          let year = current_time.getFullYear();
          month = (month < 10 ? '0' : '') + month;
          day = (day < 10 ? '0' : '') + day;
          let formattedDate = year + '-' + month + '-' + day; 

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
}

function togglePopup2(){
  document.getElementById("popup-3").classList.toggle("active");
}

function togglePopup3(){
  document.getElementById("popup-4").classList.toggle("active");
}

function reload(){
  location.reload()
}

function closeBtn(){
    document.getElementById("popup-1").classList.toggle("active");
}

function generateOtpAndOpenOTPWindow(){
  generateOtp();
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
          alert(`Your input is correct.`);

          enableTimeOut();
          let current_time = new Date();
          let hours = current_time.getHours();
          let minutes = current_time.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
        }
          let weekdayIndex = current_time.getDay();
          let formattedTime = hours + ':' + minutes;

          let month = current_time.getMonth()+1;
          let day = current_time.getDate();
          let year = current_time.getFullYear();
          month = (month < 10 ? '0' : '') + month;
          day = (day < 10 ? '0' : '') + day;
          let formattedDate = year + '-' + month + '-' + day; 

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

          closeBtn();
        } else {
          alert(`Sorry, your input is incorrect.`);
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
