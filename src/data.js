// Catálogo da analua&co — versão WhatsApp standalone
// Imagens carregam direto de identity/ (sem bundler)
//
// ⚙️  PRODUTOS_DEFAULT = o que está hardcoded aqui
//     PRODUCTS = pode vir do localStorage (alterações do admin) OU dos defaults
//
// Pra atualizar pra todo mundo: edite no /admin, exporte data.js, suba na Netlify.

window.PRODUCTS_DEFAULT = [
  {
    id: 'pearl-charm-necklace',
    name: 'Colar Pearl Charm',
    category: 'colares',
    price: 489,
    description: 'Pérolas de água doce alinhavadas em fio resistente, com seleção de charms vintage garimpados a dedo: borboleta, locket "i love you", coração de soda, melancia e brincos cowgirl. Cada peça é única na composição.',
    material: 'Pérolas naturais · Charms banho ouro 18k · Esmalte vitrificado',
    measure: '38 cm + extensor de 5 cm',
    care: 'Evite contato com perfume, água do mar e cremes. Limpe com flanela seca.',
    images: ['identity/page-1.png'],
    isUnique: true,
    isNew: true,
    sizes: ['único'],
  },
  {
    id: 'aneis-statement-gold',
    name: 'Set Anéis Statement Gold',
    category: 'aneis',
    price: 1290,
    description: 'Composição de quatro anéis em ouro: o medalhão central, o anel duplo escultural, o anel de pedras coloridas e o de ponta minimalista. Vende-se em set ou avulso.',
    material: 'Banho ouro 18k · Pedras semipreciosas · Quartzo verde',
    measure: 'Aros 14 a 22',
    care: 'Retire para dormir e para atividades físicas. Higienize com flanela seca.',
    images: ['identity/page-6-1.png'],
    isNew: true,
    sizes: ['14', '16', '18', '20', '22'],
  },
  {
    id: 'gold-charm-layered',
    name: 'Colares Gold Charm Layered',
    category: 'colares',
    price: 689,
    description: 'O clássico da analua: três correntes de espessuras distintas com sequência de charms — locket 8-ball, dado dourado, plaquinha "I SAID NO", coração gravado e tag preta. A camada perfeita.',
    material: 'Banho ouro 18k · Esmalte vitrificado',
    measure: '40 + 45 + 50 cm',
    care: 'Evite contato com perfume e água. Guarde separado para não embolar.',
    images: ['identity/page-6-3.png'],
    isUnique: false,
    sizes: ['único'],
  },
  {
    id: 'rings-treasure-stack',
    name: 'Treasure Stack — anéis empilhados',
    category: 'aneis',
    price: 1490,
    description: 'Coleção pessoal montada com a cliente: signet Harvard, anel cobra esculpido, faixa azul turquesa, esmeralda cravejada e diamante marquise. Vende-se avulso ou conjunto completo.',
    material: 'Banho ouro 18k · Esmeralda · Turquesa esmaltada · Zircônias',
    measure: 'Aros 12 a 22',
    care: 'Polimento profissional anual recomendado.',
    images: ['identity/page-6-4.png'],
    isUnique: true,
    sizes: ['12', '14', '16', '18', '20', '22'],
  },
  {
    id: 'vintage-locket-set',
    name: 'Colares Vintage Locket',
    category: 'colares',
    price: 549,
    description: 'Garimpo em alfarrabistas e antiquários: lockets em ouro envelhecido com correntes de bolinhas e correntes vênezia. Conjunto inclui medalhão "Janeiro Amizade", número 3 com pedrarias e coração rubi.',
    material: 'Metal envelhecido · Vidros coloridos · Pedras naturais',
    measure: '38, 42 e 48 cm',
    care: 'Não imergir em água. Guarde em saquinho de tecido.',
    images: ['identity/page-6-5.png'],
    isUnique: true,
    isNew: false,
    sizes: ['único'],
  },
  {
    id: 'bangle-multi-stone',
    name: 'Bracelete Multi-Stone',
    category: 'pulseiras',
    price: 890,
    description: 'Conjunto de bangles em ouro com pulseira de pedras naturais lapidadas em formatos irregulares — citrino, ametista, peridoto, turmalina e granada. Pulseira escultural.',
    material: 'Banho ouro 18k · Pedras naturais lapidadas',
    measure: 'Aro M (16-18 cm)',
    care: 'Evite atrito. Pedras frágeis.',
    images: ['identity/page-6-6.png'],
    sizes: ['P', 'M', 'G'],
  },
  {
    id: 'rings-y2k-silver',
    name: 'Anéis Y2K Silver',
    category: 'aneis',
    price: 390,
    description: 'Coleção em prata envelhecida com inspiração Y2K: estrela "Very Rare", anel coelho desenhado, "10" gravado, morango com sementes, "Bon Voyage" e "PEACE". Vende-se avulso.',
    material: 'Prata 925 envelhecida',
    measure: 'Aros 14 a 22',
    care: 'Limpe com flanela de prata. Pode oxidar com o uso — parte do charme.',
    images: ['identity/page-6-7.png'],
    isNew: true,
    sizes: ['14', '16', '18', '20', '22'],
  },
  {
    id: 'rainbow-choker',
    name: 'Rainbow Crystal Choker',
    category: 'colares',
    price: 1190,
    description: 'Choker scult em cristais multifacetados pink, esmeralda e topázio, com três fios de pérolas e charms religiosos vintage — cruz de strass rosa, medalhão Nossa Senhora, locket "I love you" e tag de cristal.',
    material: 'Cristais facetados · Pérolas naturais · Charms banhados',
    measure: '36 cm + extensor 5 cm',
    care: 'Para ocasião. Guarde plano em estojo.',
    images: ['identity/page-6-8.png'],
    isUnique: true,
    sizes: ['único'],
  },
  {
    id: 'thick-gold-layered',
    name: 'Colar Heavy Gold Layered',
    category: 'colares',
    price: 729,
    description: 'Para quem ama camada pesada: corrente puff Gucci-style com elos largos sobreposta a três correntes finas — uma sustenta tag estrela, outra signo de Áries esmaltado e cluster de flores cristal.',
    material: 'Banho ouro 18k · Esmalte vitrificado · Zircônias',
    measure: '38 + 42 + 46 cm',
    care: 'Cada corrente pode ser usada separada.',
    images: ['identity/page-6-9.png'],
    sizes: ['único'],
  },
  {
    id: 'charm-bracelet-multi',
    name: 'Bracelete Charm Mix',
    category: 'pulseiras',
    price: 459,
    description: 'Pulseira chunky com charms vintage variados — envelope dourado, concha, bolsinha rosa, dadinho, flor vermelha esmaltada, locket coração "Don\'t Forget Me", e quartzo cristal pendurado.',
    material: 'Banho ouro 18k · Esmalte · Charms vintage',
    measure: 'Aro M (16-18 cm)',
    care: 'Não puxar charms. Bater de leve sai a pintura.',
    images: ['identity/page-6-10.png'],
    sizes: ['P', 'M', 'G'],
  },
  {
    id: 'cafe-daintys',
    name: 'Anéis Daintys & Bangles',
    category: 'aneis',
    price: 459,
    description: 'Para o uso de todo dia: dupla de anéis dainty (a "agulha" e o de bolinhas pavé), anel solitário discreto e set de bangles polidos. Quase invisível — quase.',
    material: 'Banho ouro 18k · Zircônias micro pavé',
    measure: 'Aros 12 a 20',
    care: 'Resistente ao uso diário. Evite imersão em água com cloro.',
    images: ['identity/page-7-3.png'],
    isNew: true,
    sizes: ['12', '14', '16', '18', '20'],
  },
  {
    id: 'editorial-set-tiger',
    name: 'Set Tiger Eye Editorial',
    category: 'colares',
    price: 369,
    description: 'Colar de tigereye natural com pingente sol esmaltado em ouro, dupla de argolas torcidas e trio de anéis (bolinhas, faixa e duplo). Vibe editorial que vai do tricô ao calor.',
    material: 'Olho de tigre natural · Banho ouro 18k',
    measure: 'Colar 44 cm + extensor',
    care: 'Pedra natural pode variar de tom — não é defeito.',
    images: ['identity/page-7-1.png'],
    sizes: ['único'],
  },
];

