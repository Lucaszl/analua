// Componentes compartilhados — analua&co
// Header, Footer, ProductCard, CartDrawer, Icons

const { useState, useEffect, useRef, useMemo } = React;

// ─── ICONS ──────────────────────────────────────────────────────────────────
const Icon = {
  search: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  ),
  bag: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 8h14l-1.2 11.4a2 2 0 0 1-2 1.6H8.2a2 2 0 0 1-2-1.6L5 8z"/>
      <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
    </svg>
  ),
  user: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="9" r="3.5"/><path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5"/>
    </svg>
  ),
  menu: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16"/>
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  heart: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.8 6.6a5.4 5.4 0 0 0-9.1-2.4l-.2.2-.2-.2a5.4 5.4 0 1 0-7.6 7.6l7.8 7.8 7.8-7.8a5.4 5.4 0 0 0 1.5-5.2z"/>
    </svg>
  ),
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...p}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.1-3.6-.3-.5.3-.5.8-1.6 0-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.6-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.7 1.2 3c.1.2 2 3.1 5 4.4 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 2-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2.2A9.8 9.8 0 0 0 3.4 17l-1.3 4.7 4.8-1.3A9.8 9.8 0 1 0 12 2.2z"/>
    </svg>
  ),
};
window.Icon = Icon;

// ─── HEADER ─────────────────────────────────────────────────────────────────
function Header({ route, navigate, cartCount, onOpenCart, onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'site-header ' + (scrolled ? 'scrolled' : '')}>
      <div className="header-bar">
        <button className="icon-btn mobile-only" aria-label="menu"><Icon.menu /></button>

        <nav className="header-nav desktop-only">
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'todos'})}}>Loja</a>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'colares'})}}>Colares</a>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'aneis'})}}>Anéis</a>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'pulseiras'})}}>Pulseiras</a>
        </nav>

        <a href="#" className="brand-mark" onClick={(e)=>{e.preventDefault();navigate({name:'home'})}}>
          <span className="brand-mark-text">ANALUA<em>&co</em></span>
        </a>

        <div className="header-actions">
          <a href="#" className="header-link desktop-only" onClick={(e)=>{e.preventDefault();navigate({name:'about'})}}>Sobre</a>
          <button className="icon-btn" aria-label="buscar" onClick={onOpenSearch}><Icon.search /></button>
          <button className="icon-btn desktop-only" aria-label="conta"><Icon.user /></button>
          <button className="icon-btn cart-btn" aria-label="sacola" onClick={onOpenCart}>
            <Icon.bag />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
      {window.ANALUA_CONFIG && window.ANALUA_CONFIG.showMarquee && (
        <div className="marquee">
          <div className="marquee-track">
            <span>Frete grátis acima de R$ 499 · </span>
            <span>Parcele em até 12x sem juros · </span>
            <span>Cada peça é única, garimpada à mão · </span>
            <span>Atendimento via WhatsApp · </span>
            <span>Frete grátis acima de R$ 499 · </span>
            <span>Parcele em até 12x sem juros · </span>
            <span>Cada peça é única, garimpada à mão · </span>
            <span>Atendimento via WhatsApp · </span>
          </div>
        </div>
      )}
    </header>
  );
}
window.Header = Header;

// ─── PRODUCT CARD ───────────────────────────────────────────────────────────
function ProductCard({ product, onClick }) {
  return (
    <a className="pcard" href="#" onClick={(e)=>{e.preventDefault();onClick(product)}}>
      <div className="pcard-imgwrap">
        <img src={product.images[0]} alt={product.name} loading="lazy"/>
        {product.isNew && <span className="badge-new">novo</span>}
        {product.isUnique && <span className="badge-unique">peça única</span>}
        <button className="pcard-fav" aria-label="favoritar" onClick={(e)=>{e.preventDefault();e.stopPropagation()}}>
          <Icon.heart width="16" height="16"/>
        </button>
      </div>
      <div className="pcard-meta">
        <h3 className="pcard-name">{product.name}</h3>
        <div className="pcard-price">{window.formatPrice(product.price)}</div>
        <div className="pcard-installment">12x de {window.formatPrice(product.price/12)}</div>
      </div>
    </a>
  );
}
window.ProductCard = ProductCard;

