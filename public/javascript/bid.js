document.addEventListener("DOMContentLoaded", () => {
    const makeBidButton = document.getElementById("make-bid");

    const bidForm = document.getElementById("bid-form");

    const bids = document.querySelectorAll(".bid-box");
    const bidsBlackLine = document.querySelector(".black-line");

    if(bids.length != 4){
        bidsBlackLine.style.display = "none";
    }
    
    makeBidButton.addEventListener("click", () => {
        if(bidForm.style.display === "none") {
            bidForm.style.display = "flex";
        }else{
            bidForm.style.display = "none";
        }
    });
})