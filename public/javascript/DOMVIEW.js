const togglePopupLogIn = document.getElementById("log-in");
const togglePopupAddAuction = document.getElementById("add-auction");

//? Login Form
const logInForm = document.getElementById("log-in-form");
//? Add Auction Form
const addAuctionForm = document.getElementById("add-auction-form");

togglePopupLogIn.addEventListener("click", () => {
  logInForm.style.display = "flex";
  logInForm.showModal();
});

togglePopupAddAuction.addEventListener("click", () => {
  addAuctionForm.style.display = "flex";
  addAuctionForm.showModal();
});

const signinTab = document.getElementById("singin");
const loginTab = document.getElementById("login");

  signinTab.addEventListener("click", () => {
    signinTab.classList.add("active");
    signinTab.classList.remove("inactive");

    loginTab.classList.add("inactive");
    loginTab.classList.remove("active");

    // Aqui você pode alternar o conteúdo dos formulários
    console.log("Sign In Tab Active");
  });

  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    loginTab.classList.remove("inactive");

    signinTab.classList.add("inactive");
    signinTab.classList.remove("active");

    // Aqui você pode alternar o conteúdo dos formulários
    console.log("Log In Tab Active");
});



console.log("DOMVIEW.js");
