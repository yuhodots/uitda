let auth = require('./auth');
let async = require('async');
const { likey } = require('../models');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');

function type_board_assign(type) {
    if (type == 'market') {
        return market_board;
    }
    else if (type == 'networking') {
        return networking_board;
    }
}
module.exports = {
    my_likey: function(req, res){
        if(auth.isOwner(req, res)){
            likey.findAll({where: {email:req.user.email}}).then(function(likey_list){
                res.json({ likey_list: likey_list, user: req.user ? req.user : 0 });
            }).catch(function (err) {
                throw err;
            });
        }
        else{
            res.json({user: req.user ? req.user : 0 })
        }
    }
}
