# Vino! Wine Bar — cópia estática

Cópia visual da home de [winebarvino.com.br](https://www.winebarvino.com.br/) (originalmente feita em Wix), escrita em HTML, CSS e JS puros: sem framework e sem build. É uma demo para apresentação ao cliente, com o widget de chat Cora integrado.

## Arquivos

| Arquivo      | Conteúdo |
|--------------|----------|
| `index.html` | Estrutura da página (header, hero, conceito, cards, franquias, casas, unidades, galeria, rodapé) |
| `style.css`  | Estilos mobile first (breakpoints em 480px e 768px), todos escopados em classes `.vn-*` |
| `main.js`    | Menu mobile, rolagem suave, parallax dos fundos, galeria horizontal e renderização das listas |
| `widget.js`  | Script do widget de chat Cora / CHANNEL (colado sem alterações) |

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
- A fonte é a mesma do original, **Flama Semicondensed** (Extrabold, Book e Light), carregada dos arquivos que o próprio site Wix usa em `static.wixstatic.com/ufonts/`. Se esses arquivos ficarem indisponíveis, a página cai para **Barlow / Barlow Semi Condensed** (Google Fonts), que têm métrica parecida.
- No desktop, como no original, o cabeçalho rola junto com a página, o botão "voltar ao topo" fica fixo na tela e as fotos de fundo têm parallax a 20% da velocidade da rolagem.
- O bloco vazio com o formulário POWR não configurado ("Create a Form"), que aparece no original logo acima do rodapé, foi omitido de propósito.
- Nenhum elemento da página usa `z-index` acima de 300, então o widget (9998/9999) sempre fica por cima.
