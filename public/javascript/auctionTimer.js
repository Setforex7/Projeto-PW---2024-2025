document.addEventListener("DOMContentLoaded", () => {
  const timers = document.querySelectorAll(".timer");

  timers.forEach((timer) => {
    const endTime = new Date(timer.dataset.endtime).getTime();
    console.log(endTime);

    function updateTimer() {
      const now = Date.now();
      const timeRemaining = endTime - now;

      if (timeRemaining <= 0) {
        timer.textContent = "Leilão encerrado";
        return clearInterval(interval);
      }

      const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
      const seconds = Math.floor((timeRemaining / 1000) % 60);

      timer.textContent = `Tempo restante: ${hours}h ${minutes}m ${seconds}s`;
    }

    updateTimer(); // Chamada inicial para evitar atraso
    const interval = setInterval(updateTimer, 1000); // Atualiza a cada segundo
  });
});
