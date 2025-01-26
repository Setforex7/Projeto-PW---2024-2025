const db = require("../database/db");

module.exports = class Bid {
    constructor(bidid, userid, auctionid, value, date) {
        this.bidid = bidid;
        this.userid = userid;
        this.auctionid = auctionid;
        this.value = value;
        this.date = date;
    }

    async create() {
        this.bidid = await this.getLastBidId() || "1";
        try {
            await db.query(
                `INSERT INTO "bids" (bidid, userid, auctionid, value, date) VALUES ($1, $2, $3, $4, $5)`,
                [this.bidid, this.userid, this.auctionid, this.value, this.date]
            );
            console.log("Bid criada com sucesso!");
        } catch (err) {
            console.error("Erro ao criar bid:", err);
            throw err;
        }
    }

    static async deleteUserBids(auctionid, userid){
        try{
            await db.query('DELETE FROM "bids" WHERE auctionid = $1 AND userid = $2', [auctionid, userid]);
        }catch(err){
            console.error("Erro ao ir buscar o vencedor do leilão:", err);
            throw err;
        }
    }

    async getLastBidId() {
        try{
            const lastBidId = await db.query(
                `SELECT MAX(bidid) FROM "bids"`
            );
        return parseInt(lastBidId.rows[0].max) + 1;
        }catch(err){
            console.error("Erro ao ir buscar o MAX bidid:", err);
            throw err;
        }
    }

    static async getFourHighestBids(auctionid) {
        try{
            const fourBids = await db.query('SELECT * FROM "bids" WHERE auctionid = $1 ORDER BY value DESC LIMIT 4', [auctionid]);
            return fourBids.rows;
        }catch(err){
            console.error("Erro ao ir buscar as 4 bids mais altas:", err);
            throw err;
        }
    }

    static async getUserAuctionBids(userid) {
        try{
            const userAuctionBids = await db.query('SELECT * FROM "bids" WHERE userid = $1', [userid]);
            return userAuctionBids.rows;
        }catch(err){
            console.error("Erro ao ir buscar os bids do utilizador:", err);
            throw err;
        }
    }

    static async getAuctionWinnerBid(auctionid){
        try{
            const winnerBid = await db.query('SELECT * FROM "bids" WHERE auctionid = $1 ORDER BY value DESC LIMIT 1', [auctionid]);
            return winnerBid.rows[0];
        }catch(err){
            console.error("Erro ao ir buscar o vencedor do leilão:", err);
            throw err;
        }
    }

    static async getUserAllBids(userid){
        try{
            const userAllBids = await db.query('SELECT * FROM "bids" WHERE userid = $1', [userid]);
            return userAllBids.rows;
        }catch(err){
            console.error("Erro ao ir buscar os bids do utilizador:", err);
            throw err;
        }
    }

    static async getAuctionBid(){
        try{
            const auction  = await db.query('SELECT * FROM "bids" WHERE auctionid = $1', [this.auctionid]);
            return auction.rows;
        }catch(err){
            console.error("Erro ao ir buscar os bids do leilão:", err);
            throw err;
        }
    }
}