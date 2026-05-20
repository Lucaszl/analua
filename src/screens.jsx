// Telas do app — analua&co
// Home, Shop, Product, About, Checkout, Success

const { useState: useStateS, useEffect: useEffectS, useMemo: useMemoS } = React;

// ─── HOME ───────────────────────────────────────────────────────────────────
function HomeScreen({ navigate, onAddToCart, products, collections }) {
  const featured = products.slice(0, 6);
  const newDrops = products.filter(p => p.isNew).slice(0, 4);

  // Slides do hero: até 5 produtos (preferencialmente os 'isNew')
  const heroProducts = useMemoS(() => {
    const news = products.filter(p => p.isNew);
    const pool = news.length >= 3 ? news : products;
    return pool.slice(0, 5);
  }, [products]);

  const [heroIdx, setHeroIdx] = useStateS(0);
  const heroTimerRef = React.useRef(null);
  const heroPausedRef = React.useRef(false);

  const showHero = (i) => {
    const n = heroProducts.length;
    if (n === 0) return;
    setHeroIdx(((i % n) + n) % n);
  };
  const restartHero = () => {
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    heroTimerRef.current = setInterval(() => {
      if (!heroPausedRef.current) {
        setHeroIdx(prev => {
          const n = heroProducts.length;
          return n > 0 ? (prev + 1) % n : 0;
        });
      }
    }, 5000);
  };

  useEffectS(() => {
    if (heroProducts.length <= 1) return;
    restartHero();
    const onVis = () => { heroPausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [heroProducts.length]);

  // Swipe touch
  const touchStartRef = React.useRef({x: 0, y: 0});
  const onTouchStart = (e) => {
    touchStartRef.current = {x: e.touches[0].clientX, y: e.touches[0].clientY};
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) showHero(heroIdx - 1);
    else showHero(heroIdx + 1);
    restartHero();
  };

  return (
    <main className="screen home">
      {/* HERO EDITORIAL (slider) */}
      <section className="hero">
        <div
          className="hero-img"
          onMouseEnter={() => { heroPausedRef.current = true; }}
          onMouseLeave={() => { heroPausedRef.current = false; }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {heroProducts.length > 0 ? (
            heroProducts.map((p, i) => (
              <a
                key={p.id}
                className={'hero-slide' + (i === heroIdx ? ' on' : '')}
                href="#"
                onClick={(e) => { e.preventDefault(); navigate({name:'product', id:p.id}); }}
                style={{ backgroundImage: 'url(' + (p.images[0] || window.HERO_IMAGE) + ')' }}
                aria-hidden={i === heroIdx ? 'false' : 'true'}
              >
                <span className="hero-slide-cap">{p.name}</span>
              </a>
            ))
          ) : (
            <img src={window.HERO_IMAGE} alt="Capa da temporada"/>
          )}

          {heroProducts.length > 1 && (
            <React.Fragment>
              <button
                className="hero-arrow hero-arrow-prev"
                type="button"
                aria-label="Slide anterior"
                onClick={() => { showHero(heroIdx - 1); restartHero(); }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
              </button>
              <button
                className="hero-arrow hero-arrow-next"
                type="button"
                aria-label="Próximo slide"
                onClick={() => { showHero(heroIdx + 1); restartHero(); }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>

              <div className="hero-dots" role="tablist" aria-label="Slides do hero">
                {heroProducts.map((_, i) => (
                  <button
                    key={i}
                    className={'hero-dot' + (i === heroIdx ? ' on' : '')}
                    type="button"
                    role="tab"
                    aria-selected={i === heroIdx ? 'true' : 'false'}
                    aria-label={'Slide ' + (i+1)}
                    onClick={() => { showHero(i); restartHero(); }}
                  />
                ))}
              </div>
            </React.Fragment>
          )}
        </div>

        <div className="hero-text">
          <span className="eyebrow">Temporada · primavera 26</span>
          <h1 className="display">Use cada<br/><em>história</em><br/>como joia.</h1>
          <p className="hero-lede">Charms garimpados em três continentes. Camadas que contam histórias. Peças únicas — quando acaba, acaba.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={()=>navigate({name:'shop',category:'todos'})}>
              <span>Ver a loja</span><Icon.arrow/>
            </button>
            <button className="btn-ghost" onClick={()=>navigate({name:'product',id:heroProducts[heroIdx]?.id || 'pearl-charm-necklace'})}>
              Conhecer a capa
            </button>
          </div>
        </div>
      </section>

      {/* COLEÇÕES */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Coleções</span>
          <h2 className="display">Três <em>universos</em>,<br/>uma só casa.</h2>
        </div>
        <div className="collections-grid">
          {collections.map((c, i) => (
            <a key={c.id} href="#" className={'collection-card c-'+i} onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'todos'})}}>
              <div className="collection-img"><img src={c.image} alt={c.name}/></div>
              <div className="collection-meta">
                <span className="eyebrow">{c.subtitle}</span>
                <h3 className="display">{c.name}</h3>
                <p className="small">{c.description}</p>
                <span className="arrow-link">Explorar <Icon.arrow width="14" height="14"/></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* NOVOS */}
      <section className="section bg-paper">
        <div className="section-head row">
          <div>
            <span className="eyebrow">Acabou de chegar</span>
            <h2 className="display"><em>Novos</em> garimpos.</h2>
          </div>
          <a href="#" className="arrow-link" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'todos'})}}>Ver tudo <Icon.arrow width="14" height="14"/></a>
        </div>
        <div className="pgrid pgrid-4">
          {newDrops.map(p => <ProductCard key={p.id} product={p} onClick={(p)=>navigate({name:'product',id:p.id})}/>)}
        </div>
      </section>

      {/* EDITORIAL BLEED */}
      <section className="editorial-bleed">
        <div className="editorial-bleed-img">
          <img src={window.EDITORIAL_IMAGE} alt="Editorial — joia em camadas" style={{objectPosition:'center 25%'}}/>
        </div>
        <div className="editorial-bleed-text">
          <span className="eyebrow">Editorial #03</span>
          <h2 className="display"><em>Mais</em> é<br/>mais.</h2>
          <p className="lede-small">A analua não é sobre a peça certa — é sobre todas elas juntas. Anéis empilhados até o nó do dedo, colares em camada, pulseiras subindo o braço. <em>Excesso curado.</em></p>
          <button className="btn-ghost light" onClick={()=>navigate({name:'about'})}>O manifesto</button>
        </div>
      </section>

      {/* FAVORITOS DA CASA */}
      <section className="section">
        <div className="section-head row">
          <div>
            <span className="eyebrow">Favoritos da casa</span>
            <h2 className="display">As <em>peças-chave</em>.</h2>
          </div>
          <a href="#" className="arrow-link" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'todos'})}}>Ver tudo <Icon.arrow width="14" height="14"/></a>
        </div>
        <div className="pgrid pgrid-3">
          {featured.slice(0,3).map(p => <ProductCard key={p.id} product={p} onClick={(p)=>navigate({name:'product',id:p.id})}/>)}
        </div>
        <div className="pgrid pgrid-3" style={{marginTop:24}}>
          {featured.slice(3,6).map(p => <ProductCard key={p.id} product={p} onClick={(p)=>navigate({name:'product',id:p.id})}/>)}
        </div>
      </section>

      {/* STORY */}
      <section className="story">
        <div className="story-text">
          <span className="eyebrow">Sobre a casa</span>
          <h2 className="display">Garimpo <em>curado</em><br/>desde 2019.</h2>
          <p className="lede-small">A analua&co nasceu da obsessão por lockets de avó, anéis de signet, dadinhos de feira e cartas de tarô — tudo que tinha história. Hoje, cada peça é selecionada à mão, em São Paulo, Lisboa, Cidade do México e Buenos Aires.</p>
          <button className="btn-ghost" onClick={()=>navigate({name:'about'})}>Ler a história</button>
        </div>
        <div className="story-img">
          <img src={window.STORY_IMAGE} alt="Lockets vintage"/>
        </div>
      </section>
    </main>
  );
}
window.HomeScreen = HomeScreen;

