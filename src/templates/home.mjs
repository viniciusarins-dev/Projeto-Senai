import { marca, colecoes, servicos, processo, sobMedida, imagens } from "../data/catalogo.mjs";
import { esc, pad, whatsapp, instagram, icone, imagem, opcoesTexto, layout } from "./partes.mjs";

const base = "";

const principais = colecoes.filter((c) => !c.sazonal);
const datas = colecoes.filter((c) => c.sazonal);

// Cada coleção tem um "formato" na grade editorial (ver .colecao--* no CSS).
const formatos = ["a", "b", "c", "d", "e", "f"];

const cartaoColecao = (c, i, formato) => `
  <a class="colecao colecao--${formato}" href="colecoes/${c.slug}/" data-reveal>
    <figure class="colecao__figura">
      ${imagem(c.capaImagem, base, { sizes: "(min-width: 900px) 50vw, 100vw" })}
    </figure>
    <div class="colecao__info">
      <span class="colecao__num">${pad(colecoes.indexOf(c) + 1)}</span>
      <h3 class="colecao__nome">${esc(c.nome)}</h3>
      ${c.tagline ? `<p class="colecao__tag">${esc(c.tagline)}</p>` : ""}
      <p class="colecao__itens">${c.itens.map((it) => esc(it.nome)).join(" · ")}</p>
      <span class="colecao__ver">Ver coleção ${icone.seta}</span>
    </div>
  </a>`;

const hero = `
<section class="hero" aria-labelledby="hero-titulo">
  <div class="hero__grade">
    <div class="hero__texto">
      <p class="rotulo hero__rotulo"><span class="regua" aria-hidden="true"></span>Impressão 3D personalizada</p>
      <h1 class="hero__titulo" id="hero-titulo">
        <span class="hero__linha">Sua ideia,</span>
        <span class="hero__linha"><em>nosso</em> projeto.</span>
      </h1>
      <p class="hero__lede">Decoração, presentes, organização e peças técnicas feitas sob encomenda — na cor, no tamanho e com o nome que você escolher.</p>
      <div class="hero__acoes">
        <a class="botao botao--laranja" href="#contato">Solicitar projeto ${icone.seta}</a>
        <a class="link-seta" href="#colecoes">Ver as coleções ${icone.seta}</a>
      </div>
    </div>
    <figure class="hero__figura">
      ${imagem(imagens.impressora, base, { prioridade: true, sizes: "(min-width: 900px) 55vw, 100vw" })}
      <figcaption class="hero__legenda">
        <span>${processo.map((p) => esc(p.nome)).join(" <i>→</i> ")}</span>
      </figcaption>
    </figure>
  </div>
</section>`;

const secaoColecoes = `
<section class="secao colecoes" id="colecoes" aria-labelledby="colecoes-titulo">
  <header class="cabeca">
    <p class="rotulo"><span class="regua" aria-hidden="true"></span>Produtos</p>
    <h2 class="titulo-secao" id="colecoes-titulo">Coleções</h2>
    <p class="cabeca__texto">Do vaso ao quadro, da miniatura ao organizador de mesa. Escolha um ponto de partida — cor, tamanho e nome a gente ajusta com você.</p>
  </header>
  <div class="grade-colecoes">
    ${principais.map((c, i) => cartaoColecao(c, i, formatos[i])).join("")}
  </div>
  <div class="datas">
    <h3 class="datas__titulo">Datas especiais</h3>
    <div class="grade-datas">
      ${datas.map((c, i) => cartaoColecao(c, i, "data")).join("")}
    </div>
  </div>
</section>`;

const sala = colecoes.find((c) => c.slug === "sala");
const modular = sala.itens[0];

