// Painel admin — analua&co
// Login → lista de produtos → editor → exportar data.js
const { useState, useEffect, useMemo, useRef } = React;

const SESSION_KEY = 'analua_admin_session';
const PRODUCTS_OVERRIDE_KEY = 'analua_products_override';
const COLLECTIONS_OVERRIDE_KEY = 'analua_collections_override';

const IMG_LIST = [
  'identity/page-1.png',
  'identity/page-6-1.png',
  'identity/page-6-2.png',
  'identity/page-6-3.png',
  'identity/page-6-4.png',
  'identity/page-6-5.png',
  'identity/page-6-6.png',
  'identity/page-6-7.png',
  'identity/page-6-8.png',
  'identity/page-6-9.png',
  'identity/page-6-10.png',
  'identity/page-7-1.png',
  'identity/page-7-2.png',
  'identity/page-7-3.png',
];

const CATEGORIES = ['colares', 'aneis', 'pulseiras'];

// ─── LOGIN ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const auth = window.ADMIN_AUTH || {};
    if (email.trim().toLowerCase() === (auth.email || '').toLowerCase() &&
        password === auth.password) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onLogin();
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <div className="brand-mark" style={{textAlign:'center', marginBottom:8, fontSize:32}}>
          ANALUA<em>&co</em>
        </div>
        <div className="eyebrow center" style={{textAlign:'center', marginBottom:24, display:'block'}}>painel admin</div>

        <form onSubmit={submit}>
          <div className="field">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoFocus
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="field" style={{marginTop:18}}>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{
              marginTop:14, padding:'10px 14px', background:'rgba(110,43,43,0.08)',
              borderLeft:'3px solid var(--wine)', color:'var(--wine)', fontSize:13
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary big" style={{marginTop:24}}>
            <span>Entrar</span>
          </button>
        </form>

        <p className="small muted center" style={{marginTop:24, fontSize:12, textAlign:'center'}}>
          Voltar pra <a href="index.html" style={{textDecoration:'underline'}}>loja</a>
        </p>
      </div>
    </main>
  );
}