// ─── SHOP ───────────────────────────────────────────────────────────────────
function ShopScreen({ navigate, route, products }) {
  const [cat, setCat] = useStateS(route.category || 'todos');
  const [sort, setSort] = useStateS('relevance');
  const [filterMat, setFilterMat] = useStateS(new Set());
  const [showFilters, setShowFilters] = useStateS(false);

  useEffectS(() => {
    setCat(route.category || 'todos');
  }, [route.category]);

  const filtered = useMemoS(() => {
    let list = cat === 'todos' ? products : products.filter(p => p.category === cat);
    if (filterMat.size > 0) {
      list = list.filter(p => Array.from(filterMat).some(m => p.material.toLowerCase().includes(m.toLowerCase())));
    }
    if (sort === 'price-asc') list = [...list].sort((a,b)=>a.price-b.price);
    if (sort === 'price-desc') list = [...list].sort((a,b)=>b.price-a.price);
    if (sort === 'new') list = [...list].sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
    return list;
  }, [products, cat, sort, filterMat]);

  const toggleMat = (m) => {
    const next = new Set(filterMat);
    if (next.has(m)) next.delete(m); else next.add(m);
    setFilterMat(next);
  };

  const catName = (window.CATEGORIES.find(c => c.id === cat) || {name:'Tudo'}).name;

  return (
    <main className="screen shop">
      <div className="shop-head">
        <div className="crumbs small muted">
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'home'})}}>Início</a>
          <span> / </span>
          <a href="#" onClick={(e)=>{e.preventDefault();setCat('todos')}}>Loja</a>
          {cat !== 'todos' && <React.Fragment><span> / </span><span>{catName}</span></React.Fragment>}
        </div>
        <h1 className="display shop-title"><em>{catName}</em></h1>
        <p className="lede-small">{filtered.length} {filtered.length === 1 ? 'peça' : 'peças'} disponíveis · Garimpo curado, edição limitada.</p>
      </div>

      <div className="shop-tabs">
        {window.CATEGORIES.map(c => (
          <button key={c.id} className={'tab ' + (cat === c.id ? 'on':'')} onClick={()=>setCat(c.id)}>{c.name}</button>
        ))}
      </div>

      <div className="shop-toolbar">
        <button className="btn-ghost-sm" onClick={()=>setShowFilters(s=>!s)}>
          Filtros {filterMat.size>0 && <em style={{fontStyle:'italic',marginLeft:4}}>({filterMat.size})</em>}
        </button>
        <select className="select-sort" value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value="relevance">Mais relevantes</option>
          <option value="new">Novidades</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>
      </div>

      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <div className="filter-title">Material</div>
            <div className="chips">
              {window.MATERIALS.map(m => (
                <button key={m} className={'chip ' + (filterMat.has(m)?'on':'')} onClick={()=>toggleMat(m)}>{m}</button>
              ))}
            </div>
          </div>
          {filterMat.size > 0 && (
            <button className="link-tiny" onClick={()=>setFilterMat(new Set())}>Limpar filtros</button>
          )}
        </div>
      )}

      <div className="pgrid pgrid-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} onClick={(p)=>navigate({name:'product',id:p.id})}/>)}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p className="display"><em>Nada encontrado</em><br/>com esses filtros.</p>
          <button className="btn-ghost" onClick={()=>{setFilterMat(new Set());setCat('todos')}}>Limpar e ver tudo</button>
        </div>
      )}
    </main>
  );
}
window.ShopScreen = ShopScreen;

