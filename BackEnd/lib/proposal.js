let auth = require('./auth');
let async = require('async');
const { proposal } = require('../models');
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
moment.locale('ko');


module.exports = {

    my_proposal: function(req, res){
        if(auth.isOwner(req, res)){
            proposal.findAll({where: {email:req.user.email}}).then(function(proposal_list){
                res.json({ proposal_list: proposal_list, user: req.user ? req.user : 0 });
            }).catch(function (err) {
                throw err;
            });
        }
        else{
            res.json({user: req.user ? req.user : 0 })
        }
    },

    proposal: function(req, res){
        let id = req.params.id;
        if(auth.isOwner(req, res)){
            proposal.findOne({ where: { email:req.user.email, id: id } }).then(function (proposal) {
                res.json({ proposal: proposal, user: req.user ? req.user : 0 });
            }).catch(function (err) {
                throw err;
            });
        }
        else {
          res.json({user: req.user ? req.user : 0 })
        }
    },

    create : function(req, res){
        let title = req.body.title;
        let description = req.body.description;
        if(auth.isOwner(req, res)){
            proposal.create({
                title: title, description: description, author: req.user.username, email: req.user.email,
                created: moment().format('YYYY년MM월DD일HH시mm분ss초')
            }).then(function () {
                res.redirect('/api/proposal');
            }).catch(function (err) { throw err; });
        }
        else {
            res.json({user: req.user ? req.user : 0 })
        }
    },

    update : function(req, res){
        let title = req.body.title;
        let description = req.body.description;
        let id = req.params.id;
        if(auth.isOwner(req, res)){
            proposal.findOne({where: {id: id}}).then(function(content){
                if(auth.sameOwner(req, content.email)){
                    proposal.update({
                        title: title, description: description, created: moment().format('YYYY년MM월DD일HH시mm분ss초') }, { where: { id: id }
                    }).then(function () {
                        res.redirect(`/api/proposal/${id}`);
                    }).catch(function (err) { throw err; });
                }
            }).catch(function (err) { throw err; });
        }
        else {
            res.json({user: req.user ? req.user : 0 })
        }
    },

    delete : function(req, res){
        let id = req.params.id;
        if(auth.isOwner(req, res)){
            proposal.findOne({where: {id: id}}).then(function(content){
                if(auth.sameOwner(req, content.email)){
                    proposal.destroy({ where: { id:id } }).then(function(){
                        res.redirect('/api/proposal/');
                    }).catch(function (err) { throw err; });
                }
            }).catch(function (err) { throw err; });
        }
        else {
            res.json({ user: req.user ? req.user : 0 })
        }
    }
}
