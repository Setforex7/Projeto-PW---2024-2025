const User = require('../models/users');
const Auction = require('../models/auction');

//! 
exports.initialPage = (req, res, next) => {
    res.render("auction/inicialPage", { login: User.validateLogin(req.session.credentials) });
},

//! Executar o signin
exports.signin = async (req, res, next) => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        const isUserRegistred = await User.verifyUserAlreadyExists(username, email);
        if (isUserRegistred) {
            return res.status(200).json({ message: 'O username ou email já estão em uso!' });
        }

        if (!User.verifyConfirmPassword(password, confirmPassword)) {
            return res.status(200).json({ message: 'As palavras não coincidem!' });
        }

        const newUser = new User(email, username, password);
        await newUser.signin();
        return res.status(200).redirect('/');
    } catch (err) {
        return  res.status(500).json({ error: "Erro interno do servidor." });
    }
};

//! Validar o login
exports.login = async (req, res, next) => {
    const { username, password } = req.body;    
    try{    
        const login = await User.login(username, password);

        if (!login) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        req.session.credentials = login;
        const userAuctions = await Auction.fetchUserAuctions(login.userid);

        console.log("userAuctions", userAuctions);
    }catch(err){
        return res.status(500).json({ error: "Erro interno do servidor." });
    }

    return res.redirect("/auth/");
}  

exports.logout = (req, res, next) => {
    console.log("sessao", req.session.credentials);
    if(req.session.credentials){
        res.redirect("/");
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({ error: "Erro interno do servidor." });
            }
        });
    }
};

//!
exports.profilePage = (req, res, next) => {
    res.render("profile", { login: User.validateLogin(req.session.credentials) });
};  

//! Criar leilão
exports.createAuction = async (req, res, next) => {
    const { name, description, category, state, sdate, edate } = req.body;

    console.log(req);
    console.log(req.body);
    //? Verifica se existe sessão ou não
    if(!req.session.credentials){
        throw new Error('Sessão inválida'); 
    }

    try{    
        //? Prepara os ids
        const userid = req.session.credentials.userid;

        let imagePath = null;
        if (req.file) {
            imagePath = req.file.filename;
        }

        // //? Cria o objeto do leilão e adiciona ao backend
        const newAuction = new Auction(name, description, category, state, sdate, edate, imagePath, userid);
        await newAuction.create();

        res.status(200).redirect('profile');
    }catch(err){
        console.error('Erro ao ir buscar o MAX auctionid:', err);
        throw err;
    }
}

exports.auctionPage = async (req, res, next) => {
    const allAuctions = await Auction.fetchAllAuctions();
    res.render('auction/auctions', { auctions: allAuctions });
}
