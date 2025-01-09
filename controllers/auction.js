exports.initialPage = (req, res, next) => {
    res.render('auction/inicialPage');
}

exports.auctionPage = (req, res, next) => {
    res.render('auction/auctions');
}

exports.adminDashboard = (req, res, next) => {
    res.render('admin/inicialPage');
}