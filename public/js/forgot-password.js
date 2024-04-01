document.addEventListener("DOMContentLoaded", function(){
    var forgot_password_button_submit = document.getElementById("forgot-password-button-id");
    forgot_password_button_submit.addEventListener('click', forgot_password_function);

    async function forgot_password_function(event){
        console.log("forgot password part");
        event.preventDefault();

        var email_input = document.getElementById("for-pas-email").value;

        var current_time = new Date();
        var hours = current_time.getHours();
        var minutes = current_time.getMinutes();
        var time = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

        console.log("email input: "+ email_input); //remove later
        try{
            const response = await fetch('/add_forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email_input,
                    cTime: time
                }),
            });
            const data = await response.json();
            console.log(data);
            if(data.success === true){
                alert(`Successfully sent forgot password notification.`);
                console.log("Correct")
            }else if(data.success === false){
                alert(`Email does not exist.`);
                document.getElementById("forgot-password-form-id").reset();
            }
        }catch(error){
            console.error(error);
        }
    }
});