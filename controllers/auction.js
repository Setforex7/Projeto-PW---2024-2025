const db = require('../database/db');

const User = require('../models/users');

exports.initialPage = (req, res, next) => {
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

exports.submitLoginForm = async (req, res, next) => {
    try {
        const lastUserIdQuery = await db.query('SELECT MAX(userid) AS max_user_id FROM "Utilizador"');
        console.log(req);
        let lastUserId = lastUserIdQuery.rows[0].max_user_id;
        let newUser = new User(req.body.name, req.body.email, req.body.password, req.body.confirmPassword);
        console.log(newUser);
      } catch (err) {
        console.error('Erro ao buscar o MAX userid:', err);
        throw err;
      }
}