
const User = require('../models/users');

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

exports.login = async (req, res, next) => {
    const { username, password } = req.body;    

    try{
        const login = User.login(username, password);

        if(login){
            req.session.credentials = login;
            console.log(req.session.credentials);
            return res.status(200).json({ message: 'Login bem-sucedido!' });
        }else{
        }
    }catch(err){
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}   