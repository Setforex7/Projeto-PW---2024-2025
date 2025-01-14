const User = require('../models/users');

exports.initialPage = async (req, res, next) => {
    res.render('auction/inicialPage');
}

exports.auctionPage = (req, res, next) => {
    res.render('auction/auctions');
}

exports.profilePage = (req, res, next) => {
  res.render("auction/profile");
};

exports.adminDashboard = (req, res, next) => {
    res.render('admin/inicialPage');
}