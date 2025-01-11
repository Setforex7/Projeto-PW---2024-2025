const db = require('../database/db');

module.exports = class User {
  constructor(email, username, password) {
    this.userid = null;
    this.username = username;
    this.email = email;
    this.password = password;
  }

    //? Função que regista um utilizador na base de dados
    async signin() {
        const userId = await User.getLastUserId();
        try {
        await db.query(
            `INSERT INTO "Users" (userid, email, username, password) VALUES ($1, $2, $3, $4)`,
            [userId, this.email, this.username, this.password]
        );
        this.userid = userId;
        console.log("Utilizador registrado com sucesso!");
        } catch (err) {
        console.error("Erro ao registrar usuário:", err);
        throw err;
        }
    }

    //? Função que devolve o último id de utilizador da base de dados
    static async getLastUserId() {
        try{
            const lastUserId = await db.query(
                'SELECT MAX(userid) AS max_user_id FROM "Users"'
            );
            return parseInt(lastUserId.rows[0].max_user_id) + 1;
        }catch(err){
            console.error('Erro ao buscar o MAX userid:', err);
            throw err;
        }
    }

  //? Função que verifica se o utilizador a ser criado já está na base de dados
  static async verifyUserAlreadyExists(username) {
    const result = await db.query('SELECT 1 FROM "Users" WHERE username = $1', [
      username,
    ]);
    return result.rows.length > 0;
  }

  //? Função que verifica se a password e a confirmação da password coincidem
  static verifyConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  }
};