// ─── CART DRAWER ────────────────────────────────────────────────────────────
function CartDrawer({ open, items, onClose, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const freeShip = subtotal >= 499;
  const toFreeShip = Math.max(0, 499 - subtotal);
  const progress = Math.min(100, (subtotal / 499) * 100);

  return (
    <React.Fragment>
      <div className={'drawer-scrim ' + (open ? 'on' : '')} onClick={onClose}/>
      <aside className={'drawer ' + (open ? 'on' : '')} aria-hidden={!open}>
        <div className="drawer-head">
          <span className="eyebrow">Sua sacola <em>({items.length})</em></span>
          <button className="icon-btn" onClick={onClose} aria-label="fechar"><Icon.close/></button>
        </div>

        {items.length > 0 && (
          <div className="ship-progress">
            <div className="ship-progress-bar"><div style={{width: progress+'%'}}/></div>
            <div className="ship-progress-text">
              {freeShip ? '✓ Frete grátis liberado' : <span>Faltam <strong>{window.formatPrice(toFreeShip)}</strong> para frete grátis</span>}
            </div>
          </div>
        )}

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p className="eyebrow" style={{marginBottom:14}}>sacola vazia</p>
              <p className="empty-cart-display">Sua próxima<br/><em>peça favorita</em><br/>está esperando.</p>
              <button className="btn-ghost" onClick={onClose}>Explorar a loja</button>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map((it, idx) => (
                <li key={it.id+idx} className="cart-item">
                  <div className="cart-item-img"><img src={it.images[0]} alt={it.name}/></div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{it.name}</div>
                    <div className="cart-item-variant small">{it.selectedSize ? 'Tamanho ' + it.selectedSize : 'Único'}</div>
                    <div className="cart-item-bottom">
                      <div className="qty-stepper">
                        <button onClick={()=>onUpdateQty(idx, it.qty-1)} aria-label="diminuir">−</button>
                        <span>{it.qty}</span>
                        <button onClick={()=>onUpdateQty(idx, it.qty+1)} aria-label="aumentar">+</button>
                      </div>
                      <div className="cart-item-price">{window.formatPrice(it.price * it.qty)}</div>
                    </div>
                    <button className="link-tiny" onClick={()=>onRemove(idx)}>remover</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="sub-row">
              <span>Subtotal</span>
              <span>{window.formatPrice(subtotal)}</span>
            </div>
            <div className="sub-row small muted">
              <span>Frete calculado no checkout</span>
            </div>
            <button className="btn-primary" onClick={onCheckout}>
              <span>Finalizar compra</span>
              <Icon.arrow/>
            </button>
            <div className="small muted center" style={{marginTop:10}}>Pedido enviado via <strong>WhatsApp</strong> — Pix ou cartão direto com a loja</div>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}
window.CartDrawer = CartDrawer;

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">ANALUA<em>&co</em></div>
          <p className="small muted">Joalheria autoral, charms vintage, garimpo curado. Cada peça atravessou o mundo antes de chegar até você.</p>
          <a className="wa-link"
             href={(() => {
               const cfg = window.ANALUA_CONFIG || {};
               const num = (cfg.whatsapp || '').replace(/\D/g, '');
               if (!num) return '#';
               return 'https://wa.me/' + num + '?text=' + encodeURIComponent('Olá! Vim do site da ' + (cfg.storeName || 'analua&co') + '.');
             })()}
             target="_blank" rel="noopener">
            <Icon.whatsapp/> Falar no WhatsApp
          </a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Loja</div>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'colares'})}}>Colares</a>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'aneis'})}}>Anéis</a>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'pulseiras'})}}>Pulseiras</a>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'shop',category:'todos'})}}>Todas as peças</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">A casa</div>
          <a href="#" onClick={(e)=>{e.preventDefault();navigate({name:'about'})}}>Sobre</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Diário</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Cuidados com a joia</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Contato</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Institucional</div>
          <a href="#" onClick={(e)=>e.preventDefault()}>Trocas e devoluções</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Política de privacidade</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Termos de uso</a>
          <a href="#" onClick={(e)=>e.preventDefault()}>Entrega</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Newsletter</div>
          <p className="small muted" style={{marginBottom:12}}>Garimpos novos, lançamentos e descontos exclusivos.</p>
          <form className="newsletter" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder="seu e-mail"/>
            <button aria-label="inscrever"><Icon.arrow width="16" height="16"/></button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} analua&amp;co — todos os direitos reservados</span>
        <span>Feito em São Paulo</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;