// ─── PRODUCT (PDP) ──────────────────────────────────────────────────────────
function ProductScreen({ navigate, route, products, onAddToCart }) {
  const product = products.find(p => p.id === route.id) || products[0];
  const [size, setSize] = useStateS(product.sizes[0]);
  const [openTab, setOpenTab] = useStateS('descricao');
  const [added, setAdded] = useStateS(false);

  useEffectS(() => {
    window.scrollTo({top:0, behavior:'auto'});
    setSize(product.sizes[0]);
    setAdded(false);
  }, [product.id]);

  const handleAdd = () => {
    onAddToCart({...product, selectedSize: size, qty: 1});
    setAdded(true);
    setTimeout(()=>setAdded(false), 1500);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4);

  return (
    <main className="screen pdp">
      <div className="pdp-grid">
        <div className="pdp-gallery">
          <ProductGallery images={product.images} name={product.name}/>
        </div>
        <div className="pdp-info">
          <div className="crumbs small muted">
            <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'home'})}}>Início</a>
            <span> / </span>
            <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:product.category})}}>{product.category}</a>
          </div>

          {product.isUnique && <span className="tag-unique">peça única · garimpo</span>}

          <h1 className="display pdp-name">{product.name}</h1>
          <div className="pdp-price">{window.formatPrice(product.price)}</div>
          <div className="pdp-installment small muted">ou <strong>12x</strong> de {window.formatPrice(product.price/12)} sem juros · ou Pix com 5% off por {window.formatPrice(product.price*0.95)}</div>

          <p className="pdp-desc">{product.description}</p>

          {product.sizes.length > 1 && (
            <div className="pdp-sizes">
              <div className="eyebrow" style={{marginBottom:10}}>Tamanho · aro</div>
              <div className="size-row">
                {product.sizes.map(s => (
                  <button key={s} className={'size ' + (size===s?'on':'')} onClick={()=>setSize(s)}>{s}</button>
                ))}
              </div>
              <a href="#" className="link-tiny" onClick={(e)=>e.preventDefault()}>Tabela de medidas</a>
            </div>
          )}

          <button className={'btn-primary big ' + (added?'success':'')} onClick={handleAdd}>
            {added ? '✓ Adicionado à sacola' : <React.Fragment><span>Adicionar à sacola</span><Icon.arrow/></React.Fragment>}
          </button>
          <div className="ship-info small muted">
            <span>✓ Frete grátis acima de R$ 499</span>
            <span>✓ Entrega em até 5 dias úteis</span>
            <span>✓ Pix (5% off) ou cartão em até 12x sem juros</span>
          </div>

          <div className="accordion">
            {[
              {id:'descricao', t:'Sobre a peça', c:product.description},
              {id:'material', t:'Material', c:product.material},
              {id:'medidas', t:'Medidas', c:product.measure},
              {id:'cuidados', t:'Cuidados', c:product.care},
            ].map(item => (
              <div key={item.id} className={'acc ' + (openTab===item.id?'on':'')}>
                <button className="acc-head" onClick={()=>setOpenTab(openTab===item.id?'':item.id)}>
                  <span>{item.t}</span>
                  <span className="acc-icon">{openTab===item.id?'−':'+'}</span>
                </button>
                {openTab === item.id && <div className="acc-body">{item.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <span className="eyebrow">Você também vai amar</span>
            <h2 className="display">No <em>mesmo</em> mood.</h2>
          </div>
          <div className="pgrid pgrid-4">
            {related.map(p => <ProductCard key={p.id} product={p} onClick={(p)=>navigate({name:'product',id:p.id})}/>)}
          </div>
        </section>
      )}
    </main>
  );
}
window.ProductScreen = ProductScreen;

// ─── ABOUT ──────────────────────────────────────────────────────────────────
function AboutScreen({ navigate }) {
  return (
    <main className="screen about">
      <section className="about-hero">
        <span className="eyebrow">Manifesto</span>
        <h1 className="display about-title">Cada peça<br/>tem <em>histórias</em><br/>antes de você.</h1>
        <p className="lede-small">A analua&co começou em 2019, em uma feira em Buenos Aires, quando ANALUA encontrou um locket de prata com a foto de um casal desconhecido. Comprou. E não parou mais.</p>
      </section>

      <section className="about-bleed">
        <img src={window.ABOUT_BLEED_IMAGE} alt="Charm necklace statement"/>
      </section>

      <section className="about-text">
        <h2 className="display"><em>Garimpo</em>, não fast fashion.</h2>
        <p>Nossas peças vêm de antiquários, feiras de pulga, ourives independentes e ateliês de família. Algumas têm 80 anos. Outras saíram do forno na semana passada. O que importa é que cada uma carrega uma marca — gravação, amassado, esmaltação imperfeita.</p>
        <p>A casa cura, monta e dá vida nova. Você compra <em>uma peça</em> — não cinco mil iguais.</p>
      </section>

      <section className="about-pillars">
        {[
          {n:'01', t:'Peça única', c:'Quando esgota, acaba. Sem reposição idêntica.'},
          {n:'02', t:'Garimpo curado', c:'Buscamos em três continentes. Você compra de uma só fonte.'},
          {n:'03', t:'Mãos de ouro', c:'Montagem e acabamento feitos em São Paulo.'},
          {n:'04', t:'Sem pressa', c:'Coleções pequenas, lançadas quando estão prontas.'},
        ].map(p => (
          <div key={p.n} className="pillar">
            <div className="pillar-n">{p.n}</div>
            <h3 className="display">{p.t}</h3>
            <p className="small">{p.c}</p>
          </div>
        ))}
      </section>

      <section className="about-cta">
        <h2 className="display">Explore a <em>loja</em>.</h2>
        <button className="btn-primary" onClick={()=>navigate({name:'shop',category:'todos'})}>
          <span>Ver tudo</span><Icon.arrow/>
        </button>
      </section>
    </main>
  );
}
window.AboutScreen = AboutScreen;

// ─── CHECKOUT (WhatsApp flow) ───────────────────────────────────────────────
function CheckoutScreen({ navigate, items, onSubmit }) {
  const [form, setForm] = useStateS({
    nome: '', telefone: '', cep: '', cidade: '', observacoes: '',
  });

  const subtotal = items.reduce((s,i)=>s+i.price*i.qty, 0);
  const freeShip = subtotal >= 499;
  const total = subtotal;

  const setField = (k,v) => setForm({...form, [k]:v});

  const canSend = form.nome.trim().length > 1;

  const buildWhatsAppMessage = () => {
    const cfg = window.ANALUA_CONFIG || {};
    const lines = [];
    lines.push('Olá! Quero fechar o pedido na *' + (cfg.storeName || 'analua&co') + '*:');
    lines.push('');
    items.forEach((it) => {
      const sz = it.selectedSize && it.selectedSize !== 'único' ? ' · Tam. ' + it.selectedSize : '';
      lines.push('🌟 *' + it.name + '*' + sz + ' (' + it.qty + 'x) — ' + window.formatPrice(it.price * it.qty));
    });
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━');
    lines.push('Subtotal: *' + window.formatPrice(subtotal) + '*');
    if (freeShip) lines.push('✓ Frete grátis (acima de R$ 499)');
    lines.push('');
    if (form.nome) lines.push('Nome: ' + form.nome);
    if (form.telefone) lines.push('Telefone: ' + form.telefone);
    if (form.cep) lines.push('CEP: ' + form.cep);
    if (form.cidade) lines.push('Cidade: ' + form.cidade);
    if (form.observacoes) {
      lines.push('');
      lines.push('Obs: ' + form.observacoes);
    }
    lines.push('');
    lines.push('Aguardo confirmação de disponibilidade, frete final e link de pagamento (Pix ou cartão). Obrigada!');
    return lines.join('\n');
  };

  const handleSubmit = () => {
    const cfg = window.ANALUA_CONFIG || {};
    const number = (cfg.whatsapp || '').replace(/\D/g, '');
    const msg = buildWhatsAppMessage();
    const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(msg);
    // Salva o pedido pra tela de sucesso
    onSubmit({ form, items, subtotal, total, message: msg });
    // Abre WhatsApp em aba nova
    window.open(url, '_blank', 'noopener');
  };

  if (items.length === 0) {
    return (
      <main className="screen checkout">
        <div className="empty-state center" style={{paddingTop:80}}>
          <p className="display"><em>Sua sacola</em><br/>está vazia.</p>
          <button className="btn-primary" onClick={()=>navigate({name:'shop',category:'todos'})}>Explorar a loja</button>
        </div>
      </main>
    );
  }

  return (
    <main className="screen checkout">
      <div className="checkout-head">
        <a href="#" className="link-back" onClick={(e)=>{e.preventDefault();navigate({name:'home'})}}>← Continuar comprando</a>
        <span className="eyebrow">Pedido via WhatsApp</span>
      </div>

      <div className="checkout-grid">
        <div className="checkout-form">
          <div className="form-step">
            <h2 className="display">Fechar pelo <em>WhatsApp</em></h2>
            <p className="small muted" style={{marginBottom:24}}>
              Preencha seu nome (e o que mais quiser informar). Quando enviar, abrimos uma conversa no WhatsApp da loja já com seu pedido formatado. A gente confirma estoque, frete e te manda o link de pagamento (Pix ou cartão).
            </p>
            <div className="form-grid">
              <Field label="Nome" v={form.nome} onChange={(v)=>setField('nome',v)} full placeholder="Como devemos te chamar?"/>
              <Field label="Telefone (opcional)" v={form.telefone} onChange={(v)=>setField('telefone',v)} placeholder="(11) 99999-9999"/>
              <Field label="CEP (opcional)" v={form.cep} onChange={(v)=>setField('cep',v.replace(/\D/g,''))} placeholder="01310-100"/>
              <Field label="Cidade (opcional)" v={form.cidade} onChange={(v)=>setField('cidade',v)} full placeholder="São Paulo, SP"/>
              <div className="field" style={{gridColumn:'span 2'}}>
                <label>Observações (opcional)</label>
                <textarea
                  value={form.observacoes}
                  onChange={(e)=>setField('observacoes',e.target.value)}
                  placeholder="Algo que queira combinar com a gente — embrulho de presente, ajustes, etc."
                  rows="3"
                  style={{
                    background:'transparent', border:'none', borderBottom:'1px solid var(--rule)',
                    padding:'10px 0', fontFamily:'var(--sans)', fontSize:15, color:'var(--ink)',
                    outline:'none', resize:'vertical', fontFamily:'inherit'
                  }}
                />
              </div>
            </div>

            <button className="btn-primary big" disabled={!canSend} onClick={handleSubmit}>
              <span>Enviar pedido pelo WhatsApp</span><Icon.whatsapp/>
            </button>

            <div className="secure-badges small muted" style={{marginTop:18}}>
              <span>🔒 Sem cartão no site</span>
              <span>Pagamento via Pix/cartão direto com a loja</span>
              <span>Resposta em até 1h em horário comercial</span>
            </div>
          </div>
        </div>

        <aside className="order-summary">
          <h3 className="eyebrow">Resumo do pedido</h3>
          <ul className="summary-items">
            {items.map((it,i) => (
              <li key={i}>
                <div className="summary-img"><img src={it.images[0]} alt={it.name}/><span className="qty">{it.qty}</span></div>
                <div className="summary-meta">
                  <div className="summary-name">{it.name}</div>
                  <div className="small muted">{it.selectedSize && it.selectedSize !== 'único' && 'Tam. ' + it.selectedSize}</div>
                </div>
                <div className="summary-price">{window.formatPrice(it.price*it.qty)}</div>
              </li>
            ))}
          </ul>
          <div className="sum-rows">
            <div className="sum-row"><span>Subtotal</span><span>{window.formatPrice(subtotal)}</span></div>
            <div className="sum-row"><span>Frete</span><span>{freeShip ? 'Grátis 🎉' : 'A calcular'}</span></div>
            <div className="sum-row total"><span>Total</span><span>{window.formatPrice(total)}</span></div>
          </div>
          <p className="small muted" style={{marginTop:12, lineHeight:1.5}}>
            ✦ Pagando por <strong>Pix</strong>: <strong>{window.formatPrice(total*0.95)}</strong> (5% off)<br/>
            ✦ Ou em até <strong>12x</strong> sem juros de {window.formatPrice(total/12)} no cartão
          </p>
        </aside>
      </div>
    </main>
  );
}

function Field({label, v, onChange, type='text', placeholder, full}) {
  return (
    <div className="field" style={full?{gridColumn:'span 2'}:{}}>
      <label>{label}</label>
      <input type={type} value={v} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}/>
    </div>
  );
}
window.CheckoutScreen = CheckoutScreen;

