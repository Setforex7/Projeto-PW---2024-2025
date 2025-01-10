const togglePopupLogIn = document.getElementById("log-in");
const togglePopupAddAuction = document.getElementById("add-auction");
const logInForm = document.getElementById("log-in-form");
const addAuctionForm = document.getElementById("add-auction-form");

togglePopupLogIn.addEventListener("click", () => {
  logInForm.style.display = "flex";
  logInForm.showModal();
});

togglePopupAddAuction.addEventListener("click", () => {
  addAuctionForm.style.display = "flex";
  addAuctionForm.showModal();
});


console.log("DOMVIEW.js");
