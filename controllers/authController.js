const User = require("../models/users");
const Auction = require("../models/auction");
const Bid = require("../models/bid");
const e = require("connect-flash");

//!
exports.initialPage = (req, res, next) => {
    res.render("auction/inicialPage", {
      login: User.validateLogin(req.session.credentials),
    });
},
  //! Executar o signin
exports.signin = async (req, res, next) => {
    try {
      const { email, username, password, confirmPassword } = req.body;

      const isUserRegistred = await User.verifyUserAlreadyExists(
        username,
        email
      );
      if (isUserRegistred) {
        return res
          .status(200)
          .json({ message: "O username ou email já estão em uso!" });
      }

      if (!User.verifyConfirmPassword(password, confirmPassword)) {
        return res.status(200).json({ message: "As palavras não coincidem!" });
      }

      const newUser = new User(email, username, password);
      await newUser.signin();
      return res.status(200).redirect("/");
    } catch (err) {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

//! Validar o login
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const login = await User.login(username, password);

      if (!login) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      req.session.credentials = login;
      const userAuctions = await Auction.fetchUserAuctions(login.userid);

    } catch (err) {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }

    return res.redirect("/");
};

exports.logout = (req, res, next) => {
  if (req.session.credentials) {
    res.redirect("/");
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Erro interno do servidor." });
      }
    });
  }
};

//!
exports.profilePage = async (req, res, next) => {
  const userAuctionsFormatted = [];
  const userAuctionsFinalized = [];

  if(!req.session.credentials) {
    return res.redirect("/");
  }

  const userBids = [];
  const userAllBids = await Bid.getUserAllBids(req.session.credentials.userid) || [];
  console.log(userAllBids);
  for(let bid of userAllBids){
    let auction = await Auction.fetchAuctionById(bid.auctionid);
    userBids.push({
      auctionid: bid.auctionid,
      name: auction.name,
      price: bid.value.toFixed(2).replace(".", ","),
      date: bid.date.toISOString().split("T")[0],
    });
  }
  
  const userAuctions = await Auction.fetchUserAuctions(req.session.credentials.userid) || [];

  if(userAuctions.length !== 0){
    for(let auction of userAuctions){
      let sdate = auction.sdate;
      let edate = auction.edate;
      let sDateString = sdate.toISOString();
      let eDateString = edate.toISOString();

      if(auction.finalized){
        userAuctionsFinalized.push({
            auctionid: auction.auctionid,
            name: auction.name,
            description: auction.description,
            category: auction.category,
            state: auction.state,
            sdate: sDateString.split("T")[0],
            edate: eDateString.split("T")[0],
            price: auction.price.toFixed(2).replace(".", ","),
            img: auction.image,
            userid: auction.userid,
            finalized: auction.finalized
        });
        continue;
      }
      userAuctionsFormatted.push({
        auctionid: auction.auctionid,
        name: auction.name,
        description: auction.description,
        category: auction.category,
        state: auction.state,
        sdate: sDateString.split("T")[0],
        edate: eDateString.split("T")[0],
        price: auction.price.toFixed(2).replace(".", ","),
        img: auction.image,
        userid: auction.userid,
        finalized: auction.finalized
      });
    };
  }

  console.log(userAuctionsFinalized);

  res.render("profile", { login: User.validateLogin(req.session.credentials),
                          userAuctions: userAuctionsFormatted,
                          userAuctionsFinalized: userAuctionsFinalized,
                          userBids: userBids });
};

//! Criar leilão
exports.createAuction = async (req, res, next) => {
  const { name, description, category, state, sdate, edate, price } = req.body;

  //? Verifica se existe sessão ou não
  if (!req.session.credentials) {
    throw new Error("Sessão inválida");
  }

  if(sdate > edate || sdate < new Date().toISOString().split("T")[0]){
    return res.status(200).redirect("/");
  }

  try {
    //? Prepara os ids
    const userid = req.session.credentials.userid;

    let imagePath = null;
    if (req.file) {
      imagePath = req.file.filename;
    }

    // //? Cria o objeto do leilão e adiciona ao backend
    const newAuction = new Auction(
      "",
      name,
      description,
      category,
      state,
      sdate,
      edate,
      imagePath,
      userid,
      price,
      false
    );
    await newAuction.create();

    res.status(200).redirect("/auction");
  } catch (err) {
    console.error("Erro ao ir buscar o MAX auctionid:", err);
    throw err;
  }
};

