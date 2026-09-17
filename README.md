# CAN GROUP — Cartão Virtual

Projeto completo em React + Vite para um cartão de visita digital responsivo.

## Tecnologias

- React
- Vite
- Tailwind CSS v4
- Lucide React
- QRCode React
- Supabase (estrutura pronta para múltiplos cartões)
- Vercel (deploy)

## 1. Instalar

```bash
npm install
```

## 2. Rodar localmente

```bash
npm run dev
```

## 3. Personalizar

Edite:

`src/data/card.js`

Troque:
- WhatsApp
- Instagram
- LinkedIn
- e-mail
- telefone
- endereço
- Google Maps
- site

## 4. QR Code

O QR Code usa automaticamente a URL atual da página:

`window.location.href`

Assim, depois de publicar, ele aponta para o endereço real do cartão.

## 5. Salvar contato

O botão "Salvar contato" gera um arquivo `.vcf` compatível com celulares.

## 6. Supabase

O arquivo `supabase/schema.sql` cria uma tabela para armazenar vários cartões.

A versão inicial usa os dados locais para facilitar o primeiro deploy. Depois você pode transformar a URL em:

`/can-group`

e buscar o cartão pelo `slug` no Supabase.

## 7. Deploy na Vercel

1. Suba o projeto para o GitHub.
2. Importe o repositório na Vercel.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

## Estrutura

src/
├── components/
│   ├── BrandLogo.jsx
│   ├── ContactCard.jsx
│   └── SocialButton.jsx
├── data/
│   └── card.js
├── lib/
│   └── vcard.js
├── App.jsx
├── main.jsx
└── index.css

supabase/
└── schema.sql
