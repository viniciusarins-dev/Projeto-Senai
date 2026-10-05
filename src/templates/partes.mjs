// Peças compartilhadas entre as páginas: layout, header, footer, imagens e links.
import { marca, colecoes, imagens } from "../data/catalogo.mjs";

export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const pad = (n) => String(n).padStart(2, "0");

export const whatsapp = (mensagem) =>
  `https://wa.me/${marca.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const instagram = `https://www.instagram.com/${marca.instagram}/`;

export const icone = {
  seta: `<svg class="ico" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  whatsapp: `<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 1.9 6.5L4 29l7.7-1.9A12 12 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3Zm0 21.8c-2 0-3.9-.6-5.5-1.5l-.4-.2-4.6 1.1 1.2-4.5-.3-.4A9.7 9.7 0 0 1 5.3 15C5.3 9.1 10.1 4.3 16 4.3S26.8 9.1 26.8 15 21.9 24.8 16 24.8Zm5.9-8.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.8.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>`,
  instagram: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/></svg>`,
};

// <img> com dimensões reais (evita layout shift). `base` corrige o caminho relativo.
export const imagem = (im, base, { classe = "", prioridade = false, sizes = "" } = {}) =>
  `<img src="${base}${im.src}" width="${im.w}" height="${im.h}" alt="${esc(im.alt)}"` +
  `${classe ? ` class="${classe}"` : ""}${sizes ? ` sizes="${sizes}"` : ""}` +
  (prioridade ? ` fetchpriority="high"` : ` loading="lazy"`) +
  ` decoding="async">`;

export const opcoesTexto = (opcoes = []) => opcoes.join(" · ");

const nav = (base) => [
  { href: `${base}#colecoes`, texto: "Produtos" },
  { href: `${base}#sob-medida`, texto: "Sob medida" },
  { href: `${base}#sobre`, texto: "Sobre" },
  { href: `${base}#contato`, texto: "Contato" },
];

export const header = (base, { escuro = false } = {}) => `
<header class="topo${escuro ? " topo--escuro" : ""}" data-topo>
  <div class="topo__barra">
    <a class="marca" href="${base || "./"}" aria-label="${marca.nome} — página inicial">
      <span class="marca__nome">${marca.nome}</span>
      <span class="marca__assinatura">${marca.assinatura}</span>
    </a>
    <nav class="topo__nav" id="menu" aria-label="Principal">
      <ul>
        ${nav(base).map((l) => `<li><a href="${l.href}">${l.texto}</a></li>`).join("")}
      </ul>
      <a class="topo__cta" href="${whatsapp("Olá! Vim pelo site da CRIEXO e gostaria de solicitar um projeto.")}" target="_blank" rel="noopener">
        Solicitar projeto ${icone.seta}
      </a>
    </nav>
    <button class="topo__menu" type="button" aria-expanded="false" aria-controls="menu" data-menu>
      <span class="topo__menu-abrir">Menu</span><span class="topo__menu-fechar">Fechar</span>
    </button>
  </div>
</header>`;

export const footer = (base) => `
<footer class="rodape">
  <div class="rodape__grade">
    <div class="rodape__marca">
      ${imagem(imagens.logo, base, { classe: "rodape__logo" })}
      <p class="rodape__slogan">${esc(marca.slogan)}</p>
    </div>
    <nav class="rodape__col" aria-label="Coleções">
      <p class="rotulo">Coleções</p>
      <ul>
        ${colecoes.map((c) => `<li><a href="${base}colecoes/${c.slug}/">${esc(c.nome)}</a></li>`).join("")}
      </ul>
    </nav>
    <nav class="rodape__col" aria-label="Site">
      <p class="rotulo">Site</p>
      <ul>
        ${nav(base).map((l) => `<li><a href="${l.href}">${l.texto}</a></li>`).join("")}
      </ul>
    </nav>
    <div class="rodape__col">
      <p class="rotulo">Contato</p>
      <ul>
        <li><a href="${whatsapp("Olá! Vim pelo site da CRIEXO.")}" target="_blank" rel="noopener">${icone.whatsapp} ${marca.whatsappExibicao}</a></li>
        <li><a href="${instagram}" target="_blank" rel="noopener">${icone.instagram} @${marca.instagram}</a></li>
      </ul>
    </div>
  </div>
  <div class="rodape__base">
    <span>© ${new Date().getFullYear()} ${marca.nome} — ${marca.assinatura}</span>
    <span>Impressão 3D personalizada</span>
  </div>
</footer>`;

export const layout = ({ titulo, descricao, caminho, base, corpo, escuro = false, imagemOg = "assets/img/og-criexo.jpg", jsonLd }) => {
  const absoluto = marca.siteUrl ? marca.siteUrl.replace(/\/$/, "") + "/" + caminho : "";
  const og = marca.siteUrl ? `${marca.siteUrl.replace(/\/$/, "")}/${imagemOg}` : `${base}${imagemOg}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
${absoluto ? `<link rel="canonical" href="${absoluto}">` : ""}
<meta name="theme-color" content="#151515">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${marca.nome}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:image" content="${og}">
${absoluto ? `<meta property="og:url" content="${absoluto}">` : ""}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="${base}assets/img/favicon.png">
<link rel="apple-touch-icon" href="${base}assets/img/apple-touch-icon.png">
<link rel="preload" href="${base}assets/fonts/archivo-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/css/style.css">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ""}
<script>document.documentElement.classList.add("js")</script>
<script src="${base}assets/js/main.js" defer></script>
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${header(base, { escuro })}
<main id="conteudo">
${corpo}
</main>
${footer(base)}
</body>
</html>
`;
};
