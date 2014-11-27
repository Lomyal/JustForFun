var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');

// 路由及回调函数
module.exports = function(app) {

  // 主页get方法
  app.get('/', function(req, res){
    res.render('index', {
      title: 'StigMergic!'
    });
  });

  // 注册页面get方法
  app.get('/reg', checkNotLogin);
  app.get('/reg', function(req, res){
    res.render('reg', {
      title: 'register'
    });
  });

  // 注册页面post方法
  app.post('/reg', checkNotLogin);
  app.post('/reg', function(req, res){
    // 检验用户两次输入密码是否一致
    if (req.body['password-repeat'] != req.body['password']) {
      req.flash('error', 'Two passwords must be the same!');
      return res.redirect('/reg');
    }
    // 生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
      name: req.body.email,
      password: password,
    });
    // 检查用户名是否已经存在
    User.get(newUser.name, function(err, user) {
      if (user) {
        err = 'Username already exists.';
      }
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      // 如果用户名不存在，则新增用户
      newUser.save(function(err) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/reg');
        }
        req.session.user = newUser;
        req.flash('success', 'Sign up successfully!');
        res.redirect('/template_user');
      });
    });
  });

  // 登入页面get方法
  app.get('/login', checkNotLogin);
  app.get('/login', function(req, res){
    res.render('login', {
      title: 'login'
    });
  });

  // 登入页面post方法
  app.post('/login', checkNotLogin);
  app.post('/login', function(req, res){
    // 生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    // 登入处理
    User.get(req.body.email, function(err, user) {
      if (!user) {
        req.flash('error', 'Account does not exist!');
        return res.redirect('/login');
      }
      if (user.password != password) {
        req.flash('error', 'Wrong password!');
        return res.redirect('/login');
      }
      req.session.user = user;
      req.flash('success', 'Sign in successfully!');
      res.redirect('/template_user');
    });
  });

  // 登出页面get方法(不需要post方法)
  app.get('/logout', checkLogin);
  app.get('/logout', function(req, res){
    req.session.user = null;
    req.flash('success', 'Sign out successfully!');
    res.redirect('/');
  });

  // 用户页面get方法
  app.get('/u/:user', function(req, res) {
    User.get(req.params.user, function(err, user) {
      if (!user) {
        req.flash('error', 'User does not exist!');
        return res.redirect('/');
      }
      Post.get(user.name, function(err, posts) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/');
        }
        // console.log('Rendering posts!');
        res.render('user', {
          title: user.name,
          posts: posts,
          // post: 'Nothing!',
        });
      });
    });
  });

  // 发布页面post方法
  app.post('/post', checkLogin);
  app.post('/post', function(req, res){
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
    post.save(function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      req.flash('success', 'Post succeed!');
      res.redirect('/u/' + currentUser.name);
    });
  });

  // 模板页get方法
  app.get('/template', checkLogin);
  app.get('/template', function(req, res){
    res.render('template', {
      title: 'StigMod template!'
    });
  });
  // 模板页get方法
  app.get('/template_relation', checkLogin);
  app.get('/template_relation', function(req, res){
    res.render('template_relation', {
      title: 'StigMod template!'
    });
  });
  // 模板页get方法
  app.get('/template_user', checkLogin);
  app.get('/template_user', function(req, res){
    res.render('template_user', {
      title: 'StigMod template!'
    });
  });
  // 模板页get方法
  app.get('/template_project', checkLogin);
  app.get('/template_project', function(req, res){
    res.render('template_project', {
      title: 'StigMod template!'
    });
  });
  // 模板页get方法
  app.get('/template_project_ft', checkLogin);
  app.get('/template_project_ft', function(req, res){
    res.render('template_project_ft', {
      title: 'StigMod template!'
    });
  });
  // 模板页get方法
  app.get('/template_newmodel', checkLogin);
  app.get('/template_newmodel', function(req, res){
    res.render('template_newmodel', {
      title: 'StigMod template!'
    });
  });

  // 临时跳转页get方法
  app.get('/tmpjmp', checkLogin);
  app.get('/tmpjmp', function(req, res){
    res.render('tmpjmp', {
      title: 'temperory page'
    });
  });

  // 已登入状态判断函数
  function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'You have to sign in first!');
      return res.redirect('/login');
    }
    next();
  }

  // 未登入状态判断函数
  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', 'Already signed in!');
      return res.redirect('/');
    }
    next();
  }


};