document.addEventListener("DOMContentLoaded", function(){
    var delete_button_submit = document.getElementById("user-delete-button");
    delete_button_submit.addEventListener('click', delete_function);

    async function delete_function(event){
        event.preventDefault();

        var email_input = document.getElementById("email").value;

        try{
            const response = await fetch('/delete_chosen_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email_input
                }),
            });
            const data = await response.json();
            if(data.success){
                console.log("Data Sent")
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

function displayDetail(){
    var selectedEmployee = document.getElementById("email").value;

    fetch('/display_delete_info', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: selectedEmployee }), // Pass the selected email
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        document.body.innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching /display_delete_info', error);
    });
}

function togglePopup(){
    document.getElementById("popup-2").classList.toggle("active");
}