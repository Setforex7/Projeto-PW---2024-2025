const db = require("../database/db");

module.exports = class Auction {
  constructor(
    auctionid,
    name,
    description,
    category,
    state,
    sdate,
    edate,
    image,
    userid,
    price,
    finalized
  ) {
    this.auctionid = auctionid;
    this.name = name;
    this.description = description;
    this.category = category;
    this.state = state;
    this.sdate = sdate;
    this.edate = edate;
    this.img = image;
    this.userid = userid;
    this.price = price;
    this.finalized = finalized;
  }

  //#region AÇÕES DOS LEILÕES

  //? Cria um leilão na base de dados
  async create() {
    this.auctionid = await this.getLastActionId() || "1";
    this;
    try {
      await db.query(
        `INSERT INTO "Auctions" (auctionid, name, description, state, category, sdate, edate, image, userid, price, finalized) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          this.auctionid,
          this.name,
          this.description,
          this.state,
          this.category,
          this.sdate,
          this.edate,
          this.img,
          this.userid,
          this.price,
          this.finalized
        ]
      );

      ("Leilão criado com sucesso!");
    } catch (err) {
      console.error("Erro ao ir buscar o MAX auctionid:", err);
      throw err;
    }
  }

  static async updateAuctionPrice(auctionid, price){
    try{
      await db.query(`UPDATE "Auctions" SET price = $1 WHERE auctionid = $2`, [price, auctionid]);
    }catch(err){
      console.error("Erro ao atualizar o preço do leilão:", err);
      throw err;
    }
  }

  static async deleteAuction(auctionid) {
    try{
      await db.query('DELETE FROM bids WHERE auctionid = $1', [auctionid]);
      await db.query('DELETE FROM "Auctions" WHERE auctionid = $1', [auctionid]); 
    }catch(err){
      console.error("Erro ao eliminar o leilão:", err);
      throw err;
    }
  }

  //? Devolve o último id de leilão da base de dados para garantir auto increment
  async getLastActionId() {
    try{
      const lastAuctionid = await db.query(
        'SELECT MAX(auctionid) AS max_auction_id FROM "Auctions"'
      );
      return parseInt(lastAuctionid.rows[0].max_auction_id) + 1;
    }catch(err){
      console.error("Erro ao ir buscar o MAX auctionid:", err);
      throw err;
    }
  }

  //#region INFORMAÇÃO DOS LEILÕES

  //? Retorna todos os leilões
  static async fetchAllAuctions() {
    try{
      const allAuctions = await db.query('SELECT * FROM "Auctions"');
      return allAuctions.rows;
    }catch(err){
      console.error("Erro ao ir buscar o MAX auctionid:", err);
      throw err;
    }
  }

  static async fetchAuctionById(auctionid) {
    try{
      const auction = await db.query('SELECT * FROM "Auctions" WHERE auctionid = $1', [auctionid]);
      return auction.rows[0];
    }catch(err){
      console.error("Erro ao ir buscar o leilão pelo ID:", err);
      throw err;
    }
  }
  
  static async fetchAuctionsByName(name) {
    try{
      const auctions = await db.query('SELECT * FROM "Auctions" WHERE name ILIKE $1', [`%${name}%`]);
      return auctions.rows;
    }catch(err){
      console.error("Erro ao ir buscar os leilões pelo nome:", err);
      throw err;
    }
  }

  //? Retorna os leilões de um utilizador
  static async fetchUserAuctions(userid) {
    if (!userid) throw new Error("ID do utilizador não foi fornecido!");

    try {
      const userAuctions = await db.query(
        'SELECT * FROM "Auctions" WHERE userid = $1',
        [userid]
      );

      if (userAuctions.rows.length === 0) return null;
      return userAuctions.rows;
    } catch (err) {
      console.error("Erro ao ir buscar os leilões do utilizador:", err);
      throw err;
    }
  }

  //#endregion
};
