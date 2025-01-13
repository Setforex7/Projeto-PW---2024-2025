//? Verifica todo o conteudo da página antes de correr o código javascript
document.addEventListener("DOMContentLoaded", () => {

  const togglePopupLogIn = document.getElementById("log-in");
  const togglePopupAddAuction = document.getElementById("add-auction");

  //? Login Form
  const loginDialog = document.getElementById("log-in-form");
  //? Add Auction Form
  const addAuctionDialog = document.getElementById("add-auction-form");

  togglePopupLogIn.addEventListener("click", () => {
    loginDialog.style.display = "flex";
    loginDialog.showModal();
  });

  togglePopupAddAuction.addEventListener("click", () => {
    addAuctionDialog.style.display = "flex";
    addAuctionDialog.showModal();
  });

  //* Form de login */

  const signinTab = document.getElementById("singin");
  const signinForm = document.getElementById("signin-form");
  const loginTab = document.getElementById("login");
  const loginForm = document.getElementById("login-form");

  signinTab.addEventListener("click", () => {
      loginForm.style.display = "none";
      signinForm.style.display = "flex";

      signinTab.classList.add("active");
      signinTab.classList.remove("inactive");

      loginTab.classList.add("inactive");
      loginTab.classList.remove("active");

      // Aqui você pode alternar o conteúdo dos formulários
      console.log("Sign In Tab Active");
  });

  loginTab.addEventListener("click", () => {
      loginForm.style.display = "flex";
      signinForm.style.display = "none";

      loginTab.classList.add("active");
      loginTab.classList.remove("inactive");

      signinTab.classList.add("inactive");
      signinTab.classList.remove("active");

      // Aqui você pode alternar o conteúdo dos formulários
      console.log("Log In Tab Active");
  });


  console.log("DOMVIEW.js");
});
