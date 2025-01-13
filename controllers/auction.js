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

exports.submitLoginForm = async (req, res, next) => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        const isUserRegistred = await User.verifyUserAlreadyExists(username);
        if (isUserRegistred) {
            res.status(401).json({ error: 'O utilizador já existe!' });
            return console.log("O utilizador já existe!");
        }

        if (!User.verifyConfirmPassword(password, confirmPassword)) {
            res.status(400).json({ error: "As passwords não coincidem!" });
            return console.log("As passwords não coincidem!");
        }

        const newUser = new User(email, username, password);
        await newUser.signin();
        res.redirect("/");
    } catch (err) {
        console.error("Erro ao buscar o MAX userid:", err);
        throw err;
    }
}