const destaque = `
<section class="destaque" aria-labelledby="destaque-titulo">
  <div class="destaque__grade">
    <figure class="destaque__principal" data-reveal>
      ${imagem(modular.imagem, base, { sizes: "(min-width: 900px) 50vw, 100vw" })}
    </figure>
    <div class="destaque__texto" data-reveal>
      <p class="rotulo"><span class="regua" aria-hidden="true"></span>Em destaque · ${esc(sala.titulo)}</p>
      <h2 class="titulo-secao" id="destaque-titulo">${esc(modular.nome)}</h2>
      <p class="destaque__frase">${esc(sala.tagline)}</p>
      <dl class="ficha">
        <div><dt>Coleção</dt><dd>${esc(sala.titulo)}</dd></div>
        <div><dt>Personalize</dt><dd>${opcoesTexto(sala.opcoes)}</dd></div>
      </dl>
      <figure class="destaque__detalhe">
        ${imagem(modular.detalhe, base, { sizes: "(min-width: 900px) 25vw, 60vw" })}
        <figcaption>Detalhe — módulo com rosa dos ventos</figcaption>
      </figure>
      <div class="acoes">
        <a class="botao botao--laranja" href="${whatsapp(`Olá! Vi no site os ${modular.nome} (${sala.titulo}) e gostaria de um orçamento.`)}" target="_blank" rel="noopener">Pedir orçamento ${icone.seta}</a>
        <a class="link-seta" href="colecoes/${sala.slug}/">Ver ${esc(sala.titulo.toLowerCase())} ${icone.seta}</a>
      </div>
    </div>
  </div>
</section>`;

const fotos = colecoes.find((c) => c.slug === "fotos");

const secaoFotos = `
<section class="secao fotos" aria-labelledby="fotos-titulo">
  <div class="fotos__grade">
    <div class="fotos__texto" data-reveal>
      <p class="rotulo"><span class="regua" aria-hidden="true"></span>${esc(fotos.titulo)}</p>
      <h2 class="titulo-secao" id="fotos-titulo">Suas histórias também merecem <em>ser eternizadas.</em></h2>
      <p>${esc(fotos.tagline)}</p>
      <ol class="etapas">
        ${fotos.etapas.map((e, i) => `<li><span>${pad(i + 1)}</span>${esc(e)}</li>`).join("")}
      </ol>
      <div class="acoes">
        <a class="botao" href="${whatsapp("Olá! Tenho uma foto especial e gostaria de transformá-la em um projeto personalizado.")}" target="_blank" rel="noopener">Tem uma foto especial? ${icone.seta}</a>
        <a class="link-seta" href="colecoes/${fotos.slug}/">Ver a coleção ${icone.seta}</a>
      </div>
    </div>
    <div class="fotos__imagens">
      ${[0, 1, 3].map((k, i) => {
        const it = fotos.itens[k];
        return `<figure class="fotos__img fotos__img--${i + 1}" data-reveal>${imagem(it.imagem, base, { sizes: "(min-width: 900px) 22vw, 45vw" })}<figcaption>${esc(it.nome)}</figcaption></figure>`;
      }).join("")}
    </div>
  </div>
</section>`;

const secaoSobMedida = `
<section class="sob-medida" id="sob-medida" aria-labelledby="sob-medida-titulo">
  <div class="sob-medida__topo">
    <header class="cabeca cabeca--claro">
      <p class="rotulo"><span class="regua" aria-hidden="true"></span>Projetos sob medida</p>
      <h2 class="titulo-secao" id="sob-medida-titulo">Da necessidade <em>à peça.</em></h2>
      <p class="cabeca__texto">${esc(marca.proposta)}</p>
    </header>
    <ul class="servicos">
      ${servicos.map((s) => `<li>${esc(s.nome)}</li>`).join("")}
    </ul>
  </div>
  <figure class="sob-medida__cad" data-reveal>
    ${imagem(imagens.cad, base, { sizes: "(min-width: 1200px) 1100px, 100vw" })}
  </figure>
  <ol class="processo">
    ${processo.map((p, i) => `
      <li class="processo__passo" data-reveal>
        <span class="processo__num">${pad(i + 1)}</span>
        <h3>${esc(p.nome)}</h3>
        <p>${esc(p.texto)}</p>
      </li>`).join("")}
  </ol>
  <div class="exemplos">
    <p class="rotulo">Exemplos de projetos</p>
    <ul class="exemplos__lista">
      ${sobMedida.exemplos.map((e) => `<li data-reveal><figure>${imagem(e.imagem, base, { sizes: "(min-width: 900px) 20vw, 45vw" })}<figcaption>${esc(e.nome)}</figcaption></figure></li>`).join("")}
    </ul>
  </div>
  <div class="sob-medida__cta">
    <a class="botao botao--laranja" href="${whatsapp("Olá! Gostaria de solicitar um projeto personalizado (sob medida).")}" target="_blank" rel="noopener">Solicitar projeto personalizado ${icone.seta}</a>
    <p class="manuscrito">${esc(sobMedida.complemento)}</p>
  </div>
</section>`;

