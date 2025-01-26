// ...existing code...
const userBidsBtn = document.getElementById("my-auction-bids");
const userBidsDialog = document.getElementById("user-bids-dialog");
const closeUserBidsDialog = document.getElementById("close-user-bids-dialog");

if (userBidsBtn && userBidsDialog && closeUserBidsDialog) {
  userBidsBtn.addEventListener("click", () => {
    userBidsDialog.showModal();
  });
  closeUserBidsDialog.addEventListener("click", () => {
    userBidsDialog.close();
  });
}
// ...existing code...
