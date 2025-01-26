//? Verifica todo o conteudo da página antes de correr o código javascript
document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelectorAll('button[data-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            const formId = button.getAttribute('data-toggle');
            const form = document.getElementById(formId);
            const action = getAction(button);
            const displayText = getDisplayText(action);
            
            
            document.querySelectorAll('.user-info form').forEach(f => {
                if (f !== form) {
                    f.style.display = 'none';
                    const btn = document.querySelector(`button[data-toggle="${f.id}"]`);
                    btn.textContent = 'Alterar ' + getDisplayText(getAction(btn));
                    
                   
                    const h3 = f.nextElementSibling;
                    if (h3 && h3.classList.contains(`${getAction(btn)}-title`)) {
                        h3.style.display = 'block';
                    }
                }
            });
            
            
            if (form.style.display === 'none' || form.style.display === '') {
                form.style.display = 'flex';
                button.textContent = 'Cancelar';
                
                
                const h3 = form.nextElementSibling;
                if (h3 && h3.classList.contains(`${action}-title`)) {
                    h3.style.display = 'none';
                }
            } else {
                form.style.display = 'none';
                button.textContent = 'Alterar ' + displayText;
                
                
                const h3 = form.nextElementSibling;
                if (h3 && h3.classList.contains(`${action}-title`)) {
                    h3.style.display = 'block';
                }
            }
        });
    });

    function getAction(button) {
        if (button.classList.contains('email')) return 'email';
        if (button.classList.contains('iban')) return 'iban';
        if (button.classList.contains('phone')) return 'phone';
        return '';
    }

    function getDisplayText(action) {
        const mapping = {
            'email': 'Email',
            'iban': 'IBAN',
            'phone': 'Telemovel'
        };
        return mapping[action] || '';
    }

    const auctionsButton = document.getElementById('my-auctions-button');
    const auctionsModal = document.querySelector('.user-auctions');

    const userFinalizedAuctionsButton = document.getElementById('my-finalized-auctions');
    const userFinalizedAuctionsModal = document.querySelector('.user-auctions-finalized');

    const userBidsButton = document.getElementById("my-auction-bids");
    const userBidsModal = document.querySelector(".user-auctions-bids");
    
    const closeAuctionsButton = document.getElementById("close-user-auctions-dialog");
    const closeFinalizedAuctionsButton = document.getElementById("close-user-auctions-finalized-dialog");
    const closeBidsButton = document.getElementById("close-user-bids");

    auctionsButton.addEventListener('click', () => {
        auctionsModal.showModal();
    });

    closeAuctionsButton.addEventListener("click", () => {
        auctionsModal.close();
    });

    auctionsModal.addEventListener('click', (event) => {
        if (event.target === auctionsModal) {
            auctionsModal.close();
        }
    });

    userFinalizedAuctionsButton.addEventListener('click', () => {
        userFinalizedAuctionsModal.showModal();
    });

    closeFinalizedAuctionsButton.addEventListener("click", () => {
        userFinalizedAuctionsModal.close();
    });

    userFinalizedAuctionsModal.addEventListener('click', (event) => {
        if (event.target === userFinalizedAuctionsModal) {
            userFinalizedAuctionsModal.close();
        }
    });

    userBidsButton.addEventListener("click", () => {
        userBidsModal.showModal();
    });

    closeBidsButton.addEventListener("click", () => {
        userBidsModal.close();
    });

    userBidsModal.addEventListener("click", (event) => {
        if (event.target === userBidsModal) {
            userBidsModal.close();
        }
    });
});
