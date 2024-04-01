/*
Functions:
-Request to server-side for new employee creation with the details inputted
*/

document.addEventListener("DOMContentLoaded", function(){
    var register_button_submit = document.getElementById("register-button");
    register_button_submit.addEventListener('click', register_function);

    async function register_function(event){
        event.preventDefault();

        var first_name_input = document.getElementById("firstName").value;
        var last_name_input = document.getElementById("lastName").value;
        var contact_input = document.getElementById("contactNumber").value;
        var email_input = document.getElementById("email").value;
        var password_input = document.getElementById("password").value;
        var address_input = document.getElementById("address").value;
        var employee_type_input = document.getElementById("employee-type").value;

        if (!first_name_input || !last_name_input || !password_input || !address_input) {
            alert("Please fill in all fields");
            return; 
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_input)) {
            alert("Invalid email format");
            return;
        }

        const contactRegex =/^09\d{9}$/
        if (!contactRegex.test(contact_input)) {
            alert("Invalid contact number format");
            return;
        }

        try{
            const response = await fetch('/register_employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: first_name_input,
                    lastName: last_name_input,
                    contactNumber: contact_input,
                    email: email_input,
                    password: password_input,
                    address: address_input,
                    employee_type: employee_type_input
                }),
            });
            const data = await response.json();
            if(data.success){
                togglePopup();
                togglePopup2();
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.error(error);
        }
    }


})
function togglePopup(){
    document.getElementById("popup-2").classList.toggle("active");
}
function togglePopup2(){
    document.getElementById("popup-3").classList.toggle("active");
};
