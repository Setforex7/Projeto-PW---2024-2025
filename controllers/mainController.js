const User = require("../models/users");
const Auction = require("../models/auction");
const Bid = require("../models/bid");
const email = require("../util/nodemailer");
const db = require("../database/db");

exports.initialPage = async (req, res, next) => {
  const allAuctions = await Auction.fetchAllAuctions();

  const finishAuctions = allAuctions.filter(auction => auction.edate < new Date() && auction.finalized === false);  
  console.log(finishAuctions);

  const winnerEmails = [];

  for (let auction of finishAuctions) {
    // Obtém a oferta vencedora para cada leilão
    const winnerBid = await Bid.getAuctionWinnerBid(auction.auctionid);

    // Se houver uma oferta vencedora
    if (winnerBid) {
      // Obtém o usuário pelo ID
      const user = await User.getUserById(winnerBid.userid);

      // Cria um objeto com os detalhes necessários
      const winnerDetails = {
        email: user.email, // E-mail do usuário
        auction: auction, // Leilão vencido
        bidValue: winnerBid.value, // Valor da oferta vencedora
      };

      // Adiciona ao array de vencedores
      winnerEmails.push(winnerDetails);
    }
  }

  for(let winner of winnerEmails){
    await db.query('UPDATE "Auctions" SET finalized = $1 WHERE auctionid = $2', [true, winner.auction.auctionid]);
    let auctionPath = `http://localhost:4000/bid-auction?auction=${winner.auction}`;
    email.sendMail(
      winner.email,
      `Ganhas-te o leilão do jogo: ${winner.auction.name}`,
      "Parabéns, ganhas-te o leilão do jogo: " +
        winner.auction.name +
        " com a oferta de " +
        winner.bidValue +
        "€",
      `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          color: #333333;
          padding: 20px;
          margin: 0;
        }
        .email-container {
          background-color: #ffffff;
          padding: 20px;
          border: 2px solid #333;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: auto;
        }
        .header {
          background-color: rgb(220, 168, 55);
          color: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }
        .message {
          font-size: 18px;
          color: #333333;
          line-height: 1.6;
          margin: 20px 0;
          padding: 20px;
        }
        .highlight {
          font-weight: bold;
          color: rgb(220, 168, 55);
        }
        .footer {
          font-size: 14px;
          color: #888888;
          text-align: center;
          margin-top: 30px;
        }
        .btn-email {
          display: inline-block;
          background-color: rgb(220, 168, 55);
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          text-align: center;
          margin-top: 20px;
        }
        .a{
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Parabéns!</h1>
        </div>
        <div class="message">
          <p>Olá!</p>
          <p>Parabéns, <span class="highlight">ganhaste o leilão do jogo: <strong>${winner.auction.name}</strong></span> com o lance de <span class="highlight">${winner.bidValue}€</span>.</p>
          <p>Estamos muito felizes com a sua participação!</p>
          <a href="${auctionPath}" class="btn-email">Ver o leilão</a>
        </div>
        <div class="footer">
          <p>Este é um e-mail automático. Por favor, não responda.</p>
        </div>
      </div>
    </body>
  </html>
`
    );
  }
  console.log(winnerEmails);

  const featuredAuctions = await Auction.fetchSixFeaturedAuctions();
  const notFinalizedAuctions = featuredAuctions.filter(auction => auction.finalized === false);
  res.render("auction/inicialPage", {
    login: User.validateLogin(req.session.credentials),
    auctions: featuredAuctions,
  });
  
};

exports.auctionPage = async (req, res, next) => {
  const { name } = req.query;
  const auctionsByName = await Auction.fetchAuctionsByName(name);

  let notFinalizedAuctions = [];

  if(auctionsByName.length !== 0){
    notFinalizedAuctions = auctionsByName.filter(auction => auction.finalized === false);
  }else{
    const allAuctions = await Auction.fetchAllAuctions();
    notFinalizedAuctions = allAuctions.filter(auction => auction.finalized === false);
  }

  const auctionObjects = notFinalizedAuctions.map(
    (auction) => 
          new Auction(
          auction.auctionid,
          auction.name,
          auction.description,
          auction.category,
          auction.state,
          auction.sdate,
          auction.edate,
          auction.image,
          auction.userid,
          auction.price,
          auction.finalized)
  );
  console.log(auctionObjects);
  res.render("auction/auctions", {
    login: User.validateLogin(req.session.credentials),
    auctions: auctionObjects,
  });
};

exports.bidPage = async (req, res, next) => {
  const {
    auctionid,
    name,
    category,
    state,
    price,
    sdate,
    edate,
    description,
    image,
    userid
  } = req.query;
  const selectedAuction = {
    auctionid,
    name,
    category,
    state,
    price,
    sdate,
    edate,
    description,
    image,
    userid
  };

  if (!req.session.credentials) {
    return res.redirect("/");
  }

  const bids = [];
  //? Vai buscar as 4 bids mais altas do leilao
  const fourBids = await Bid.getFourHighestBids(auctionid);

  //? For para montar o array das bids
  for (const bid of fourBids) {
    const date = bid.date;
    const dateString = date.toISOString();
    const getUserById = await User.getUserById(bid.userid);
    bids.push({
      username: getUserById.username,
      date: dateString.split("T")[0],
      price: bid.value.toFixed(2).replace(".", ","),
    });
  };

  res.render("auction/bid", {
    login: User.validateLogin(req.session.credentials),
    auction: selectedAuction,
    bids: bids,
  });
};

exports.profilePage = (req, res, next) => {
  res.render("auction/profile");
};

exports.usPage = (req, res, next) => {
  res.render("auction/us", { login: User.validateLogin(req.session.credentials) });
};
