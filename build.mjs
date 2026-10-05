// Gera o site estático (HTML puro) a partir de src/.
// Uso: node build.mjs
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { marca, colecoes } from "./src/data/catalogo.mjs";
import { home } from "./src/templates/home.mjs";
import { colecao } from "./src/templates/colecao.mjs";

const escrever = (caminho, conteudo) => {
  mkdirSync(caminho.split("/").slice(0, -1).join("/") || ".", { recursive: true });
  writeFileSync(caminho, conteudo);
  console.log("  ✓", caminho);
};

rmSync("colecoes", { recursive: true, force: true });
escrever("index.html", home());
for (const c of colecoes) escrever(`colecoes/${c.slug}/index.html`, colecao(c));

if (marca.siteUrl) {
  const url = marca.siteUrl.replace(/\/$/, "");
  const paginas = ["", ...colecoes.map((c) => `colecoes/${c.slug}/`)];
  escrever("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas.map((p) => `  <url><loc>${url}/${p}</loc></url>`).join("\n")}
</urlset>
`);
  escrever("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${url}/sitemap.xml\n`);
}
