# analua&co — versão WhatsApp + Admin (100% grátis)

Site estático React do design original da analua&co, com:
- **Loja** — catálogo + carrinho + checkout via WhatsApp
- **Painel admin** — login com e-mail/senha, edita produtos, exporta `data.js` pra publicar

Roda em qualquer hospedagem grátis (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

**Custo total: R$ 0** (excluindo domínio personalizado, opcional).

---

## Como funciona

1. Cliente navega no site, monta o carrinho
2. Clica em "Finalizar compra" → vai pra tela de checkout
3. Preenche **só o nome** (resto é opcional: telefone, CEP, observação)
4. Clica em "Enviar pedido pelo WhatsApp"
5. Abre o WhatsApp com mensagem pronta listando produtos, valores, dados
6. Você confirma estoque, manda link de pagamento (Pix/cartão direto pelo Mercado Pago link, ou Pix manual)

Exemplo de mensagem que chega no seu WhatsApp:

```
Olá! Quero fechar o pedido na *analua&co*:

🌟 *Colar Pearl Charm* (1x) — R$ 489,00
🌟 *Set Anéis Statement Gold* · Tam. 16 (1x) — R$ 1.290,00

━━━━━━━━━━━━━━━
Subtotal: *R$ 1.779,00*
✓ Frete grátis (acima de R$ 499)

Nome: Maria Silva
Telefone: (11) 98765-4321
CEP: 01310100
Cidade: São Paulo, SP

Obs: Embrulho de presente, por favor

Aguardo confirmação de disponibilidade, frete final e link de pagamento (Pix ou cartão). Obrigada!
```

---

## Antes de publicar — configure (2 lugares)

### 1) WhatsApp e dados da loja

Abra o arquivo [`index.html`](index.html) e edite o bloco no topo:

```html
<script>
  window.ANALUA_CONFIG = {
    whatsapp: '5511999999999',  // ← TROQUE pelo seu número (com 55 + DDD + número, só dígitos)
    storeName: 'analua&co',
    freeShippingMin: 499,
    pixDiscount: 0.05,
    showMarquee: false,
  };
</script>
```

**Importante:** o número WhatsApp deve ter:
- Sem espaços, parênteses ou traços
- Com código do país `55` no início
- Com DDD
- Exemplo: `5511999999999` (SP), `5521988887777` (RJ)

### 2) Credenciais do admin

Abra o arquivo [`admin.html`](admin.html) e edite o bloco do admin:

```html
<script>
  window.ANALUA_CONFIG = { /* mesma config do index.html */ };

  window.ADMIN_AUTH = {
    email: 'admin@analuaco.com',     // ← TROQUE pelo e-mail dela
    password: 'analua2026!',         // ← TROQUE pela senha forte (8+ caracteres)
  };
</script>
```

**⚠️ Segurança:** essa senha fica visível no código-fonte (é JavaScript). Serve pra proteção contra acesso casual, não contra hacker dedicado. Pra segurança forte de verdade, precisa de backend (o que sai do escopo "grátis"). Recomendações:
- Senha diferente da que você usa em e-mail/banco
- Não compartilhe a URL `/admin.html` publicamente
- Pra trocar a senha depois: edita o arquivo `admin.html`, sobe de novo na Netlify

> 🔐 **Credenciais padrão (TROQUE!):**
> - E-mail: `admin@analuaco.com`
> - Senha: `analua2026!`

Salve os dois arquivos e publique.

---

## Como publicar de graça

### 🟢 Opção 1 — Netlify Drop (mais fácil, 1 minuto)

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Faça login (cria conta grátis com Google/GitHub)
3. **Arraste a pasta `analua-whatsapp` inteira** pra área "Drag and drop your site folder here"
4. Espera 30 segundos — site no ar em `https://random-name-xxxx.netlify.app`
5. (Opcional) `Site settings → Domain management → Change site name` → troca pra `analuaco.netlify.app` ou conecta seu domínio próprio

**Atualizar depois:** arraste a pasta de novo no Netlify Drop, mesmo site, conteúdo novo.

### 🟢 Opção 2 — Vercel CLI (pra quem tem terminal)

```bash
cd analua-whatsapp
npx vercel --prod
```

Segue o assistente. Site vai pra `analuaco.vercel.app`.

### 🟢 Opção 3 — Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → "Upload assets"
2. Compacta a pasta `analua-whatsapp` em `.zip` e sobe
3. Pronto

### 🟢 Opção 4 — GitHub Pages

1. Cria repositório `analuaco-store` no GitHub
2. Faz upload da pasta `analua-whatsapp` (botão "Add file → Upload files")
3. `Settings → Pages → Source: Deploy from a branch → main / root` → Save
4. Site fica em `seuuser.github.io/analuaco-store`

---

## Domínio próprio (opcional, ~R$ 40/ano)

1. Compra domínio em [registro.br](https://registro.br) (`.com.br` por ~R$ 40/ano) ou [namecheap.com](https://www.namecheap.com) (`.com` por ~US$ 12/ano)
2. Na Netlify: `Domain management → Add custom domain → digita analuaco.com.br`
3. A Netlify mostra os DNS pra apontar — você copia pro painel do registrador
4. SSL ativa automaticamente (grátis)

Pronto: seu site em `analuaco.com.br`.

---

## Como atualizar produtos depois (via painel admin)

Acessa `seu-site.netlify.app/admin.html` (ou `seu-dominio.com/admin.html`) e loga com as credenciais que configurou no `admin.html`.

### O que dá pra fazer no admin

- **Ver lista** de todos os produtos com foto, badge (NOVO/ÚNICA) e preço
- **Editar** qualquer produto:
  - Nome, ID/slug, categoria (colares/anéis/pulseiras), preço
  - Descrição, material, medidas, cuidados, tamanhos
  - Foto principal (escolhe entre as 14 fotos da pasta `identity/`, ou aponta pra uma nova)
  - Marcar como "NOVO" ou "PEÇA ÚNICA"
- **Adicionar novo produto** (botão "+ Novo produto")
- **Remover produto**

### Fluxo de publicação (2 passos)

```
[1] EDITA no admin
    │
    ├─→ alterações vão pro localStorage do navegador
    ├─→ aparecem IMEDIATAMENTE quando ela acessa a loja DELA
    └─→ outros visitantes ainda não veem

[2] CLICA em "Exportar data.js"
    │
    ├─→ baixa o arquivo data.js novo
    └─→ sobe na Netlify (substituindo o antigo) → todo mundo vê
```

### Passo a passo de "publicar"

1. No admin, edita os produtos como quiser
2. No topo aparece o aviso amarelo "⚠️ Você tem alterações não publicadas"
3. Clica em **EXPORTAR DATA.JS** → baixa o arquivo no seu PC
4. Abre [app.netlify.com](https://app.netlify.com) → seu site → "Deploys"
5. Modo mais fácil: arraste a pasta `analua-whatsapp` inteira (com o `data.js` novo dentro de `src/`) na área de "Drag and drop here"
6. Em 30s a alteração tá pública

### Adicionar foto nova

1. Coloque o arquivo da foto (PNG, JPG ou WEBP) na pasta `identity/`
2. No admin, no editor do produto, expanda "Usar outra imagem" e digite `identity/nome-da-sua-foto.png`
3. Salve
4. Republique (passo 4 acima)

### Editar manualmente (sem admin)

Se preferir, ainda dá pra editar [`src/data.js`](src/data.js) direto em qualquer editor de texto. Tudo que o admin faz é gerar esse mesmo arquivo.

---

## Como receber pagamento

O site não processa pagamento. Tudo passa pelo WhatsApp:

1. Cliente envia o pedido pelo botão do site
2. Você recebe a mensagem no WhatsApp
3. Confirma estoque + calcula frete
4. **Gera link de pagamento Mercado Pago** — opções:
   - **Mercado Pago Cobrança/Pix Cobrar** (grátis, gera QR Pix na hora)
   - **Mercado Pago Link de Pagamento** (cliente paga cartão/Pix no link)
   - **PicPay, PagSeguro** — todos têm link grátis pra gerar cobrança
5. Cliente paga, você confirma, despacha

**Taxas (não são do site, são do gateway):**
- Pix Mercado Pago: **0,99%** por transação (~R$ 5 numa venda de R$ 500)
- Cartão Mercado Pago: **4,99%** à vista (~R$ 25 numa venda de R$ 500)
- Sem mensalidade — só paga quando vende

---

## Limitações dessa versão

| Função | Disponível? |
|---|---|
| Catálogo visual | ✅ Sim |
| **Hero rotativo com setas** | ✅ Sim (5 produtos rotacionam a cada 5s) |
| Carrinho (sessão) | ✅ Sim (perde ao fechar o navegador) |
| Checkout estilizado | ✅ Sim (envia pro WhatsApp) |
| **Painel admin com login** | ✅ Sim (`/admin.html`) |
| Estoque em tempo real | ❌ Não (você controla na cabeça/planilha) |
| Pagamento no site | ❌ Não (cliente paga pelo link MP que você gera) |
| E-mail transacional | ❌ Não (WhatsApp substitui) |
| Login de cliente | ❌ Não |
| Cupons | ❌ Não |
| Multiidioma | ❌ Não |

Se algum dia precisar de algum desses, dá pra migrar pro WordPress (você já tem o tema pronto na pasta `analua-theme`).

---

## Estrutura do projeto

```
analua-whatsapp/
├── index.html              ← Loja pública (config WhatsApp no topo)
├── admin.html              ← Painel admin (login + editor)
├── identity/               ← 14 fotos dos produtos
│   ├── page-1.png         (Colar Pearl Charm — capa)
│   ├── page-6-1.png       (Set Anéis Statement Gold)
│   └── ...
└── src/
    ├── data.js            ← Catálogo (12 produtos default + lógica override)
    ├── styles.css         ← Design system (~40KB) + CSS do admin
    ├── components.jsx     ← Header, Footer, Cart drawer, Cards
    ├── screens.jsx        ← Home (hero rotativo), Shop, Produto, Sobre, Checkout, Sucesso
    ├── app.jsx            ← Root + roteamento da loja
    └── admin.jsx          ← React do painel admin
```

---

## Suporte

Qualquer dúvida ou pra adicionar funcionalidades novas (newsletter, calculadora de frete real, etc.), é só me chamar de volta no Claude.

— analua&co · versão WhatsApp grátis · 2026
