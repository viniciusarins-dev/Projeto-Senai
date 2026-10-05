// Conteúdo do site — extraído do "Catálogo 0.6" da CRIEXO.
// Regra: nada aqui pode ser inventado. Se uma informação não estiver no
// catálogo, deixe o campo de fora (o template simplesmente não exibe).

export const marca = {
  nome: "CRIEXO",
  assinatura: "Soluções criativas",
  slogan: "Sua ideia, nosso projeto!",
  proposta: "Transformamos suas necessidades em modelos 3D precisos e funcionais.",
  whatsapp: "5547997646327",
  whatsappExibicao: "(47) 99764-6327",
  instagram: "criexo",
  // URL pública do site (ex.: "https://criexo.com.br"). Quando preenchida,
  // o build gera canonical, og:url e sitemap.xml.
  siteUrl: "",
};

// Imagens recortadas das páginas do catálogo. w/h = tamanho real do arquivo.
const img = (arquivo, w, h, alt) => ({ src: `assets/img/${arquivo}.webp`, w, h, alt });

export const servicos = [
  { nome: "Desenvolvimento de projetos" },
  { nome: "Modelagem 3D personalizada" },
  { nome: "Qualidade e precisão" },
];

export const processo = [
  { nome: "Ideia", texto: "Você nos conta o que precisa." },
  { nome: "Projeto 3D", texto: "Desenvolvemos o modelo com total precisão." },
  { nome: "Impressão", texto: "Seu projeto ganha vida em 3D." },
  { nome: "Resultado", texto: "Peças personalizadas, com qualidade e funcionalidade." },
];

export const imagens = {
  impressora: img("capa-impressora", 1400, 1090, "Impressora 3D imprimindo um vaso laranja em espiral, cercada por peças impressas: esfera vazada, gato facetado, foguete e engrenagens"),
  cad: img("sob-medida-cad", 1400, 1010, "Notebook exibindo a modelagem 3D de um conjunto de engrenagens planetárias"),
  logo: img("logo", 281, 274, "CRIEXO — Soluções criativas"),
};

// Opções de personalização indicadas no topo de cada página do catálogo.
const COR = "Cor", TAMANHO = "Tamanho", NOMES = "Nomes";

