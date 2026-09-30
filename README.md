# Alcançar — Clínica de Fisioterapia Integrada

Site estático reconstruído do zero (antigo descartado para `/antigo/`).

## Como publicar na Vercel

1. Crie um projeto na Vercel e conecte este repositório.
2. O site serve da raiz (`/`); nenhum build necessário.
3. `vercel.json` (opcional): `{"cleanUrls": true}` — não usar rewrites que redirecionem arquivos estáticos para `index.html`.

## Como trocar fotos / textos

- **Logo / imagens**: substitua em `/assets/img/` (mantenha nomes idênticos entre disco e HTML; Vercel diferencia maiúsculas/minúsculas). Logo no header deve ter 48px de altura (`height: 48px` no CSS/HTML).
- **Textos de seções**: edite diretamente no `/index.html` (todas as seções estão escritas no HTML; JS só adiciona interatividade).
- **Equipe**: edite os cards na seção `#equipe` (fotos placeholder estão com gradientes; substitua as `div`s por `<img>` quando tiver as fotos). Registros (CREFITO/CRN/CRP) estão como "a preencher".
- **Convênios**: logo do Unimed está em `/assets/img/unimed-tres-vales.jpg`; substitua se necessário e atualize o texto do `alt`.
- **Números / WhatsApp**: edite `/assets/js/config.js` (dados oficiais — fonte única). Depois atualize os links `wa.me` no HTML se necessário.
- **Depoimentos / Instagram**: controle por `showTestimonials: false` no `config.js`. Se ligar (`true`), substitua os blocos `[depoimento de paciente: substituir]` com textos reais. Fotos do Instagram estão como placeholders do logo — substitua os `src` no grid.

## Estrutura

- `/index.html` — página única (todas as seções)
- `/assets/css/style.css` — estilos (crítico inline + completo)
- `/assets/js/config.js` — dados e regras da ferramenta guiada
- `/assets/js/main.js` — interatividade (animações, filtros, FAQ, formulário)
- `/assets/img/logo.jpg` — logo principal (usado no header, rodapé, loader, favicon)
- `/assets/img/unimed-tres-vales.jpg` — logo do convênio

## Placeholders (substituir antes de publicar):

- `hero.jpg` (seção Sobre — figura orgânica atualmente)
- `equipe-jamara.jpg`, `equipe-sinnara.jpg`, `equipe-thaluany.jpg`
- `galeria-1.jpg` a `galeria-4.jpg` (Instagram)
- Mapa incorporado (`iframe`) — usar links de embed reais das unidades
- Responsável técnico + registros da equipe

## Regras obrigatórias mantidas

- HTML, CSS, JS puros; sem framework/build.
- Caminhos absolutos (`/assets/...`), nomes minúsculos.
- `<html lang="pt-BR">`, meta viewport, title/descrição, OG, JSON-LD.
- Animações progressivas (`js-ready` + `IntersectionObserver`); sem JS tudo visível.
- Loader até 1,5s com fallback.
- Corpo mínimo 17px, botões 48px+, contraste bom, foco visível.
- Sem imagens externas; ícones ilustrações em SVG inline.
