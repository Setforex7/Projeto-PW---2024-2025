const User = require('../models/users');
const Auction = require('../models/auction');

exports.initialPage = async (req, res, next) => {
    res.render("auction/inicialPage", { login: User.validateLogin(req.session.credentials) });
}

exports.auctionPage = async (req, res, next) => {
    const allAuctions = await Auction.fetchAllAuctions();
    res.render('auction/auctions', { login: User.validateLogin(req.session.credentials),
                                     auctions: allAuctions });       
}

exports.bidPage = async (req, res, next) => {
    res.render('auction/bid', { login: User.validateLogin(req.session.credentials) });
}

exports.profilePage = (req, res, next) => {
  res.render("auction/profile");
};

exports.adminDashboard = (req, res, next) => {
    res.render('admin/inicialPage');
}