const secaoSobre = `
<section class="secao sobre" id="sobre" aria-labelledby="sobre-titulo">
  <div class="sobre__grade">
    <p class="rotulo"><span class="regua" aria-hidden="true"></span>Sobre</p>
    <h2 class="sobre__titulo" id="sobre-titulo">${marca.nome}<span>${esc(marca.assinatura)}</span></h2>
    <div class="sobre__texto" data-reveal>
      <p class="sobre__abre">Um vaso em forma de emoji. A camisa do seu time num quadro. Seu pet em miniatura. Uma tecla com patinha de gato. Um suporte desenhado para resolver exatamente o seu problema.</p>
      <p>Parece muita coisa diferente — e é. O que une tudo é o jeito de fazer: você conta o que precisa, a gente desenvolve o modelo em 3D e imprime. Cor, tamanho e nome entram na conversa desde o começo, porque a peça é sua.</p>
    </div>
  </div>
</section>`;

const secaoContato = `
<section class="secao contato" id="contato" aria-labelledby="contato-titulo">
  <div class="contato__grade">
    <div class="contato__intro">
      <p class="rotulo"><span class="regua" aria-hidden="true"></span>Contato</p>
      <h2 class="titulo-secao" id="contato-titulo">Fale com <em>a gente.</em></h2>
      <p>Para comprar, pedir orçamento, tirar dúvidas ou começar um projeto personalizado.</p>
      <ul class="canais">
        <li><a href="${whatsapp("Olá! Vim pelo site da CRIEXO.")}" target="_blank" rel="noopener"><span class="rotulo">WhatsApp</span><strong>${marca.whatsappExibicao}</strong></a></li>
        <li><a href="${instagram}" target="_blank" rel="noopener"><span class="rotulo">Instagram</span><strong>@${marca.instagram}</strong></a></li>
      </ul>
    </div>
    <form class="formulario" id="formulario" novalidate data-whatsapp="${marca.whatsapp}">
      <p class="formulario__titulo">Monte sua mensagem — ela abre pronta no WhatsApp.</p>
      <div class="campo">
        <label for="f-nome">Nome</label>
        <input id="f-nome" name="nome" type="text" autocomplete="name" required>
        <p class="campo__erro" id="f-nome-erro" aria-live="polite"></p>
      </div>
      <div class="campo">
        <label for="f-telefone">Telefone</label>
        <input id="f-telefone" name="telefone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="(00) 00000-0000" required>
        <p class="campo__erro" id="f-telefone-erro" aria-live="polite"></p>
      </div>
      <fieldset class="campo campo--assunto">
        <legend>Assunto</legend>
        <div class="opcoes">
          ${["Comprar", "Orçamento", "Dúvida", "Projeto personalizado"].map((a, i) => `
          <label class="opcao"><input type="radio" name="assunto" value="${a}"${i === 1 ? " checked" : ""}><span>${a}</span></label>`).join("")}
        </div>
      </fieldset>
      <div class="campo">
        <label for="f-mensagem">O que você precisa?</label>
        <textarea id="f-mensagem" name="mensagem" rows="4" required placeholder="Ex.: um vaso emoji amarelo com o nome Ana"></textarea>
        <p class="campo__erro" id="f-mensagem-erro" aria-live="polite"></p>
      </div>
      <button class="botao botao--escuro" type="submit">${icone.whatsapp} Enviar pelo WhatsApp</button>
    </form>
  </div>
</section>`;

export const home = () =>
  layout({
    titulo: `${marca.nome} — Impressão 3D personalizada | Sua ideia, nosso projeto`,
    descricao:
      "CRIEXO Soluções Criativas: impressão 3D personalizada. Quadros, vasos, decoração, escritório, infantil, datas especiais, personalização com suas fotos e projetos sob medida.",
    caminho: "",
    base,
    escuro: true,
    corpo: hero + secaoColecoes + destaque + secaoFotos + secaoSobMedida + secaoSobre + secaoContato,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: `${marca.nome} — ${marca.assinatura}`,
      slogan: marca.slogan,
      telephone: `+${marca.whatsapp}`,
      sameAs: [instagram],
      ...(marca.siteUrl ? { url: marca.siteUrl } : {}),
    },
  });
