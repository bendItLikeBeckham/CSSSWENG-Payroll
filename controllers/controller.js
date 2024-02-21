const controller = {
    getFavicon: function(req, res){
        res.status(204);
    },
    get_index: function(req, res){
        //res.render('index');
        res.render('login-page');
    }
}

module.exports = controller;