window.COLLECTIONS_DEFAULT = [
  {
    id: 'charm-everything',
    name: 'Charm Everything',
    subtitle: 'A coleção que define a casa',
    description: 'Camadas, lockets, vintage e ousadia. Garimpo curado em três continentes para montar peças únicas.',
    image: 'identity/page-6-3.png',
  },
  {
    id: 'gold-only',
    name: 'Gold Only',
    subtitle: 'Apenas ouro, em todas as suas formas',
    description: 'Da bolinha minimalista ao bangle escultural. Banho 18k, peças resistentes ao uso diário.',
    image: 'identity/page-6-1.png',
  },
  {
    id: 'y2k-silver',
    name: 'Y2K Silver',
    subtitle: 'Prata envelhecida com humor',
    description: 'Estrelas, coelhos, morangos e palavras. Para quem leva a vida em modo charm.',
    image: 'identity/page-6-7.png',
  },
];

window.HERO_IMAGE = 'identity/page-1.png';
window.STORY_IMAGE = 'identity/page-6-5.png';
window.EDITORIAL_IMAGE = 'identity/page-7-2.png';
window.ABOUT_BLEED_IMAGE = 'identity/page-6-9.png';

window.CATEGORIES = [
  { id: 'todos', name: 'Tudo' },
  { id: 'colares', name: 'Colares' },
  { id: 'aneis', name: 'Anéis' },
  { id: 'pulseiras', name: 'Pulseiras' },
];

window.MATERIALS = ['Banho ouro 18k', 'Prata 925', 'Pedras naturais', 'Vintage'];

// Formatadores
window.formatPrice = (n) => 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
window.formatInstallment = (n) => {
  const value = (n / 12);
  return '12x de ' + window.formatPrice(value).replace('R$ ', 'R$ ');
};

// ─── OVERRIDE LOCAL (admin) ──────────────────────────────────────────────
// O admin salva alterações em localStorage. Aqui carregamos elas como override
// dos defaults — assim quem editou vê suas alterações IMEDIATAMENTE no browser
// (sem precisar publicar). Outros visitantes só veem após o data.js novo ser
// enviado pra Netlify.
(function() {
  try {
    var ov = localStorage.getItem('analua_products_override');
    if (ov) {
      var parsed = JSON.parse(ov);
      if (Array.isArray(parsed) && parsed.length > 0) {
        window.PRODUCTS = parsed;
        return;
      }
    }
  } catch (e) { /* localStorage off ou parse falhou — usa defaults */ }
  window.PRODUCTS = window.PRODUCTS_DEFAULT;
})();

(function() {
  try {
    var ov = localStorage.getItem('analua_collections_override');
    if (ov) {
      var parsed = JSON.parse(ov);
      if (Array.isArray(parsed) && parsed.length > 0) {
        window.COLLECTIONS = parsed;
        return;
      }
    }
  } catch (e) { /* idem */ }
  window.COLLECTIONS = window.COLLECTIONS_DEFAULT;
})();
