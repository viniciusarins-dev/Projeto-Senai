# CRIEXO — site

Site da **CRIEXO — Soluções criativas** (impressão 3D personalizada), feito a partir do *Catálogo 0.6*.

HTML, CSS e JavaScript puros, sem dependências. As páginas são geradas por um script Node a partir de um único arquivo de dados.

## Estrutura

```
src/data/catalogo.mjs     ← todo o conteúdo (coleções, modelos, contatos, textos)
src/templates/            ← layout, header/footer, página inicial e página de coleção
build.mjs                 ← gera index.html e colecoes/<slug>/index.html
assets/css/style.css      ← estilos (tokens de cor e tipografia no topo)
assets/js/main.js         ← menu, entrada suave dos elementos e formulário → WhatsApp
assets/img/               ← fotos dos produtos (recortadas do catálogo)
assets/fonts/             ← Archivo e Instrument Serif (SIL Open Font License)
```

## Uso

```bash
npm run build   # gera as páginas
npm run dev     # gera e serve em http://localhost:8080
```

Os arquivos gerados (`index.html`, `colecoes/`) ficam versionados, então o site pode ser publicado direto (GitHub Pages, Netlify etc.).

## Editando o conteúdo

- **Produtos/coleções:** edite `src/data/catalogo.mjs` e rode `npm run build`. Campos ausentes simplesmente não aparecem no site — não preencha nada que não seja real.
- **Fotos:** substitua o arquivo em `assets/img/` mantendo o nome e atualize largura/altura em `catalogo.mjs`. As imagens atuais foram recortadas de capturas de tela do catálogo; trocar pelas fotos originais em alta resolução melhora muito a nitidez.
- **Domínio:** preencha `marca.siteUrl` em `catalogo.mjs` para gerar canonical, `og:url`, `sitemap.xml` e `robots.txt`.
