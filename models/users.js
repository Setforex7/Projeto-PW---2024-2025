const db = require('../database/db');
const bcrypt = require('bcrypt');

module.exports = class User {
    constructor(email, username, password) {
      this.userid = null;
      this.username = username;
      this.email = email;
      this.password = password;
    }

    //? Função que regista um utilizador na base de dados
    async signin() {
        try {
          const userId = await this.getLastUserId();
          const hashedPassword = await bcrypt.hash(this.password, 10);
          await db.query(
            `INSERT INTO "Users" (userid, email, username, password) VALUES ($1, $2, $3, $4)`,
            [userId, this.email, this.username, hashedPassword]
          );
          this.userid = userId;
          console.log("Utilizador registrado com sucesso!");
        } catch (err) {
          console.error("Erro ao registrar usuário:", err);
          throw err;
        }
    }

    static async login(username, password){
      try{
        //? Vai buscar a propriedade Rows do objeto devolvido na resposta (rows contem os dados receibos)
        const { rows } = await db.query(
          'SELECT * FROM "Users" WHERE username = $1', 
          [username]);
        //? Verificamos se a query funcionou
        if(rows.length > 0){
          //? Encryptamos a palavra pass e verificamos com a palavra pass da base de dados
          const isValidPassword = await bcrypt.compare(password, rows[0].password);
          if(isValidPassword){
            return rows[0];
          }
        }
        return null;
      }catch(err){
        throw err;
      }
    }

    static validateLogin(session){
      const isLogged = session ? true : false;
      return { user: session, 
               isLogged: isLogged };
    }

    //? Função que devolve o último id de utilizador da base de dados
    async getLastUserId() {
        try{
            const lastUserId = await db.query(
                'SELECT MAX(userid) AS max_user_id FROM "Users"'
            );
            return parseInt(lastUserId.rows[0].max_user_id) + 1;
        }catch(err){
            console.error('Erro ao ir buscar o MAX userid:', err);
            throw err;
        }
    }

    //? Função que verifica se o utilizador a ser criado já está na base de dados
    static async verifyUserAlreadyExists(username, email) {
      const result = await db.query('SELECT 1 FROM "Users" WHERE username = $1 and email = $2', [
        username, email
      ]);
      return result.rows.length > 0;
    }

    //? Função que verifica se a password e a confirmação da password coincidem
    static verifyConfirmPassword(password, confirmPassword) {
      return password === confirmPassword;
    }
};