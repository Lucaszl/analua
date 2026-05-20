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
function Header({ route, navigate, cartCount, onOpenCart, onOpenSearch, user, onOpenAuth, onOpenUserMenu }) {
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
          {user ? (
            <button className="icon-btn user-btn desktop-only" aria-label={'Conta de ' + (user.nome || user.email)} onClick={onOpenUserMenu} title={user.nome || user.email}>
              <Icon.user />
              <span className="user-btn-dot" aria-hidden="true"/>
            </button>
          ) : (
            <button className="icon-btn desktop-only" aria-label="Entrar / Cadastrar" onClick={onOpenAuth}><Icon.user /></button>
          )}
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

// ─── AUTH (LOGIN / CADASTRO DO CLIENTE) ─────────────────────────────────────
const AUTH_STORAGE_KEY = 'analua_customer_account';

// Hash SHA-256 simples (suficiente pra esse caso — não é Fort Knox)
async function hashPassword(password) {
  if (!password) return '';
  const data = new TextEncoder().encode(password + 'analua-salt-v1');
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

window.getCurrentUser = function() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw);
    if (u.loggedIn) return u;
    return null;
  } catch(e) { return null; }
};

window.logoutUser = function() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const u = JSON.parse(raw);
      u.loggedIn = false;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
    }
  } catch(e) {}
};

