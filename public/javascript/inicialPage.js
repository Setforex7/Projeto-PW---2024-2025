document.addEventListener("DOMContentLoaded", () => {
    const makeBidButton = document.getElementById("profile");
    const loginDialog = document.getElementById("login-dialog");

    makeBidButton.addEventListener("click", () => {
        loginDialog.showModal();
    });

    
});