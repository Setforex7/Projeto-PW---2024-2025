//? Verifica todo o conteudo da página antes de correr o código javascript
document.addEventListener("DOMContentLoaded", () => {
    
  const closeAuctionForm = document.getElementById("close-auction");
  const togglePopupAddAuction = document.getElementById("add-auction");

  //? Add Auction Form
  const addAuctionDialog = document.getElementById("add-auction-form");

  closeAuctionForm.addEventListener("click", () => {
    addAuctionDialog.style.display = "none";
    addAuctionDialog.close();
  });

  togglePopupAddAuction.addEventListener("click", () => {
    addAuctionDialog.style.display = "flex";
    addAuctionDialog.showModal();
  });

  
});
