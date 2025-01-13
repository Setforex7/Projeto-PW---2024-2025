document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loadingScreen = document.querySelector(".loader");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Mostra a tela de carregamento
    loadingScreen.style.display = "block";

    // Captura os dados do formulário
    const loginFormData = new FormData(loginForm);
    console.log(loginFormData);

    try {
      // Envia os dados para o backend
      const response = await fetch("/", {
        method: "POST",
        body: loginFormData,
      });

      // Analisa a resposta do servidor
      const result = await response.json();

      // Oculta a tela de carregamento
      loadingScreen.style.display = "none";

      if (response.ok) {
        alert("Login realizado com sucesso!");
        window.location.href = "/"; // Redireciona ou realiza outra ação
      } else {
        alert(result.error || "Erro ao realizar login.");
      }
    } catch (error) {
      loadingScreen.style.display = "none";
      alert("Erro de conexão. Tente novamente.");
    }
  });
});
