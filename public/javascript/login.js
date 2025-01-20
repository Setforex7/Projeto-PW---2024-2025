document.addEventListener("DOMContentLoaded", () => {
  const closeLoginForm = document.getElementById("close-login");
  const togglePopupLogIn = document.getElementById("login-button");
  //? Login Form
  const loginDialog = document.getElementById("login-dialog");

    togglePopupLogIn.addEventListener("click", () => {
        loginDialog.style.display = "flex";
        loginDialog.showModal();
    });

    const signinTab = document.getElementById("signin-tab");
    const signinForm = document.getElementById("signin-form");
    const loginTab = document.getElementById("login-tab");
    const loginForm = document.getElementById("login-form");

    signinTab.addEventListener("click", () => {
        loginForm.style.display = "none";
        signinForm.style.display = "flex";

        signinTab.classList.add("active");
        signinTab.classList.remove("inactive");

        loginTab.classList.add("inactive");
        loginTab.classList.remove("active");
    });

    loginTab.addEventListener("click", () => {
        loginForm.style.display = "flex";
        signinForm.style.display = "none";

        loginTab.classList.add("active");
        loginTab.classList.remove("inactive");

        signinTab.classList.add("inactive");
        signinTab.classList.remove("active");

        // Aqui você pode alternar o conteúdo dos formulários
    });

    closeLoginForm.addEventListener("click", () => {
        loginDialog.style.display = "none";
        loginDialog.close();
    });
});