// ─── HERO IMAGE (for product galleries) ─────────────────────────────────────
function ProductGallery({ images, name }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="pgallery">
      <div className="pgallery-main">
        <img src={images[idx]} alt={name}/>
      </div>
      {images.length > 1 && (
        <div className="pgallery-thumbs">
          {images.map((src, i) => (
            <button key={i} className={'pthumb ' + (i===idx?'on':'')} onClick={()=>setIdx(i)} aria-label={'foto ' + (i+1)}>
              <img src={src} alt=""/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
window.ProductGallery = ProductGallery;

// ─── SEARCH OVERLAY ─────────────────────────────────────────────────────────
function SearchOverlay({ open, products, onClose, navigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // ESC fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Filtra produtos pela query (nome, descrição, material, categoria)
  const results = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const norm = (s) => (s || '').toString().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
    const nq = norm(q);
    return products.filter(p => {
      const hay = [p.name, p.description, p.material, p.category].map(norm).join(' ');
      return hay.includes(nq);
    }).slice(0, 12);
  }, [products, query]);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Buscar produtos">
      <div className="search-head">
        <div className="search-input-wrap">
          <Icon.search/>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Buscar peças, materiais, categorias…"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            autoComplete="off"
          />
          <button className="icon-btn" onClick={onClose} aria-label="fechar"><Icon.close/></button>
        </div>
      </div>

      <div className="search-body">
        {!query.trim() && (
          <div className="search-empty">
            <p className="eyebrow">comece a digitar…</p>
            <p className="search-hint">
              Tente <em>"colar"</em>, <em>"prata"</em>, <em>"anel"</em>, <em>"pérola"</em> ou o nome de uma peça.
            </p>
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="search-empty">
            <p className="display" style={{fontSize:'clamp(32px,4vw,48px)'}}>
              Nada encontrado<br/>com <em>"{query}"</em>.
            </p>
            <p className="small muted">Que tal explorar todas as <a href="#" onClick={(e)=>{e.preventDefault();onClose();navigate({name:'shop',category:'todos'});}} style={{textDecoration:'underline'}}>peças disponíveis</a>?</p>
          </div>
        )}

        {results.length > 0 && (
          <React.Fragment>
            <div className="search-meta">{results.length} {results.length === 1 ? 'resultado' : 'resultados'} pra "{query}"</div>
            <div className="search-results">
              {results.map(p => (
                <a key={p.id} className="search-result" href="#"
                   onClick={(e)=>{e.preventDefault();onClose();navigate({name:'product',id:p.id});}}>
                  <div className="search-result-img"><img src={p.images[0]} alt={p.name}/></div>
                  <div className="search-result-info">
                    <div className="eyebrow">{p.category}</div>
                    <div className="search-result-name">{p.name}</div>
                    <div className="search-result-price">{window.formatPrice(p.price)}</div>
                  </div>
                </a>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
window.SearchOverlay = SearchOverlay;

Object.assign(window, { Icon, Header, ProductCard, CartDrawer, Footer, ProductGallery, SearchOverlay });
