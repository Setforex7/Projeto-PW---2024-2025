const db = require('../database/db');

module.exports = class Auction {
    constructor(name, description, category, state, sdate, edate, image, userid){
        this.auctionid = null;
        this.name = name;
        this.description = description;
        this.category = category;
        this.state = state;
        this.sdate = sdate;
        this.edate = edate;
        this.img = image;
        this.userid = userid;
    }

    //#region AÇÕES DOS LEILÕES

    //? Cria um leilão na base de dados
    async create(){
        this.auctionid = await this.getLastActionId();
        console.log(this);
        try{
            await db.query(
                `INSERT INTO "Auctions" (auctionid, name, description, state, category, sdate, edate, image, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [this.auctionid, this.name, this.description, this.state, this.category, this.sdate, this.edate, this.img, this.userid]
            );

            console.log('Leilão criado com sucesso!');
        }catch(err){
            console.error('Erro ao ir buscar o MAX auctionid:', err);
            throw err;
        }
    }

    //? Devolve o último id de leilão da base de dados para garantir auto increment
    async getLastActionId(){
        const lastAuctionid = await db.query(
            'SELECT MAX(auctionid) AS max_auction_id FROM "Auctions"'
        );
        return parseInt(lastAuctionid.rows[0].max_auction_id) + 1;
    }

    //#region INFORMAÇÃO DOS LEILÕES

    //? Retorna todos os leilões
    static async fetchAllAuctions(){
        const allAuctions = await db.query(
            'SELECT * FROM "Auctions"'
        )
        console.log(allAuctions.rows);
        return allAuctions.rows;
    }

    //? Retorna os leilões de um utilizador
    static async fetchUserAuctions(userid){
        if(!userid) throw new Error('ID do utilizador não foi fornecido!');

        try{
            const userAuctions = await db.query(
                'SELECT * FROM "Auctions" WHERE userid = $1',
                [userid]
            );

            if (userAuctions.rows.length === 0) return null;
            return userAuctions.rows;
        }catch(err){
            console.error('Erro ao ir buscar os leilões do utilizador:', err);
            throw err;
        }
    }

    //#endregion
}