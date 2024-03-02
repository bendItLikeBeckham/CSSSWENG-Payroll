document.addEventListener("DOMContentLoaded", function (){
    console.log("DOM display employee summary");

    fetch("/retrieve_employee_summary")
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html;
        sidebar_buttons();
    })
    .catch(error =>{
        console.error('Error fetching /retrieve_employee_summary:', error);
    });
});

function sidebar_buttons(){
    var emp_mgm_button = document.getElementById("emp-mgm-id");
    emp_mgm_button.addEventListener('click', emp_mgm_redirect);

    async function emp_mgm_redirect(event){
        event.preventDefault();

        window.location.href = '/admin_empman_attendrecs';
    }
}