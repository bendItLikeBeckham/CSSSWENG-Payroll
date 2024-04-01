/*
Functions:
-Request data for Admin: Notifications Page
-Request to delete document on the database depending on the employee email inputted
*/

document.addEventListener("DOMContentLoaded", function(){
    fetch("/display_forgot_password")
    .then(response =>{
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html;
        delete_forgot_password();
    })
    .catch(error =>{
        console.error('Error fetching /display_forgot_password', error);
    });
});

function delete_forgot_password(){
    var addressed_button = document.getElementById("addressed-button-id");
    addressed_button.addEventListener('click', delete_document);

    async function delete_document(event){
        event.preventDefault();

        var forgot_password_email = document.getElementById("email-id").value;
        try{
            const response = await fetch('/delete_forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: forgot_password_email
                }),
            });
            const data = await response.json();

            if(data.success === true){
                location.reload();
            }else if(data.success === false){
                document.getElementById("addressed-id").reset();
            }
        }catch(error){
            console.error(error);
            document.getElementById("addressed-id").reset();
        }
    }
}

