var week_index;

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
        dropdown();
    })
    .catch(error =>{
        console.error('Error fetching /admin_retrieve_employee_total_wp:', error);
    });
});

function dropdown(){
    var emp_dropdown_select = document.getElementById("emp-dropdown-id");
    var emp_mgm_page_select = document.getElementById("emp-mgm-page-id"); 
    //var week_index;

    emp_dropdown_select.addEventListener('change', function(){
        const selected_emp = emp_dropdown_select.value;
        var selectedWeek = document.getElementById("emp-dropdown-week-id").selectedIndex - 1;
        week_index = selectedWeek;
        // if(selectedWeek === 0){
        //     fetch(`/admin_retrieve_emp_wpay?employee=${selected_emp}&week=${selectedWeek}`)
        //     .then(response =>{
        //         if (!response.ok){
        //             throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
        //         return response.text();
        //     })
        //     .then(html =>{
        //         document.body.innerHTML = html;
        //         dropdown();
        //         //create button here
        //     })
        //     .catch(error =>{
        //         console.error('Error fetching /admin_retrieve_emp_wpay:', error);
        //     });
        // }
        fetch(`/admin_retrieve_emp_wpay?employee=${selected_emp}&week=${selectedWeek}`)
        .then(response =>{
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html =>{
            document.body.innerHTML = html;
            dropdown();
            //create button here
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
    //payroll_changes_btn.addEventListener('click', update_payroll);
    payroll_changes_btn.addEventListener('click', w_e_selected);//maybe check for valid inputs first

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
        //event.preventDefault();

        var payroll_id = document.querySelector('input[name="payroll-id"]').value;
        //if(payroll_id && week_index === 0){//perhaps i could remove this ================
            const pph_0 = document.getElementById("pph-id").value;
            const pph = parseFloat(pph_0);

            // var pph;
            // if(!pph){
            //     pph = parseFloat(pph_0);
            // }
            // //not yet sure about this
            // if(pph === ""){
            //     pph = 10;
            // }
            // const ppm_0 = document.getElementById("ppm-id").value;
            // const ppm = parseFloat(ppm_0);
            // var ppm = "";
            // if(!pph){
            //     ppm = (pph/60).toFixed(2);
            // }
            
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
        //}        
    }
}