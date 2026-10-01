# Vino! Wine Bar — cópia estática

Cópia visual da home de [winebarvino.com.br](https://www.winebarvino.com.br/) (originalmente feita em Wix), escrita em HTML, CSS e JS puros: sem framework e sem build. É uma demo para apresentação ao cliente, com o widget de chat Cora integrado.

## Arquivos

| Arquivo      | Conteúdo |
|--------------|----------|
| `index.html` | Estrutura da página (header, hero, conceito, cards, franquias, casas, unidades, galeria, rodapé) |
| `style.css`  | Estilos mobile first (breakpoints em 480px e 768px), todos escopados em classes `.vn-*` |
| `main.js`    | Menu mobile, rolagem suave, parallax dos fundos, galeria horizontal e renderização das listas |
| `widget.js`  | Script do widget de chat (colado sem alterações) |

## Como rodar

O widget carrega ícones de `cdn.jsdelivr.net` e chama `api.corachat.com.br`, então a página precisa ser servida via HTTP (não abra com `file://`).

```bash
python3 -m http.server 4317
# ou
npx serve -l 4317 .
```

Depois abra <http://localhost:4317>.

## Observações

- As imagens são carregadas direto de `static.wixstatic.com` (hotlink), com `loading="lazy"` abaixo da dobra.
- A fonte original é **Flama Semicondensed** (comercial, não está no Google Fonts). Por isso a demo usa **Barlow Semi Condensed**, a alternativa mais próxima no Google Fonts, nos pesos 800 (Extrabold), 400 (Book) e 300 (Light).
- Nenhum elemento da página usa `z-index` acima de 300, então o widget (9998/9999) sempre fica por cima.
