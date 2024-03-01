function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");

    console.log(document.getElementById("time-out-btn").disabled)
    fetch('/generate_otp', { method: 'POST' })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error generating number:', error));
}
function closeBtn(){
    document.getElementById("popup-1").classList.toggle("active");
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

          console.log("hour: " + hours); //remove later
          console.log("minutes: " + minutes); //remove later
          console.log("weekday: " + weekdayIndex); //remove later
          console.log("formattedTime: " + formattedTime);

          fetch('/employee_time_in',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Time_In: formattedTime,
              TI_weekdayIndex: weekdayIndex
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
