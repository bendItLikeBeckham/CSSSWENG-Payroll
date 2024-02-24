function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");

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
        } else {
          alert(`Sorry, your input (${otp}) is incorrect.`);
        }
      })
      .catch(error => console.error('Error submitting otp:', error));
  
    otpInput.value = '';
  }
