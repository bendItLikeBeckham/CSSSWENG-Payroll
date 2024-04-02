/*
Functions:
-Request to server-side to display the data of the chosen employee
-Request to server-side to delete the employee and its corresponding documents
*/

document.addEventListener("DOMContentLoaded", function(){
    fetch("/delete_user_employee")
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html;
    })
    .catch(error =>{
        console.error('Error fetching /delete_user_employee:', error);
    });
});

async function delete_function(){
    var email_input = document.getElementById("emailToDelete").textContent;

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
            togglePopup();
            console.log("Data Sent")
        }else{
            console.log(data.message);
        }
    }catch(error){
        console.error(error); 
    }
}

function displayDetail(){
    var selectedEmployee = document.getElementById("email").value;

    fetch('/display_delete_info', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: selectedEmployee }),
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

function togglePopup2(){
    document.getElementById("popup-3").classList.toggle("active");
}

function reload(){
    location.reload()
}