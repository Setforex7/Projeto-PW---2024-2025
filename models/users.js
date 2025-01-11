module.exports = class users{
    
    
    constructor(name, email, username, password, confirmPassword){
        this.userid = 1,
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.isPasswordEqual = this.verifyConfirmPassword();
    }

    verifyConfirmPassword(){
        if(this.password === this.confirmPassword){
            console.log("tudo certo");
            return true
        }else{
            console.log("tudo errado");
            return false;
        }
    }

    register(){
        console.log("sou eu, siuuuuu");
    }
}