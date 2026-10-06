// CRIEXO — interações do site. Sem dependências.

// Header: muda de fundo ao rolar.
const topo = document.querySelector("[data-topo]");

if (topo) {
  const aoRolar = () => topo.classList.toggle("is-rolado", window.scrollY > 24);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });
}

// Barra lateral (menu + busca de produtos).
const gaveta = document.getElementById("gaveta");

if (gaveta && typeof gaveta.showModal === "function") {
  const campoBusca = gaveta.querySelector("#busca-campo");

  const abrir = (focarBusca) => {
    if (gaveta.open) return;
    gaveta.showModal();
    document.body.classList.add("sem-rolagem");
    if (focarBusca) campoBusca.focus();
  };
  const fechar = () => gaveta.open && gaveta.close();

  document.querySelectorAll("[data-gaveta-abrir]").forEach((b) =>
    b.addEventListener("click", () => abrir(b.dataset.gavetaAbrir === "busca"))
  );
  gaveta.querySelector("[data-gaveta-fechar]").addEventListener("click", fechar);
  gaveta.addEventListener("close", () => document.body.classList.remove("sem-rolagem"));
  // Clique fora do painel (no fundo escurecido) fecha.
  gaveta.addEventListener("click", (e) => {
    if (e.target === gaveta) fechar();
  });
  // O campo de busca consome o primeiro Esc para se limpar; garantimos o fechamento.
  gaveta.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      fechar();
    }
  });
  gaveta.querySelectorAll("[data-gaveta-link]").forEach((a) => a.addEventListener("click", fechar));
} else if (gaveta) {
  // Navegador sem <dialog>: os botões levam direto às coleções.
  document.querySelectorAll("[data-gaveta-abrir]").forEach((b) =>
    b.addEventListener("click", () => (location.hash = "colecoes"))
  );
}

// Busca e filtro por coleção.
const busca = document.querySelector("[data-busca]");

if (busca) {
  const campo = busca.querySelector("#busca-campo");
  const filtros = [...busca.querySelectorAll("[data-filtro]")];
  const itens = [...busca.querySelectorAll("li[data-texto]")];
  const contagem = busca.querySelector("[data-busca-contagem]");
  const vazio = busca.querySelector("[data-busca-vazio]");
  const normalizar = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  let colecao = "";

  const aplicar = () => {
    const termos = normalizar(campo.value).split(/\s+/).filter(Boolean);
    let visiveis = 0;
    itens.forEach((li) => {
      const ok =
        (!colecao || li.dataset.colecao === colecao) &&
        termos.every((t) => li.dataset.texto.includes(t));
      li.hidden = !ok;
      if (ok) visiveis++;
    });
    contagem.textContent = visiveis === 1 ? "1 produto" : `${visiveis} produtos`;
    vazio.hidden = visiveis > 0;
  };

  campo.addEventListener("input", aplicar);
  filtros.forEach((f) =>
    f.addEventListener("click", () => {
      colecao = f.dataset.filtro;
      filtros.forEach((x) => x.setAttribute("aria-pressed", String(x === f)));
      aplicar();
    })
  );
}

// Entrada suave dos elementos marcados com data-reveal.
const revelar = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visivel");
          observador.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  revelar.forEach((el) => observador.observe(el));
} else {
  revelar.forEach((el) => el.classList.add("is-visivel"));
}

// Formulário de contato: valida e abre o WhatsApp com a mensagem pronta.
const form = document.getElementById("formulario");

if (form) {
  const numero = form.dataset.whatsapp;
  const campos = {
    nome: form.elements.nome,
    telefone: form.elements.telefone,
    mensagem: form.elements.mensagem,
  };

  const mascaraTelefone = (valor) => {
    const d = valor.replace(/\D/g, "").slice(0, 11);
    if (!d) return "";
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const regras = {
    nome: (v) => (v.trim() ? "" : "Informe seu nome."),
    telefone: (v) => {
      const n = v.replace(/\D/g, "").length;
      return n === 10 || n === 11 ? "" : "Informe um telefone com DDD.";
    },
    mensagem: (v) => (v.trim() ? "" : "Conte um pouco do que você precisa."),
  };

  const validar = (nome) => {
    const campo = campos[nome];
    const erro = regras[nome](campo.value);
    const saida = document.getElementById(`${campo.id}-erro`);
    campo.setAttribute("aria-invalid", erro ? "true" : "false");
    if (erro) campo.setAttribute("aria-describedby", saida.id);
    else campo.removeAttribute("aria-describedby");
    saida.textContent = erro;
    return !erro;
  };

  campos.telefone.addEventListener("input", (e) => {
    e.target.value = mascaraTelefone(e.target.value);
  });

  Object.keys(campos).forEach((nome) => {
    campos[nome].addEventListener("input", () => {
      if (campos[nome].getAttribute("aria-invalid") === "true") validar(nome);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const resultados = Object.keys(campos).map(validar);
    if (resultados.includes(false)) {
      Object.values(campos)[resultados.indexOf(false)].focus();
      return;
    }
    const assunto = form.elements.assunto.value;
    const texto =
      `Olá! Meu nome é ${campos.nome.value.trim()}.\n` +
      `Assunto: ${assunto}\n` +
      `Telefone: ${campos.telefone.value.trim()}\n\n` +
      campos.mensagem.value.trim();
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    const janela = window.open(url, "_blank");
    if (janela) {
      janela.opener = null;
      return;
    }
    // Navegador bloqueou a nova aba: oferece o link direto.
    let link = form.querySelector(".formulario__link");
    if (!link) {
      link = document.createElement("a");
      link.className = "link-seta formulario__link";
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Abrir a mensagem no WhatsApp →";
      form.append(link);
    }
    link.href = url;
    link.focus();
  });
}
