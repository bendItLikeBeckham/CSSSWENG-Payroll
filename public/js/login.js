document.addEventListener("DOMContentLoaded", function(){
    var login_button_submit = document.getElementById("login-button");
    login_button_submit.addEventListener('click', login_function);

    async function login_function(event){
        console.log("login part");
        event.preventDefault();

        var email_input = document.getElementById("email").value;
        var password_input = document.getElementById("password").value;
        var error_message = document.getElementById("error_issue");

        console.log("email log "+ email_input);
        console.log("pass log "+ password_input);

        try{
            const response = await fetch('/login_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email_input,
                    password: password_input,
                }),
            });
            const data = await response.json();

            if(data.success){//add below here which page is loaded regarding the employee type
                window.location.href = '/employee_dashboard';
            }else{
                error_message.textContent = data.message;
            }
        }catch(error){
            console.error(error);
            error_message.textContent = "Login Controller Error";
        }
    }   
});

/*
Note:
-Add admin login function part
*/