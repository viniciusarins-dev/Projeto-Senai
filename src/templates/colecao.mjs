import { marca, colecoes } from "../data/catalogo.mjs";
import { esc, pad, whatsapp, icone, imagem, opcoesTexto, layout } from "./partes.mjs";

const base = "../../";

const slugify = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// "Vasos personalizáveis" → o qualificador vira itálico, como o selo do catálogo.
const tituloH1 = (t) => esc(t).replace(/(personaliz\S+)$/i, "<em>$1</em>");

// Imagens muito horizontais ocupam a largura toda; as demais alternam na grade.
const panoramica = (im) => im && im.w / im.h > 2;

const modelo = (c, it, i) => {
  const id = slugify(it.nome);
  const pedido = whatsapp(`Olá! Vi no site o modelo "${it.nome}" (${c.titulo}) e gostaria de um orçamento.`);
  const formato = !it.imagem ? "texto" : panoramica(it.imagem) ? "largo" : i % 2 ? "direita" : "esquerda";
  return `
  <article class="modelo modelo--${formato}" id="${id}" data-reveal>
    ${it.imagem ? `
    <figure class="modelo__figura">
      ${imagem(it.imagem, base, { sizes: formato === "largo" ? "100vw" : "(min-width: 900px) 55vw, 100vw" })}
    </figure>` : ""}
    <div class="modelo__info">
      <span class="modelo__num">${pad(i + 1)}</span>
      <h2 class="modelo__nome">${esc(it.nome)}</h2>
      <a class="link-seta" href="${pedido}" target="_blank" rel="noopener">Pedir este modelo ${icone.seta}</a>
    </div>
    ${it.detalhe || it.galeria ? `
    <div class="modelo__extras">
      ${[it.detalhe, ...(it.galeria || [])].filter(Boolean).map((g) => `<figure class="${panoramica(g) ? "is-largo" : ""}">${imagem(g, base, { sizes: "(min-width: 900px) 40vw, 100vw" })}</figure>`).join("")}
    </div>` : ""}
  </article>`;
};

export const colecao = (c) => {
  const i = colecoes.indexOf(c);
  const proxima = colecoes[(i + 1) % colecoes.length];
    const orcamento = whatsapp(`Olá! Vi no site a coleção ${c.titulo} e gostaria de um orçamento.`);

  const corpo = `
<section class="col-hero" aria-labelledby="col-titulo">
  <nav class="trilha" aria-label="Você está em">
    <ol>
      <li><a href="${base}">Início</a></li>
      <li><a href="${base}#colecoes">Coleções</a></li>
      <li aria-current="page">${esc(c.nome)}</li>
    </ol>
  </nav>
  <div class="col-hero__grade">
    <div class="col-hero__texto">
      <p class="rotulo"><span class="regua" aria-hidden="true"></span>Coleção ${pad(i + 1)} / ${pad(colecoes.length)}</p>
      <h1 class="col-hero__titulo" id="col-titulo">${tituloH1(c.titulo)}</h1>
      ${c.tagline ? `<p class="col-hero__tag">${esc(c.tagline)}</p>` : ""}
      ${c.opcoes ? `
      <dl class="ficha">
        <div><dt>Personalize</dt><dd>${opcoesTexto(c.opcoes)}</dd></div>
        <div><dt>Modelos</dt><dd>${c.itens.map((it) => esc(it.nome)).join(" · ")}</dd></div>
      </dl>` : ""}
      ${c.etapas ? `
      <ol class="etapas">
        ${c.etapas.map((e, k) => `<li><span>${pad(k + 1)}</span>${esc(e)}</li>`).join("")}
      </ol>` : ""}
      <div class="acoes">
        <a class="botao botao--laranja" href="${orcamento}" target="_blank" rel="noopener">Solicitar orçamento ${icone.seta}</a>
        <a class="link-seta" href="#modelos">Ver os modelos ${icone.seta}</a>
      </div>
    </div>
    <ol class="indice" aria-label="Modelos desta coleção">
      ${c.itens.map((it, k) => `
      <li>
        <a href="#${slugify(it.nome)}">
          ${it.imagem ? `<span class="indice__img">${imagem(it.imagem, base, { prioridade: k < 3, sizes: "(min-width: 900px) 14vw, 30vw" })}</span>` : `<span class="indice__img indice__img--vazio" aria-hidden="true"></span>`}
          <span class="indice__num">${pad(k + 1)}</span>
          <span class="indice__nome">${esc(it.nome)}</span>
        </a>
      </li>`).join("")}
    </ol>
  </div>
</section>

<section class="secao modelos" id="modelos" aria-label="Modelos da coleção">
  ${c.itens.map((it, k) => modelo(c, it, k)).join("")}
  ${c.complemento ? `<p class="modelos__fecho manuscrito">${esc(c.complemento)}</p>` : ""}
</section>

<section class="faixa-cta" aria-labelledby="cta-titulo">
  <div class="faixa-cta__grade">
    <h2 class="titulo-secao" id="cta-titulo">Gostou de algum <em>modelo?</em></h2>
    <p>Conte o que você imaginou — cor, tamanho, nome — e a gente responde pelo WhatsApp.</p>
    <div class="acoes">
      <a class="botao botao--laranja" href="${orcamento}" target="_blank" rel="noopener">${icone.whatsapp} Falar no WhatsApp</a>
      <a class="link-seta" href="${base}#contato">Outras formas de contato ${icone.seta}</a>
    </div>
  </div>
</section>

<nav class="proxima" aria-label="Próxima coleção">
  <a href="${base}colecoes/${proxima.slug}/">
    <span class="rotulo">Próxima coleção · ${pad(colecoes.indexOf(proxima) + 1)}</span>
    <span class="proxima__nome">${esc(proxima.titulo)} ${icone.seta}</span>
    <figure class="proxima__figura">${imagem(proxima.capaImagem, base, { sizes: "30vw" })}</figure>
  </a>
</nav>`;

  return layout({
    titulo: `${c.titulo} — ${marca.nome} | Impressão 3D personalizada`,
    descricao: `${c.titulo} da ${marca.nome}${c.tagline ? `: ${c.tagline}` : "."} Modelos: ${c.itens.map((it) => it.nome).join(", ")}.${c.opcoes ? ` Personalize: ${c.opcoes.join(", ").toLowerCase()}.` : ""}`,
    caminho: `colecoes/${c.slug}/`,
    base,
    corpo,
    imagemOg: c.capaImagem.src,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: c.titulo,
      ...(c.tagline ? { description: c.tagline } : {}),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: c.itens.map((it, k) => ({ "@type": "ListItem", position: k + 1, name: it.nome })),
      },
    },
  });
};
