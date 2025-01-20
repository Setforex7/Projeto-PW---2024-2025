const User = require('../models/users');

exports.initialPage = async (req, res, next) => {
    res.render("auction/inicialPage", { login: User.validateLogin(req.session.credentials) });
}

exports.auctionPage = (req, res, next) => {
    res.render('auction/auctions', { login: User.validateLogin(req.session.credentials) });  ;
}

exports.profilePage = (req, res, next) => {
  res.render("auction/profile");
};

exports.adminDashboard = (req, res, next) => {
    res.render('admin/inicialPage');
}