// ─── SUCCESS (WhatsApp aberto) ──────────────────────────────────────────────
function SuccessScreen({ navigate, order }) {
  if (!order) {
    return (
      <main className="screen success">
        <div className="empty-state center">
          <p className="display">Sem pedidos<br/>por aqui.</p>
          <button className="btn-primary" onClick={()=>navigate({name:'home'})}>Voltar à home</button>
        </div>
      </main>
    );
  }

  const reopenWhatsApp = () => {
    const cfg = window.ANALUA_CONFIG || {};
    const number = (cfg.whatsapp || '').replace(/\D/g, '');
    const url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(order.message || '');
    window.open(url, '_blank', 'noopener');
  };

  return (
    <main className="screen success">
      <div className="success-card">
        <span className="eyebrow">✓ pedido enviado</span>
        <h1 className="display"><em>Obrigada</em>,<br/>{(order.form.nome || 'amiga').split(' ')[0]}.</h1>
        <p className="lede-small">
          Abrimos uma conversa no <strong>WhatsApp</strong> com seu pedido formatado. Se não abriu automaticamente, clica no botão abaixo. A gente responde em até 1h em horário comercial.
        </p>

        <div className="success-info">
          <div><span className="eyebrow">Itens</span><strong>{order.items.length}</strong></div>
          <div><span className="eyebrow">Subtotal</span><strong>{window.formatPrice(order.subtotal)}</strong></div>
          <div><span className="eyebrow">Pix</span><strong>{window.formatPrice(order.total*0.95)}</strong></div>
        </div>

        <div className="success-actions">
          <button className="btn-primary" onClick={reopenWhatsApp}>
            <span>Abrir WhatsApp</span><Icon.whatsapp/>
          </button>
          <button className="link-tiny" onClick={()=>navigate({name:'home'})}>← voltar à loja</button>
        </div>

        <div className="success-note small muted">
          Aguarde nossa confirmação no WhatsApp com estoque, frete e link de pagamento (Pix com 5% off ou cartão em até 12x).
        </div>
      </div>
    </main>
  );
}
window.SuccessScreen = SuccessScreen;

Object.assign(window, { HomeScreen, ShopScreen, ProductScreen, AboutScreen, CheckoutScreen, SuccessScreen });
