// DevGuide - JavaScript simples. Cada bloco faz uma só coisa.

// 1. Menu para telemóvel: mostra/esconde o menu ao clicar no botão ☰
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", aberto);
});

// 2. Pesquisa: lista de páginas/tutoriais onde se pode pesquisar
const tutoriais = [
  { titulo: "O que é HTML?", url: "html.html", palavras: "html estrutura tags títulos parágrafos imagens links" },
  { titulo: "Como estilizar com CSS", url: "css.html", palavras: "css cores fontes margens espaçamentos estilos" },
  { titulo: "JavaScript: variáveis e funções", url: "javascript.html", palavras: "javascript js variáveis funções eventos botão" },
  { titulo: "Git e GitHub", url: "github.html", palavras: "git github repositório commit branch pull request issues push pull" },
  { titulo: "Perguntas frequentes", url: "faq.html", palavras: "faq perguntas dúvidas começar matemática programação" },
  { titulo: "Sobre o DevGuide", url: "about.html", palavras: "sobre equipa projeto académico objetivo" }
];
const campo = document.getElementById("search");
const lista = document.getElementById("results");
// Remove acentos e maiúsculas para a pesquisa ser mais flexível
const limpar = t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

campo.addEventListener("input", () => {
  const termo = limpar(campo.value.trim());
  lista.innerHTML = "";
  if (!termo) { lista.style.display = "none"; return; }
  const encontrados = tutoriais.filter(t => limpar(t.titulo + " " + t.palavras).includes(termo));
  if (encontrados.length === 0) {
    lista.innerHTML = '<li class="none">Sem resultados.</li>';
  }
  encontrados.forEach(t => {
    lista.innerHTML += `<li><a href="${t.url}">${t.titulo}</a></li>`;
  });
  lista.style.display = "block";
});

// 3. Botão interativo (existe na página de JavaScript)
const botao = document.getElementById("demo-btn");
if (botao) {
  botao.addEventListener("click", () => {
    document.getElementById("msg").textContent = "Olá! Acabaste de executar o teu primeiro evento em JavaScript. 🎉";
  });
}

// 4. Realce de código: pinta comentários, textos e palavras-chave
document.querySelectorAll("pre code").forEach(bloco => {
  const texto = bloco.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const regra = /(&lt;!--[\s\S]*?--&gt;|\/\*[\s\S]*?\*\/|\/\/.*|#.*)|("[^"\n]*"|'[^'\n]*')|\b(const|let|function|return|if|else|alert|document|git)\b/g;
  bloco.innerHTML = texto.replace(regra, (m, com, str) =>
    `<span class="${com ? "c" : str ? "s" : "k"}">${m}</span>`);
});