exports.makeBid = async (req, res, next) => {
  const { value } = req.body;
  const { auctionid, price, bids } = req.query;

  const newBid = new Bid("", req.session.credentials.userid, auctionid, value, new Date());
  
  //? Verifica se existe sessão ou não
  if(!req.session.credentials) {
    return res.redirect("/");
  }

  const renderBids = [];
  const biggestBid = await Bid.getAuctionWinnerBid(auctionid) || 0;
  const currentAuction = await Auction.fetchAuctionById(auctionid); 
  const auctionBids = await Bid.getFourHighestBids(auctionid);

  //? For para montar o array das bids
  for (const bid of auctionBids) {
    const date = bid.date;
    const dateString = date.toISOString();
    const getUserById = await User.getUserById(bid.userid);
    renderBids.push({
      username: getUserById.username,
      date: dateString.split("T")[0],
      price: bid.value.toFixed(2).replace(".", ","),
    });
  };

  //? Verifica se o valor da licitação é maior que o valor atual ou do ultimo lance
  if (biggestBid.value >= value || parseInt(price) >= parseInt(value)) {
    return res.render("auction/bid", { login: User.validateLogin(req.session.credentials), auction: currentAuction, bids: renderBids })
  }

  //? Vai buscar os lances do utilizador
  const userAuctionBids = await Bid.getUserAuctionBids(req.session.credentials.userid);

  //? Apaga os lances antigos do utilizador
  if(userAuctionBids.length !== 0){
    for(let bid of userAuctionBids){
      if(bid.auctionid === auctionid){
        await Bid.deleteUserBids(bid.auctionid, bid.userid);
      }
    }
  }

  //? Adiciona o lance ao banco de dados
  await newBid.create();

  //? Atualiza o valor do leilão
  await Auction.updateAuctionPrice(auctionid, value);
  const auction = await Auction.fetchAuctionById(auctionid);

  //? Vai buscar as 4 bids mais altas do leilao
  const fourBids = await Bid.getFourHighestBids(auctionid);
  renderBids.length = 0;

  //? For para montar o array das bids
  for (const bid of fourBids) {
    const date = bid.date;
    const dateString = date.toISOString();
    const getUserById = await User.getUserById(bid.userid);
    renderBids.push({
      username: getUserById.username,
      date: dateString.split("T")[0],
      price: bid.value.toFixed(2).replace(".", ","),
    });
  };

  res.render("auction/bid", { login: User.validateLogin(req.session.credentials), auction: auction, bids: renderBids });
}

exports.deleteAuction = async (req, res, next) => {
  try {
    const auctionid = req.query.auctionid || req.body.auctionid || req.params.auctionid;
    await Auction.deleteAuction(auctionid);

    const userAuctionsFormatted = [];

    const userAuctions = await Auction.fetchUserAuctions(req.session.credentials.userid) || [];

    if(userAuctions.length !== 0){
      for(let auction of userAuctions){
        let sdate = auction.sdate;
        let edate = auction.edate;
        let sDateString = sdate.toISOString();
        let eDateString = edate.toISOString();

        if(auction.finalized){
          continue;
        }
        userAuctionsFormatted.push({
          auctionid: auction.auctionid,
          name: auction.name,
          description: auction.description,
          category: auction.category,
          state: auction.state,
          sdate: sDateString.split("T")[0],
          edate: eDateString.split("T")[0],
          price: auction.price.toFixed(2).replace(".", ","),
          img: auction.image,
          userid: auction.userid,
          finalized: auction.finalized
        });
      };
  }

    res.render("profile", { login: User.validateLogin(req.session.credentials),
                            userAuctions: userAuctionsFormatted });
  } catch (err) {
    console.error("Erro ao apagar o leilão:", err);
    res.status(500).json({ error: "Erro ao apagar o leilão." });
  }
}

exports.auctionPage = async (req, res, next) => {
  const allAuctions = await Auction.fetchAllAuctions();
  res.render("auction/auctions", { auctions: allAuctions });
};
