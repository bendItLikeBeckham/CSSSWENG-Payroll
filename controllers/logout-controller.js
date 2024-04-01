/*
Functions:
-Logout the employee
-Destroy the session created
*/

const logout_controller = {
    get_logout: function(req, res){
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/');
        });
    }
}

module.exports = logout_controller;