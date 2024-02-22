var sampleEmailArray = ["user1@email.com", "user2@email.com", "user3@email.com"];
var SamplePasswordArray = ["123", "456", "789"];

document.addEventListener("DOMContentLoaded", function(){
    console.log("welcome to login js");
    var login_button = document.getElementById("login-button");
    login_button.addEventListener('click', login_function);

    async function email_exist(email){
        return sampleEmailArray.includes(email)
    }

    async function login_function(event){
        event.preventDefault();

        var email_input = document.getElementById("email").value;
        var password_input = document.getElementById("password").value;

        //remove the console log later
        console.log("email input = " + email_input);
        console.log("password input = " + password_input);

        if(email_exist(email_input)){
            console.log("email exist");
            var email_index = sampleEmailArray.indexOf(email_input);
            var password = SamplePasswordArray[email_index];
            if(password_input === password){
                console.log("password matches the email");
                window.location.href = "employee-clockpage.html";
            }else{
                console.log("incorrect password");
                document.getElementById("login-form").reset();
            }
        }else{
            console.log("email does not exist");
            document.getElementById("login-form").reset();
        }
    }
});