document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM display weekly payroll"); //remove later

    fetch("/admin_retrieve_employee_total_wp")
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
        console.error('Error fetching /admin_retrieve_employee_total_wp:', error);
    });
});

function dropdown(){
    var emp_dropdown_select = document.getElementById("emp-dropdown-id");
    var emp_mgm_page_select = document.getElementById("emp-mgm-page-id"); 

    emp_dropdown_select.addEventListener('change', function(){
        const selected_emp = emp_dropdown_select.value;

        fetch(`/admin_retrieve_emp_wpay?employee=${selected_emp}`)
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
            console.error('Error fetching /admin_retrieve_emp_wpay:', error);
        });
    })

    emp_mgm_page_select.addEventListener('change', function(){
        const selected_page = emp_mgm_page_select.value;

        if(selected_page === "Attendance Records"){
            window.location.href = '/admin_empman_attendrecs';
        }else if(selected_page === "Employee Information"){
            window.location.href = '/admin_empman_emprecs';
        }
    })
    
    const Ti_To_logs_btn = document.getElementById("Ti-To-logs-id");
    Ti_To_logs_btn.addEventListener('click', redirect_to_logs);
    async function redirect_to_logs(event){
        event.preventDefault();
        
        window.location.href = '/admin_dashboard';
    }

    //function for changes in payroll
    const payroll_changes_btn = document.getElementById("payroll-changes-btn");
    payroll_changes_btn.addEventListener('click', update_payroll);
    async function update_payroll(event){
        event.preventDefault();

        const pph_0 = document.getElementById("pph-id").value;
        const pph = parseFloat(pph_0);
        const ppm_0 = document.getElementById("ppm-id").value;
        const ppm = parseFloat(ppm_0);
        const additional_0 = document.getElementById("add-id").value;
        const additional = parseFloat(additional_0);
        const advance_0 = document.getElementById("adv-id").value;
        const advance = parseFloat(advance_0);
        const deduction_0 = document.getElementById("ded-id").value;
        const deduction = parseFloat(deduction_0);
        var payroll_id = document.querySelector('input[name="payroll-id"]').value; 

        console.log("PPH: " + pph);
        console.log("PPM: " + ppm);
        console.log("additional: " + additional);
        console.log("advance: " + advance);
        console.log("deduction : " + deduction);
        console.log("payroll-id: " + payroll_id);
        //post to controller

        try{
            const response = await fetch('/admin_update_payroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PPH: pph,
                    PPM: ppm,
                    Additional: additional,
                    Advance: advance,
                    Deduction: deduction,
                    Payroll_ID: payroll_id
                }),
            });
            const data = await response.json();

            if(data.success){//add below here which page is loaded regarding the employee type
                console.log("update payroll successful");
                location.reload();
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.error(error);
            error_message.textContent = "Login Controller Error";
        }
    }
}