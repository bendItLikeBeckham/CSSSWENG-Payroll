/*
Notes:
-Upon opening the web service this will be the first page loaded
Functions:
-Display the login-page.hbs (login page)
*/

const controller = {
    getFavicon: function(req, res){
        res.status(204);
    },
    get_index: function(req, res){
        res.render('login-page');
    }
}

module.exports = controller;