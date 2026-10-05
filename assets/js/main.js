// CRIEXO — interações do site. Sem dependências.

// Header: muda de fundo ao rolar e controla o menu no celular.
const topo = document.querySelector("[data-topo]");
const botaoMenu = document.querySelector("[data-menu]");

if (topo) {
  const aoRolar = () => topo.classList.toggle("is-rolado", window.scrollY > 24);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });
}

if (topo && botaoMenu) {
  const definirMenu = (aberto) => {
    topo.classList.toggle("is-aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    document.body.classList.toggle("sem-rolagem", aberto);
  };
  botaoMenu.addEventListener("click", () => definirMenu(!topo.classList.contains("is-aberto")));
  topo.querySelectorAll(".topo__nav a").forEach((a) => a.addEventListener("click", () => definirMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && topo.classList.contains("is-aberto")) {
      definirMenu(false);
      botaoMenu.focus();
    }
  });
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