// ─── ADMIN: LISTA DE PRODUTOS ────────────────────────────────────────────
function ProductList({ products, onEdit, onDelete, onAdd, onLogout, onExport, hasChanges }) {
  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <div className="brand-mark" style={{fontSize:24}}>ANALUA<em>&co</em></div>
          <div className="eyebrow" style={{marginTop:2}}>painel admin</div>
        </div>
        <div className="admin-header-actions">
          <a href="index.html" target="_blank" rel="noopener" className="btn-ghost-sm">Ver loja</a>
          <button className="btn-ghost-sm" onClick={onLogout}>Sair</button>
        </div>
      </header>

      <div className="admin-toolbar">
        <div>
          <h1 className="display" style={{fontSize:36, margin:0}}>Produtos <em>({products.length})</em></h1>
          <p className="small muted" style={{marginTop:4}}>Edite, adicione ou remova peças da loja</p>
        </div>
        <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
          <button className="btn-ghost" onClick={onAdd}>
            + Novo produto
          </button>
          <button className={'btn-primary' + (hasChanges ? '' : ' disabled')}
                  disabled={!hasChanges}
                  onClick={onExport}>
            <span>Exportar data.js</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="admin-unsaved">
          ⚠️ Você tem alterações não publicadas. Clique em <strong>Exportar data.js</strong> e suba o arquivo na Netlify pra publicar.
        </div>
      )}

      <div className="admin-grid">
        {products.map((p) => (
          <div key={p.id} className="admin-card">
            <div className="admin-card-img" style={{backgroundImage: 'url(' + p.images[0] + ')'}}/>
            <div className="admin-card-body">
              <div className="admin-card-name">{p.name}</div>
              <div className="admin-card-meta">
                <span className="admin-pill">{p.category}</span>
                {p.isNew && <span className="admin-pill admin-pill-wine">novo</span>}
                {p.isUnique && <span className="admin-pill admin-pill-wine">única</span>}
              </div>
              <div className="admin-card-price">R$ {p.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <div className="admin-card-actions">
              <button className="btn-ghost-sm" onClick={()=>onEdit(p.id)}>Editar</button>
              <button className="link-tiny" onClick={()=>{
                if (confirm('Tem certeza que quer remover "' + p.name + '"?')) onDelete(p.id);
              }}>remover</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// ─── ADMIN: EDITOR DE PRODUTO ────────────────────────────────────────────
function ProductEditor({ product, onSave, onCancel, onDelete, isNew }) {
  const [form, setForm] = useState(product);

  const set = (k, v) => setForm(prev => ({...prev, [k]: v}));

  const handleSave = () => {
    if (!form.name.trim()) { alert('Nome é obrigatório'); return; }
    if (!form.id.trim()) { alert('ID é obrigatório'); return; }
    if (form.price <= 0) { alert('Preço deve ser maior que 0'); return; }
    if (!form.images || form.images.length === 0 || !form.images[0]) {
      alert('Escolha uma imagem'); return;
    }
    // Normaliza sizes
    const sizes = typeof form.sizes === 'string'
      ? form.sizes.split(',').map(s => s.trim()).filter(Boolean)
      : form.sizes;
    onSave({...form, sizes: sizes.length > 0 ? sizes : ['único']});
  };

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <button className="link-back" onClick={onCancel}>← Voltar pra lista</button>
          <h1 className="display" style={{fontSize:32, margin:'8px 0 0'}}>
            {isNew ? <>Novo <em>produto</em></> : <>Editar <em>peça</em></>}
          </h1>
        </div>
        <div style={{display:'flex', gap:10}}>
          {!isNew && (
            <button className="link-tiny" onClick={() => {
              if (confirm('Remover esse produto?')) onDelete(form.id);
            }}>Remover</button>
          )}
          <button className="btn-ghost-sm" onClick={onCancel}>Cancelar</button>
          <button className="btn-primary" onClick={handleSave}>
            <span>Salvar</span>
          </button>
        </div>
      </header>

      <div className="admin-editor-grid">
        <div className="admin-editor-main">

          <section className="admin-section">
            <h2 className="admin-section-title">Básico</h2>
            <div className="form-grid">
              <Fld label="Nome" v={form.name} onChange={(v)=>set('name', v)} full/>
              <Fld label="ID (slug)" v={form.id} onChange={(v)=>set('id', v.toLowerCase().replace(/[^a-z0-9-]/g,'-'))} placeholder="ex: colar-pearl-charm" full small/>
              <FldSelect label="Categoria" v={form.category} onChange={(v)=>set('category', v)} options={CATEGORIES}/>
              <FldPrice label="Preço" v={form.price} onChange={(v)=>set('price', v)}/>
            </div>
          </section>

          <section className="admin-section">
            <h2 className="admin-section-title">Detalhes da peça</h2>
            <div className="form-grid">
              <FldTextarea label="Descrição" v={form.description} onChange={(v)=>set('description', v)} rows="4" full/>
              <FldTextarea label="Material" v={form.material} onChange={(v)=>set('material', v)} rows="2" placeholder="Ex: Banho ouro 18k · Pedras semipreciosas" full/>
              <Fld label="Medidas" v={form.measure} onChange={(v)=>set('measure', v)} placeholder="Ex: 38 cm + extensor"/>
              <Fld label="Tamanhos" v={typeof form.sizes === 'string' ? form.sizes : form.sizes.join(', ')} onChange={(v)=>set('sizes', v)} placeholder="Ex: 14, 16, 18, 20"/>
              <FldTextarea label="Cuidados" v={form.care} onChange={(v)=>set('care', v)} rows="2" placeholder="Ex: Evite contato com perfume" full/>
            </div>
          </section>

          <section className="admin-section">
            <h2 className="admin-section-title">Status</h2>
            <div style={{display:'flex', gap:24, flexWrap:'wrap'}}>
              <label className="admin-check">
                <input type="checkbox" checked={!!form.isNew} onChange={(e)=>set('isNew', e.target.checked)}/>
                <span>Marcar como <strong>NOVO</strong> (badge no card)</span>
              </label>
              <label className="admin-check">
                <input type="checkbox" checked={!!form.isUnique} onChange={(e)=>set('isUnique', e.target.checked)}/>
                <span>É <strong>PEÇA ÚNICA</strong> (badge no card)</span>
              </label>
            </div>
          </section>
        </div>

        <aside className="admin-editor-side">
          <section className="admin-section">
            <h2 className="admin-section-title">Foto principal</h2>
            <div className="admin-img-preview" style={{backgroundImage: form.images?.[0] ? 'url(' + form.images[0] + ')' : 'none'}}/>
            <p className="small muted" style={{marginTop:12, lineHeight:1.5}}>
              Escolha uma das fotos disponíveis na pasta <code>identity/</code>:
            </p>
            <div className="admin-img-grid">
              {IMG_LIST.map(img => (
                <button
                  key={img}
                  type="button"
                  className={'admin-img-thumb' + (form.images?.[0] === img ? ' on' : '')}
                  style={{backgroundImage: 'url(' + img + ')'}}
                  onClick={()=>set('images', [img])}
                  title={img}
                />
              ))}
            </div>
            <details style={{marginTop:14}}>
              <summary className="small muted" style={{cursor:'pointer'}}>Usar outra imagem (URL ou novo arquivo)</summary>
              <input
                type="text"
                placeholder="ex: identity/minha-foto.png"
                value={form.images?.[0] || ''}
                onChange={(e)=>set('images', [e.target.value])}
                style={{
                  width:'100%', padding:'8px 10px', marginTop:8,
                  background:'transparent', border:'1px solid var(--rule)',
                  fontFamily:'var(--sans)', fontSize:13
                }}
              />
              <p className="small muted" style={{marginTop:6, fontSize:11}}>
                💡 Pra adicionar foto nova: coloque o arquivo na pasta <code>identity/</code> antes
                de publicar, e use o nome dele aqui.
              </p>
            </details>
          </section>
        </aside>
      </div>
    </main>
  );
}

function Fld({label, v, onChange, type='text', placeholder, full, step, small}) {
  return (
    <div className="field" style={full?{gridColumn:'span 2'}:{}}>
      <label>{label}</label>
      <input
        type={type} step={step}
        value={v ?? ''}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        style={small ? {fontFamily:'var(--mono)', fontSize:13} : {}}
      />
    </div>
  );
}
function FldTextarea({label, v, onChange, rows=3, placeholder, full}) {
  return (
    <div className="field" style={full?{gridColumn:'span 2'}:{}}>
      <label>{label}</label>
      <textarea
        rows={rows}
        value={v ?? ''}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background:'transparent', border:'none', borderBottom:'1px solid var(--rule)',
          padding:'10px 0', fontFamily:'var(--sans)', fontSize:15, color:'var(--ink)',
          outline:'none', resize:'vertical', width:'100%'
        }}
      />
    </div>
  );
}
function FldSelect({label, v, onChange, options}) {
  return (
    <div className="field">
      <label>{label}</label>
      <select
        value={v}
        onChange={(e)=>onChange(e.target.value)}
        style={{
          background:'transparent', border:'none', borderBottom:'1px solid var(--rule)',
          padding:'10px 0', fontFamily:'var(--sans)', fontSize:15, color:'var(--ink)',
          outline:'none', width:'100%', cursor:'pointer'
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── INPUT DE PREÇO (R$ com máscara brasileira) ─────────────────────────
function FldPrice({label, v, onChange}) {
  // Mantém texto de exibição local pra permitir digitar "490," sem perder a vírgula
  const [text, setText] = useState(() => formatBRLDisplay(v));
  // Re-sincroniza quando o valor externo muda (ex: ao trocar de produto)
  useEffect(() => { setText(formatBRLDisplay(v)); }, [v]);

  const handleChange = (e) => {
    let val = e.target.value;
    // Aceita só dígitos, vírgula e ponto. Normaliza ponto pra vírgula (decimal BR).
    val = val.replace(/[^\d,.]/g, '').replace(/\./g, ',');
    // Garante no máximo uma vírgula
    const parts = val.split(',');
    if (parts.length > 2) val = parts[0] + ',' + parts.slice(1).join('');
    // Limita casas decimais a 2
    if (val.includes(',')) {
      const [int, dec] = val.split(',');
      val = int + ',' + (dec || '').slice(0, 2);
    }
    setText(val);
    const num = parseFloat(val.replace(',', '.'));
    onChange(isNaN(num) ? 0 : num);
  };

  const handleBlur = () => {
    if (!text || text === ',') { setText(''); return; }
    const num = parseFloat(text.replace(',', '.'));
    if (!isNaN(num)) setText(num.toFixed(2).replace('.', ','));
  };

  return (
    <div className="field">
      <label>{label} (R$)</label>
      <div style={{position:'relative', display:'flex', alignItems:'center', borderBottom:'1px solid var(--rule)'}}>
        <span style={{
          color:'var(--muted)', fontSize:15, fontFamily:'var(--sans)',
          padding:'10px 8px 10px 0', userSelect:'none'
        }}>R$</span>
        <input
          type="text"
          inputMode="decimal"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0,00"
          style={{
            background:'transparent', border:'none', padding:'10px 0',
            fontFamily:'var(--sans)', fontSize:15, color:'var(--ink)',
            outline:'none', flex:1
          }}
        />
        {text && (
          <span style={{
            color:'var(--muted)', fontSize:12, fontFamily:'var(--mono)',
            padding:'10px 0 10px 12px', userSelect:'none'
          }}>
            {(() => {
              const n = parseFloat(text.replace(',', '.'));
              if (isNaN(n) || n <= 0) return '';
              return '12x R$ ' + (n/12).toFixed(2).replace('.', ',');
            })()}
          </span>
        )}
      </div>
    </div>
  );
}

function formatBRLDisplay(n) {
  if (n == null || n === 0) return '';
  return Number(n).toFixed(2).replace('.', ',');
}

// ─── ADMIN APP ──────────────────────────────────────────────────────────
function AdminApp() {
  const [logged, setLogged] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [view, setView] = useState({name: 'list'}); // {name:'list'} | {name:'edit', id} | {name:'new'}
  const [products, setProducts] = useState(() => {
    const override = localStorage.getItem(PRODUCTS_OVERRIDE_KEY);
    if (override) try { return JSON.parse(override); } catch(e) {}
    return JSON.parse(JSON.stringify(window.PRODUCTS_DEFAULT || window.PRODUCTS));
  });
  const [originalProducts] = useState(() => JSON.parse(JSON.stringify(window.PRODUCTS_DEFAULT || window.PRODUCTS)));
  const [collections] = useState(window.COLLECTIONS_DEFAULT || window.COLLECTIONS);

  const hasChanges = useMemo(
    () => JSON.stringify(products) !== JSON.stringify(originalProducts),
    [products, originalProducts]
  );

  // Persiste override no localStorage sempre que muda
  useEffect(() => {
    if (hasChanges) {
      localStorage.setItem(PRODUCTS_OVERRIDE_KEY, JSON.stringify(products));
    } else {
      localStorage.removeItem(PRODUCTS_OVERRIDE_KEY);
    }
  }, [products, hasChanges]);

  if (!logged) {
    return <LoginScreen onLogin={()=>setLogged(true)}/>;
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setLogged(false);
  };

  const onEdit = (id) => setView({name:'edit', id});
  const onAdd = () => setView({name:'new'});
  const onCancel = () => setView({name:'list'});

  const onSave = (data) => {
    setProducts(prev => {
      const ix = prev.findIndex(p => p.id === data.id);
      if (ix >= 0) {
        const copy = [...prev];
        copy[ix] = data;
        return copy;
      }
      return [...prev, data];
    });
    setView({name:'list'});
  };

  const onDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setView({name:'list'});
  };

  const onExport = () => {
    const lines = [];
    lines.push('// Catálogo da analua&co — versão WhatsApp standalone');
    lines.push('// Editado via /admin em ' + new Date().toLocaleString('pt-BR'));
    lines.push('');
    lines.push('window.PRODUCTS = ' + JSON.stringify(products, null, 2) + ';');
    lines.push('');
    lines.push('window.COLLECTIONS = ' + JSON.stringify(collections, null, 2) + ';');
    lines.push('');
    lines.push("window.HERO_IMAGE = '" + (window.HERO_IMAGE || 'identity/page-1.png') + "';");
    lines.push("window.STORY_IMAGE = '" + (window.STORY_IMAGE || 'identity/page-6-5.png') + "';");
    lines.push("window.EDITORIAL_IMAGE = '" + (window.EDITORIAL_IMAGE || 'identity/page-7-2.png') + "';");
    lines.push("window.ABOUT_BLEED_IMAGE = '" + (window.ABOUT_BLEED_IMAGE || 'identity/page-6-9.png') + "';");
    lines.push('');
    lines.push("window.CATEGORIES = [{id:'todos',name:'Tudo'},{id:'colares',name:'Colares'},{id:'aneis',name:'Anéis'},{id:'pulseiras',name:'Pulseiras'}];");
    lines.push("window.MATERIALS = ['Banho ouro 18k', 'Prata 925', 'Pedras naturais', 'Vintage'];");
    lines.push('');
    lines.push("window.formatPrice = (n) => 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.');");
    lines.push("window.formatInstallment = (n) => { const value = (n / 12); return '12x de ' + window.formatPrice(value); };");
    const content = lines.join('\n');

    const blob = new Blob([content], {type: 'application/javascript'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      alert(
        '✓ data.js baixado!\n\n' +
        'Próximo passo pra publicar:\n' +
        '1. Vá em https://app.netlify.com\n' +
        '2. Abra o site\n' +
        '3. Clique na pasta src/\n' +
        '4. Substitua o data.js antigo pelo novo\n\n' +
        'Depois disso, as alterações vão aparecer pra todos.'
      );
    }, 200);
  };

  if (view.name === 'edit') {
    const product = products.find(p => p.id === view.id);
    if (!product) { setView({name:'list'}); return null; }
    return (
      <ProductEditor
        product={product}
        isNew={false}
        onSave={onSave}
        onDelete={onDelete}
        onCancel={onCancel}
      />
    );
  }
  if (view.name === 'new') {
    const blank = {
      id: '',
      name: '',
      category: 'colares',
      price: 0,
      description: '',
      material: '',
      measure: '',
      care: '',
      sizes: ['único'],
      images: [''],
      isNew: true,
      isUnique: false,
    };
    return (
      <ProductEditor
        product={blank}
        isNew={true}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={()=>{}}
      />
    );
  }
  return (
    <ProductList
      products={products}
      onEdit={onEdit}
      onAdd={onAdd}
      onDelete={onDelete}
      onLogout={logout}
      onExport={onExport}
      hasChanges={hasChanges}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminApp/>);
