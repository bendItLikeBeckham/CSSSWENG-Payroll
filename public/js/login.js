document.addEventListener("DOMContentLoaded", function(){
    var login_button_submit = document.getElementById("login-button");
    login_button_submit.addEventListener('click', login_function);

    // var forgot_password_button = document.getElementById("forgot-password-button-id");
    // //forgot_password_button.addEventListener('click', forgot_password_function);
    // forgot_password_button.addEventListener('click', togglePopup);

    // async function forgot_password_function(event){
    //     window.location.href = "/forgot_password";
    // }
    // async function togglePopup(){
    //     closeBtn();
    //     response_forms();
    // }

    // async function closeBtn(){
    //     document.getElementById("popup-1").classList.toggle("active");
    // }

    async function login_function(event){
        console.log("login part");
        event.preventDefault();

        var email_input = document.getElementById("email").value;
        var password_input = document.getElementById("password").value;
        var error_message = document.getElementById("error_issue");

        console.log("email log "+ email_input);//remove later
        console.log("pass log "+ password_input);//remove later

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

            console.log(data.type);

            if(data.success){//add below here which page is loaded regarding the employee type
                if(data.type === "Employee"){
                    window.location.href = '/employee_clockpage';
                }else if (data.type === "Work From Home"){
                    window.location.href = '/work_from_home_clockpage';
                }else{
                    window.location.href = '/admin_dashboard';
                }    
            }else{
                error_message.textContent = data.message;
            }
        }catch(error){
            console.error(error);
            error_message.textContent = "Login Controller Error";
        }
    } 
    
});

function togglePopup(){
    closeBtn();
    response_forms();
}

function closeBtn(){
    document.getElementById("popup-1").classList.toggle("active");
}

function response_forms(){
    var forgot_password_button_submit = document.getElementById("forgot-password-button-id");
    forgot_password_button_submit.addEventListener('click', forgot_password_function);
}

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

        if(data.success === true){
            //window.location.href = '/';
            window.location.reload();
        }else if(data.success === false){
            document.getElementById("forgot-password-form-id").reset();
        }
    }catch(error){
        console.error(error);
    }
}

