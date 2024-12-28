

const togglePopup = document.getElementById("teste");
const dialog = document.querySelector("dialog");

togglePopup.addEventListener("click", () => {
    dialog.style.display = "flex";
    dialog.showModal();
});


console.log("DOMVIEW.js");
