module.exports = function (app) {

  /* Module load */
  let passport = require('passport');
  const { users } = require('../models');
  let LocalStrategy = require('passport-local').Strategy;
  let OutlookStrategy = require('passport-outlook').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  /* Main part */
  passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
      done(null, user.email); // 접속한 사용자의 식별 값이, session store에 user.authId로 저장
  });
  passport.deserializeUser(function (email, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
  // console.log('[DeserializeUser]', email); // authId 인자에는 serializeUser 메소드에서 보낸 user.authId 값이 담김
    users.findOne({ where: {email: email} }).then(function(project) {
      done(null, project.dataValues);
    }).catch(function(err){throw err;})
  });

  //LocalStrategy
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'email',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
    }, (username, password, done) => {
      let user = {
          username : username,
          email : password
      }
      users.findOrCreate({where: {email: password, username : username} })
      .then(() => { done(null,user); })
  }));



  //OutlookStrategy
  let outlookCredentials = require('../config/outlook.json');
  passport.use(new OutlookStrategy(outlookCredentials,
    function(accessToken, refreshToken, profile, done) {
      let username =  profile.displayName;
      let pattern = /(\(.*\) )|( \(.*\))/g;
      username =  username.replace(pattern, '')
      let user = {
        userid : username,
        email: profile.emails[0].value,
        accessToken: accessToken,
        displayName:profile.displayName,
        filename:'',
        location:''
      };
      if (refreshToken)
        user.refreshToken = refreshToken;
      users.findOrCreate({where: {email: user.email, username : user.userid} }) //defaults: {email: 'heewon7318@unist.ac.kr'}
      .then(() => { done(null,user); })
    }
  ));

  let passport_auth = passport.authenticate('windowslive',
      { scope: [ 'openid', 'profile', 'offline_access', 'https://outlook.office.com/Mail.Read']});
  let passport_auth_callback = passport.authenticate('windowslive', {failureRedirect: '/'});

  app.get('/api/login/outlook', passport_auth);
  app.get('/api/login/outlook/callback', passport_auth_callback, function(req, res){
    req.session.save(() => {
      res.redirect('/board/market');
    })
  });

  return passport;
}
