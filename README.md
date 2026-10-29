# Henrique | Portfólio

Landing page de portfólio pessoal de **Henrique**, desenvolvedor full-stack. Feita só com HTML, CSS e JavaScript puros, sem frameworks e sem bibliotecas, com foco em desempenho e em animações de scroll.

🔗 **Demo:** https://henrique498-dev.vercel.app/

## Sobre o projeto

O layout foi desenhado no Figma e implementado do zero. A página apresenta quem eu sou, as tecnologias que uso, os meus projetos reais do GitHub e formas de contato.

### Seções

- **Hero:** apresentação e chamadas para os projetos e para o contato.
- **Sobre:** resumo técnico, tech stack e a forma como eu trabalho (ouvir, construir, medir e repetir).
- **Projetos:** cards com os repositórios do [GitHub](https://github.com/Henrique498), com links para o código e para as demos publicadas.
- **Contato:** e-mail com botão de copiar, links para GitHub e LinkedIn e formulário de mensagem.

## Destaques técnicos

- **Zero dependências:** nenhum framework, biblioteca ou bundler. A única requisição externa é a fonte do Google Fonts.
- **Animações de scroll em JavaScript puro:**
  - elementos que aparecem ao entrar na tela e repetem ao voltar o scroll, com `IntersectionObserver`;
  - parágrafo cujas palavras acendem conforme a rolagem;
  - seção de projetos com trilha horizontal fixa (`position: sticky`), controlada pela rolagem vertical;
  - parallax nos números de fundo e no hero;
  - rolagem suave com inércia no mouse e no trackpad;
  - barra de progresso no topo e destaque do link da seção atual no menu.
- **Ticker de tecnologias** com animação contínua em CSS.
- **Visual dark mode** com efeito de vidro (`backdrop-filter`) no cabeçalho e variáveis CSS para toda a paleta.
- **Responsivo:** no mobile, o layout vira uma coluna e a trilha horizontal é desativada.
- **Acessibilidade:** respeita `prefers-reduced-motion`, usa HTML semântico e marca elementos decorativos com `aria-hidden`.

## Tecnologias

| Camada | Uso |
| --- | --- |
| HTML5 | Estrutura semântica |
| CSS3 | Variáveis, grid, flexbox, animações e `position: sticky` |
| JavaScript | Interações e animações de scroll, sem bibliotecas |
| Figma | Design das telas |

## Estrutura de pastas

```
.
├── index.html
├── style.css
├── script.js
└── assets/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    └── site.webmanifest
```

## Como rodar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/Henrique498/<nome-do-repositorio>.git
   ```

2. Abra a pasta no VS Code.
3. Instale a extensão **Live Server**, de Ritwick Dey.
4. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

Também é possível abrir o `index.html` direto no navegador, mas o manifest do site só carrega quando a página é servida por um servidor local.

## Como personalizar

- **Cores:** todas as cores ficam nas variáveis do `:root`, no início do `style.css`.
- **Conteúdo:** edite os textos, os cards de projeto e os links diretamente no `index.html`.
- **Animações:** a lógica de scroll está no `script.js`, dividida em blocos comentados.

## Publicação

O site é estático, então pode ser publicado sem etapa de build em serviços como Vercel, Netlify ou GitHub Pages. Basta apontar o serviço para a raiz do repositório.

## Contato

- GitHub: [@Henrique498](https://github.com/Henrique498)
- LinkedIn: [Henrique Silva](https://www.linkedin.com/in/henrique-silva-4637a7282/)

## Licença

Defina aqui a licença do projeto, por exemplo MIT, ou remova esta seção.
