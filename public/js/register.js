document.addEventListener("DOMContentLoaded", function(){
    var register_button_submit = document.getElementById("register-button");
    register_button_submit.addEventListener('click', register_function);

    async function register_function(event){
        console.log("register part");
        event.preventDefault();

        var email_input = document.getElementById("email").value;
        var password_input = document.getElementById("password").value;
        var address_input = document.getElementById("address").value;
        var employee_type_input = document.getElementById("employee-type").value;

        try{
            const response = await fetch('/register_employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email_input,
                    password: password_input,
                    address: address_input,
                    employee_type: employee_type_input
                }),
            });
            const data = await response.json();
            if(data.success){
                window.location.href = '/';
            }else{
                //error_message.textContent = data.message;
                console.log(data.message);
            }
        }catch(error){
            console.error(error);
            //error_message.textContent = "Register Controller Error";
        }
    }
});