export const colecoes = [
  {
    slug: "fotos",
    nome: "Com suas fotos",
    titulo: "Personalização com suas fotos",
    tagline: "Transforme suas melhores lembranças em miniaturas e muito mais!",
    complemento: "Suas histórias também merecem ser eternizadas!",
    etapas: ["Envie sua foto", "Personalizamos", "Transformamos em algo especial"],
    capa: "fotos-pets",
    itens: [
      { nome: "Pets", imagem: img("fotos-pets", 614, 512, "Miniatura de um gato rajado feita a partir de uma foto, ao lado do porta-retrato com a foto original") },
      { nome: "Pessoas", imagem: img("fotos-pessoas", 614, 542, "Miniatura de um jogador com camisa preta número 25 segurando um capacete") },
      { nome: "Momentos", imagem: img("fotos-momentos", 614, 534, "Chaveiro com foto de um pôr do sol no mar") },
      { nome: "Canecas", imagem: img("fotos-canecas", 622, 512, "Caneca preta estampada com a foto de um golden retriever") },
      { nome: "Quebra-cabeças", imagem: img("fotos-quebra-cabecas", 614, 512, "Quebra-cabeça montado com a foto de uma família olhando o pôr do sol na praia") },
      { nome: "Capinhas", imagem: img("fotos-capinhas", 614, 504, "Capinha de celular com a foto de um casal em uma trilha nas montanhas") },
    ],
  },
  {
    slug: "quadros",
    nome: "Quadros",
    titulo: "Quadros personalizáveis",
    tagline: "Arte que combina com a sua história!",
    opcoes: [COR, TAMANHO, NOMES],
    capa: "quadros-marcos",
    itens: [
      { nome: "Camisas de times", imagem: img("quadros-camisas", 660, 656, "Quadro em relevo de uma camisa amarela com o nome Ronaldo e o número 9 em verde") },
      { nome: "Séries, filmes e livros", imagem: img("quadros-series", 634, 644, "Quadro preto com o brasão vermelho do dragão Targaryen, de Game of Thrones") },
      { nome: "Música", imagem: img("quadros-musica", 654, 656, "Quadro azul texturizado com o símbolo de divisão e a palavra Divide") },
      { nome: "Objetos", imagem: img("quadros-objetos", 664, 668, "Quadro branco com uma tulipa vermelha em relevo") },
      { nome: "Marcos pessoais", imagem: img("quadros-marcos", 642, 668, "Quadro com um par de tênis rosa em relevo e os textos 5KM e 26:30") },
      { nome: "Carros", imagem: img("quadros-carros", 654, 668, "Quadro com um Chevrolet Opala SS vermelho em relevo") },
    ],
  },
  {
    slug: "vasos",
    nome: "Vasos",
    titulo: "Vasos personalizáveis",
    tagline: "Deixe seu espaço mais verde!",
    opcoes: [COR, TAMANHO, NOMES],
    capa: "vasos-emoji",
    itens: [
      { nome: "Vasos texturizados", imagem: img("vasos-texturizados", 684, 626, "Três vasos brancos facetados, de tamanhos diferentes, com suculentas") },
      { nome: "Vasos emoji", imagem: img("vasos-emoji", 650, 626, "Vaso amarelo em formato de emoji sorridente com uma planta") },
      { nome: "Vasos de frutas", imagem: img("vasos-frutas", 670, 626, "Vaso vermelho em formato de morango com margaridas") },
      { nome: "Vasos de animais", imagem: img("vasos-animais", 678, 612, "Vaso branco em formato de gato dormindo com uma planta pendente") },
      { nome: "Vasos de bolas", imagem: img("vasos-bolas", 650, 612, "Vaso em formato de bola de basquete com uma planta") },
      { nome: "Vasos diversos", imagem: img("vasos-diversos", 670, 612, "Vaso preto em formato de caldeirão com suculentas") },
    ],
  },
  {
    slug: "sala",
    nome: "Sala",
    titulo: "Decorações para sala",
    tagline: "Mais personalidade para o seu espaço!",
    opcoes: [COR, TAMANHO, NOMES],
    capa: "sala-mapa",
    itens: [
      {
        nome: "Quadros modulares de parede",
        imagem: img("sala-mapa", 954, 1016, "Painel de módulos hexagonais com o mapa-múndi recortado em preto e luz quente por trás"),
        detalhe: img("sala-mapa-bussola", 820, 540, "Detalhe do módulo hexagonal com a rosa dos ventos"),
      },
      { nome: "Iluminação", imagem: img("sala-iluminacao", 642, 566, "Quadro iluminado com o escudo dos Raiders") },
      { nome: "Decorações interativas", imagem: img("sala-interativas", 668, 554, "Silhueta de gato preto pendurada ao lado de uma tomada na parede") },
      { nome: "Esculturas", imagem: img("sala-esculturas", 642, 554, "Escultura branca do Cristo Redentor sobre uma estante") },
    ],
  },
  {
    slug: "escritorio",
    nome: "Escritório",
    titulo: "Escritório personalizável",
    tagline: "Mais organização e estilo para o seu dia a dia!",
    complemento: "Funcionalidade e personalidade no seu espaço!",
    opcoes: [COR, TAMANHO, NOMES],
    capa: "escritorio-teclas",
    itens: [
      { nome: "Teclas para teclado", imagem: img("escritorio-teclas", 642, 420, "Teclas de teclado em formato de patinha de gato e de gatinho") },
      { nome: "Organizadores de cabos", imagem: img("escritorio-cabos", 624, 420, "Organizador branco segurando cinco cabos USB") },
      { nome: "Ponta de lápis", imagem: img("escritorio-ponta-lapis", 644, 420, "Ponteiras de lápis coloridas: cachorro, patinha, coração e bandeira do Brasil") },
      { nome: "Porta lápis", imagem: img("escritorio-porta-lapis", 642, 274, "Porta-lápis vermelho em formato de coração") },
      { nome: "Porta celulares", imagem: img("escritorio-porta-celulares", 626, 274, "Suporte preto para celular") },
    ],
  },
  {
    slug: "infantil",
    nome: "Infantil",
    titulo: "Infantil personalizável",
    tagline: "Transforme suas ideias em realidade!",
    opcoes: [COR, TAMANHO, NOMES],
    capa: "infantil-quarto",
    itens: [
      {
        nome: "Brinquedos",
        imagem: img("infantil-dinos", 798, 448, "Dinossauros facetados coloridos: tiranossauro, tricerátopo, estegossauro e pterossauro"),
        galeria: [
          img("infantil-mar", 752, 464, "Animais marinhos facetados: tubarão, baleia, golfinho e tartaruga"),
          img("infantil-animais", 1400, 220, "Fila de animais facetados: gorila, hipopótamo, gato, coelho, lobo, leão, elefante, girafa e zebra"),
        ],
      },
      { nome: "Quebra-cabeças pixelados", imagem: img("infantil-pixelados", 502, 484, "Quebra-cabeça pixelado com o escudo do Capitão América") },
      { nome: "Porta trecos", imagem: img("infantil-porta-trecos", 448, 536, "Porta-trecos em formato de lápis gigante com a inscrição Seu nome") },
      { nome: "Decorações para quarto", imagem: img("infantil-quarto", 626, 430, "Placa com arco-íris em tons pastel e a palavra nome") },
    ],
  },
  {
    slug: "halloween",
    nome: "Halloween",
    titulo: "Halloween personalizável",
    opcoes: [COR, TAMANHO],
    capa: "halloween-vasos",
    sazonal: true,
    itens: [
      { nome: "Miniaturas", imagem: img("halloween-miniaturas", 1400, 402, "Sete miniaturas de Halloween: ceifador, gato preto, vampiro, bruxa, Frankenstein, múmia e fantasma") },
      { nome: "Vasos / Potes", imagem: img("halloween-vasos", 1400, 740, "Pote em formato de caveira e vaso laranja em formato de abóbora") },
      { nome: "Lanternas", imagem: img("halloween-lanternas", 1290, 442, "Lanternas de abóbora iluminadas por dentro") },
    ],
  },
  {
    slug: "natal",
    nome: "Natal",
    titulo: "Natal personalizável",
    opcoes: [COR, TAMANHO, NOMES],
    capa: "natal-miniaturas",
    sazonal: true,
    itens: [
      { nome: "Miniaturas", imagem: img("natal-miniaturas", 1400, 469, "Miniaturas de Natal: Papai Noel, rena, duende, boneco de neve, pinguins e urso polar") },
      { nome: "Enfeites", imagem: img("natal-enfeites", 1154, 628, "Estrela iluminada com o texto Família X e cubos com letras pendurados na árvore") },
      { nome: "Decorações", imagem: img("natal-decoracoes", 1078, 866, "Globo de neve com a foto de três pessoas dentro") },
    ],
  },
  {
    slug: "dia-dos-namorados",
    nome: "Dia dos Namorados",
    titulo: "Dia dos Namorados personalizável",
    opcoes: [COR, TAMANHO, NOMES],
    capa: "namorados-quadros",
    sazonal: true,
    itens: [
      { nome: "Chaveiros" },
      { nome: "Quadros", imagem: img("namorados-quadros", 1316, 390, "Quadros com coração vermelho e as palavras Love, amor e Juntos é melhor") },
    ],
  },
];

export const sobMedida = {
  slug: "sob-medida",
  titulo: "Projetos sob medida",
  tagline: "Sua ideia, nosso projeto!",
  complemento: "Conte com a gente!",
  exemplos: [
    { nome: "Peças mecânicas", imagem: img("sob-medida-pecas", 372, 224, "Conjunto de engrenagens cinza impressas em 3D") },
    { nome: "Suportes e fixações", imagem: img("sob-medida-suportes", 368, 224, "Suporte em L preto com furos de fixação") },
    { nome: "Gabinetes e carcaças", imagem: img("sob-medida-gabinetes", 358, 224, "Gabinete preto com grade de ventilação e ventoinha") },
    { nome: "Componentes especiais", imagem: img("sob-medida-componentes", 352, 224, "Componente mecânico de várias partes encaixadas") },
  ],
};

// Resolve a imagem de capa de cada coleção a partir dos itens.
for (const c of colecoes) {
  const todas = c.itens.flatMap((i) => [i.imagem, i.detalhe, ...(i.galeria || [])]).filter(Boolean);
  c.capaImagem = todas.find((i) => i.src.includes(`/${c.capa}.`)) || todas[0];
}
