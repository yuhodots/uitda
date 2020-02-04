module.exports = function (app) {

    /* Module load */
    var passport = require('passport');
    var express = require('express');
    var session = require('express-session');
    const { users } = require('../models');

    var OutlookStrategy = require('passport-outlook').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());
    /* Main part */
    passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
        done(null, user.email); // 접속한 사용자의 식별 값이, session store에 user.authId로 저장
    });

    passport.deserializeUser(function (email, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
    //    console.log('[DeserializeUser]', email); // authId 인자에는 serializeUser 메소드에서 보낸 user.authId 값이 담김
      users.findOne({ where: {email: email} }).then(function(project) {
        done(null, project.dataValues);
      }).catch(function(err){throw err;})
    });


    var outlookCredentials = require('../config/outlook.json');
    passport.use(new OutlookStrategy(outlookCredentials,
      function(accessToken, refreshToken, profile, done) {
        var username =  profile.displayName;
        var pattern = /(\(.*\) )|( \(.*\))/g;
        username =  username.replace(pattern, '')
        var user = {
          userid : username,
          email: profile.emails[0].value,
          accessToken: accessToken,
          displayName:profile.displayName,
          filename:'',
          location:''
        };
        if (refreshToken)
          user.refreshToken = refreshToken;
        users
            .findOrCreate({where: {email: user.email, username : user.userid} }) //defaults: {email: 'heewon7318@unist.ac.kr'}
            .then(() => {
              done(null,user);
            })
        }
    ));
    app.get('/api/login/outlook',
        passport.authenticate('windowslive', {
          scope: [
            'openid',
            'profile',
            'offline_access',
            'https://outlook.office.com/Mail.Read'
          ]
        })
    );
    app.get('/api/login/outlook/callback',
      passport.authenticate('windowslive', {failureRedirect: '/api/login'}),
      (req, res) => {
        req.session.save(() => {
          res.redirect('http://localhost:4000/');
        })
    });

    return passport;
}
