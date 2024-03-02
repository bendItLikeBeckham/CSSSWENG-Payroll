document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM display attendance record");

    fetch("/admin_retrieve_employee_total_ar")
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html;
        dropdown();
    })
    .catch(error =>{
        console.error('Error fetching /admin_retrieve_employee_total_ar:', error);
    });
});

function dropdown(){
    var emp_dropdown_select = document.getElementById("emp-dropdown-id");
    var emp_mgm_page_select = document.getElementById("emp-mgm-page-id"); 

    emp_dropdown_select.addEventListener('change', function(){
        const selected_emp = emp_dropdown_select.value;

        fetch(`/admin_retrieve_emp_pay?employee=${selected_emp}`)
        .then(response =>{
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html =>{
            document.body.innerHTML = html;
            dropdown();
        })
        .catch(error =>{
            console.error('Error fetching /admin_retrieve_emp_pay:', error);
        });
    })

    emp_mgm_page_select.addEventListener('change', function(){
        const selected_page = emp_mgm_page_select.value;

        if(selected_page === "Employee Information"){
            window.location.href = '/admin_empman_emprecs';
        }else if(selected_page === "Weekly Payroll"){
            window.location.href = '/admin_empman_payroll';
        }
    })

    // var emp_mgm_button = document.getElementById("emp-mgm-id");
    // emp_mgm_button.addEventListener('click', emp_mgm_redirect);

    // async function emp_mgm_redirect(event){
    //     event.preventDefault();

    //     window.location.href = '/admin_empman_attendrecs';
    // }

    const Ti_To_logs_btn = document.getElementById("Ti-To-logs-id");
    Ti_To_logs_btn.addEventListener('click', redirect_to_logs);
    async function redirect_to_logs(event){
        event.preventDefault();
        
        window.location.href = '/admin_dashboard';
    }
}