function AuthModal({ open, mode, onClose, onLoggedIn }) {
  const [tab, setTab] = useState(mode || 'login');  // 'login' | 'register'
  const [form, setForm] = useState({
    email:'', password:'', confirm:'',
    nome:'', telefone:'', cep:'', cidade:''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setTab(mode || 'login');
      setForm({ email:'', password:'', confirm:'', nome:'', telefone:'', cep:'', cidade:'' });
      setError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const set = (k,v) => setForm(prev => ({...prev, [k]: v}));

  const handleLogin = async () => {
    setError('');
    if (!form.email || !form.password) { setError('Preencha e-mail e senha.'); return; }
    setLoading(true);
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) {
        setError('Conta não encontrada. Cadastre-se primeiro.');
        setLoading(false); return;
      }
      const stored = JSON.parse(raw);
      const hash = await hashPassword(form.password);
      if (stored.email.toLowerCase() !== form.email.trim().toLowerCase() ||
          stored.passwordHash !== hash) {
        setError('E-mail ou senha incorretos.');
        setLoading(false); return;
      }
      stored.loggedIn = true;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));
      onLoggedIn(stored);
    } catch(e) { setError('Erro: ' + e.message); }
    setLoading(false);
  };

  const handleRegister = async () => {
    setError('');
    if (!form.nome.trim()) { setError('Preencha seu nome.'); return; }
    if (!form.email.trim()) { setError('Preencha um e-mail.'); return; }
    if (!form.email.includes('@')) { setError('E-mail inválido.'); return; }
    if (form.password.length < 6) { setError('Senha precisa ter pelo menos 6 caracteres.'); return; }
    if (form.password !== form.confirm) { setError('Senhas não conferem.'); return; }
    setLoading(true);
    try {
      const hash = await hashPassword(form.password);
      const user = {
        email: form.email.trim().toLowerCase(),
        nome: form.nome.trim(),
        telefone: form.telefone.trim(),
        cep: (form.cep || '').replace(/\D/g, ''),
        cidade: form.cidade.trim(),
        passwordHash: hash,
        loggedIn: true,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      onLoggedIn(user);
    } catch(e) { setError('Erro: ' + e.message); }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <React.Fragment>
      <div className="auth-scrim" onClick={onClose}/>
      <div className="auth-modal" role="dialog" aria-modal="true">
        <button className="auth-close icon-btn" onClick={onClose} aria-label="Fechar"><Icon.close/></button>

        <div className="auth-head">
          <div className="brand-mark" style={{fontSize:24, textAlign:'center', marginBottom:6}}>ANALUA<em>&co</em></div>
          <div className="eyebrow" style={{textAlign:'center', display:'block'}}>sua conta</div>
        </div>

        <div className="auth-tabs">
          <button className={'auth-tab ' + (tab==='login'?'on':'')} onClick={()=>{setTab('login');setError('');}}>
            Entrar
          </button>
          <button className={'auth-tab ' + (tab==='register'?'on':'')} onClick={()=>{setTab('register');setError('');}}>
            Cadastrar
          </button>
        </div>

        <div className="auth-body">
          {tab === 'login' && (
            <form onSubmit={(e)=>{e.preventDefault();handleLogin();}} className="auth-form">
              <div className="field">
                <label>E-mail</label>
                <input type="email" value={form.email} onChange={(e)=>set('email',e.target.value)} autoFocus required/>
              </div>
              <div className="field" style={{marginTop:14}}>
                <label>Senha</label>
                <input type="password" value={form.password} onChange={(e)=>set('password',e.target.value)} required/>
              </div>
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="btn-primary big" disabled={loading} style={{marginTop:20}}>
                <span>{loading ? 'Entrando...' : 'Entrar'}</span>
                {!loading && <Icon.arrow/>}
              </button>
              <p className="small muted center" style={{marginTop:16, textAlign:'center'}}>
                Sem conta? <a href="#" onClick={(e)=>{e.preventDefault();setTab('register');setError('');}} style={{textDecoration:'underline', color:'var(--wine)'}}>cadastra-se aqui</a>
              </p>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={(e)=>{e.preventDefault();handleRegister();}} className="auth-form">
              <div className="field">
                <label>Nome</label>
                <input type="text" value={form.nome} onChange={(e)=>set('nome',e.target.value)} autoFocus required placeholder="Como gostaria de ser chamada?"/>
              </div>
              <div className="field" style={{marginTop:14}}>
                <label>E-mail</label>
                <input type="email" value={form.email} onChange={(e)=>set('email',e.target.value)} required/>
              </div>
              <div className="field" style={{marginTop:14}}>
                <label>Senha (mínimo 6 caracteres)</label>
                <input type="password" value={form.password} onChange={(e)=>set('password',e.target.value)} required minLength="6"/>
              </div>
              <div className="field" style={{marginTop:14}}>
                <label>Confirmar senha</label>
                <input type="password" value={form.confirm} onChange={(e)=>set('confirm',e.target.value)} required/>
              </div>

              <details style={{marginTop:14}}>
                <summary className="small muted" style={{cursor:'pointer', textDecoration:'underline'}}>Adicionar telefone/endereço agora (opcional)</summary>
                <div style={{marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
                  <div className="field" style={{gridColumn:'span 2'}}>
                    <label>WhatsApp</label>
                    <input type="text" value={form.telefone} onChange={(e)=>set('telefone',e.target.value)} placeholder="(11) 99999-9999"/>
                  </div>
                  <div className="field">
                    <label>CEP</label>
                    <input type="text" value={form.cep} onChange={(e)=>set('cep',e.target.value.replace(/\D/g,''))} placeholder="01310100" maxLength="8"/>
                  </div>
                  <div className="field">
                    <label>Cidade/UF</label>
                    <input type="text" value={form.cidade} onChange={(e)=>set('cidade',e.target.value)} placeholder="São Paulo, SP"/>
                  </div>
                </div>
              </details>

              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="btn-primary big" disabled={loading} style={{marginTop:20}}>
                <span>{loading ? 'Criando conta...' : 'Criar conta'}</span>
                {!loading && <Icon.arrow/>}
              </button>
              <p className="small muted" style={{marginTop:14, lineHeight:1.5, fontSize:12, textAlign:'center'}}>
                Sua conta fica salva nesse navegador. Pra acessar de outro dispositivo, cadastre-se de novo lá.
              </p>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
window.AuthModal = AuthModal;

// ─── USER MENU (drop quando logado) ─────────────────────────────────────────
function UserMenu({ open, user, onClose, onLogout, onMyOrders }) {
  if (!open) return null;
  return (
    <React.Fragment>
      <div className="user-menu-scrim" onClick={onClose}/>
      <div className="user-menu">
        <div className="user-menu-head">
          <div className="eyebrow">conectada como</div>
          <div className="user-menu-name">{user.nome || user.email}</div>
          {user.email && user.nome && <div className="small muted">{user.email}</div>}
        </div>
        <button className="user-menu-item" onClick={onLogout}>
          Sair da conta
        </button>
      </div>
    </React.Fragment>
  );
}
window.UserMenu = UserMenu;

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
