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
    })
    .catch(error =>{
        console.error('Error fetching /retrieve_employee_summary:', error);
    });
});
