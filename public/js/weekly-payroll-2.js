var week_index;
var curr_emp;
var curr_week;

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM display weekly payroll"); //remove later

    fetch("/admin_retrieve_employee_total_wp")//retrieve the employees
    .then(response =>{
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(html =>{
        document.body.innerHTML = html; 
        document.getElementById("select-week-dropdown-id").style.visibility = "hidden";
        dropdown();

    })
    .catch(error =>{
        console.error('Error fetching /admin_retrieve_employee_total_wp:', error);
    });
});

function dropdown(){
    var emp_mgm_page_select = document.getElementById("emp-mgm-page-id"); 
    const Ti_To_logs_btn = document.getElementById("Ti-To-logs-id");
    var emp_dropdown_select = document.getElementById("emp-dropdown-id");
    const payroll_changes_btn = document.getElementById("payroll-changes-btn");
    payroll_changes_btn.addEventListener('click', w_e_selected);//maybe check for valid inputs first

    emp_mgm_page_select.addEventListener('change', function(){
        const selected_page = emp_mgm_page_select.value;

        if(selected_page === "Attendance Records"){
            window.location.href = '/admin_empman_attendrecs';
        }else if(selected_page === "Employee Information"){
            window.location.href = '/admin_empman_emprecs';
        }
    })

    Ti_To_logs_btn.addEventListener('click', redirect_to_logs);
    async function redirect_to_logs(event){
        event.preventDefault();
        
        window.location.href = '/admin_dashboard';
    }

    emp_dropdown_select.addEventListener('change', function(){
        document.getElementById("select-week-dropdown-id").style.visibility = "visible";
        document.getElementById("current-week-option").innerHTML = "Select Week";
    })

    //var selected_emp = emp_dropdown_select.value;
    var selectedWeek = document.getElementById("emp-dropdown-week-id");
    selectedWeek.addEventListener('change', function(){
        const selected_emp = emp_dropdown_select.value;
        var selectedWeek2 = document.getElementById("emp-dropdown-week-id").selectedIndex - 1;
        week_index = selectedWeek2;
        curr_emp = selected_emp;
        if(selectedWeek2 === 0){
            curr_week = "Current Week";
        }else if(selectedWeek2 === 1){
            curr_week = "Last Week";
        }else{
            curr_week = "2 Weeks Ago";
        }

        fetch(`/admin_retrieve_emp_wpay?employee=${selected_emp}&week=${selectedWeek2}`)
        .then(response =>{
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html =>{
            document.body.innerHTML = html;
            //add here
            document.getElementById("current-emp-option").innerHTML = curr_emp;
            document.getElementById("current-week-option").innerHTML = curr_week;
            dropdown();

        })
        .catch(error =>{
            console.error('Error fetching /admin_retrieve_emp_wpay:', error);
        });
    })

    //validation etc.
    function w_e_selected(){
        var payroll_id = document.querySelector('input[name="payroll-id"]').value;
        if(payroll_id && week_index === 0){
            validateInput()
        }else if(payroll_id && week_index !== 0){
            alert("Error: Only current week is adjustable.");
            document.getElementById("weekly-payroll-form-id").reset();
        }else{
            alert("Select a week and an employee first.");
            document.getElementById("weekly-payroll-form-id").reset();
        }
    }
    
    function validateInput() {
        const pph_c = document.getElementById("pph-id").value;
        const additional_c = document.getElementById("add-id").value;
        const advance_c = document.getElementById("adv-id").value;
        const deduction_c = document.getElementById("ded-id").value;
        if (isNaN(parseFloat(pph_c)) || parseFloat(pph_c) < 0 || pph_c.includes('/') || pph_c.includes('-') || pph_c === '.' ||
        isNaN(parseFloat(additional_c)) || parseFloat(additional_c) < 0 || additional_c.includes('/') || additional_c.includes('-') || additional_c === '.' ||
        isNaN(parseFloat(advance_c)) || parseFloat(advance_c) < 0 || advance_c.includes('/') || advance_c.includes('-') || advance_c === '.' ||
        isNaN(parseFloat(deduction_c)) || parseFloat(deduction_c) < 0 || deduction_c.includes('/') || deduction_c.includes('-')  || deduction_c === '.') {
            alert("Please enter a valid non-negative integer.");
            document.getElementById("weekly-payroll-form-id").reset();
        }else{
            showConfirmMessage();
        }
    }

    function showConfirmMessage(){
        var confirmation = confirm("Are you sure you want to confirm the new value for this week?");
        if (confirmation) {
            alert("CONFIRMED!");//do check for valid inputs
            update_payroll();
        }else{
            document.getElementById("weekly-payroll-form-id").reset();
        }
    }

    async function update_payroll(){
        var payroll_id = document.querySelector('input[name="payroll-id"]').value;
        const pph_0 = document.getElementById("pph-id").value;
        const pph = parseFloat(pph_0);

        const ppm = (pph/60).toFixed(2);
        const additional_0 = document.getElementById("add-id").value;
        const additional = parseFloat(additional_0);
        const advance_0 = document.getElementById("adv-id").value;
        const advance = parseFloat(advance_0);
        const deduction_0 = document.getElementById("ded-id").value;
        const deduction = parseFloat(deduction_0);

        console.log("PPH: " + pph);
        console.log("PPM: " + ppm);
        console.log("additional: " + additional);
        console.log("advance: " + advance);
        console.log("deduction : " + deduction);
        console.log("payroll-id: " + payroll_id);

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