// App root — analua&co
const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "displayFont": "cormorant",
  "density": "regular",
  "showMarquee": true,
  "heroLayout": "split"
}/*EDITMODE-END*/;

const PALETTES = {
  cream:   { bg:'#F2EAD8', bg2:'#E9DDC5', paper:'#F8F1E0', ink:'#1B140C', ink2:'#3A2F22', muted:'#7C6A55', rule:'#D3C19E', wine:'#6E2B2B', gold:'#A88542' },
  blanc:   { bg:'#FBF7EE', bg2:'#F0E9DA', paper:'#FFFFFF', ink:'#0F0E0B', ink2:'#3A352C', muted:'#7A7468', rule:'#E0D9C7', wine:'#6E2B2B', gold:'#A88542' },
  dusk:    { bg:'#2C2118', bg2:'#3A2D20', paper:'#382B1F', ink:'#F2EAD8', ink2:'#D8C8AA', muted:'#A89478', rule:'#5A4631', wine:'#D29A6A', gold:'#E0B97A' },
  rose:    { bg:'#F4E6DC', bg2:'#EAD4C2', paper:'#FBF1E8', ink:'#2A1410', ink2:'#4A2620', muted:'#856059', rule:'#D9BBA8', wine:'#7C2D2D', gold:'#B57F4F' },
};

const DISPLAY_FONTS = {
  cormorant: '"Cormorant Garamond", "Times New Roman", serif',
  playfair:  '"Playfair Display", "Times New Roman", serif',
  italiana:  '"Italiana", "Times New Roman", serif',
};

function applyTokens(palette, displayFont) {
  const p = PALETTES[palette] || PALETTES.cream;
  const root = document.documentElement;
  Object.entries(p).forEach(([k,v]) => root.style.setProperty('--' + k, v));
  root.style.setProperty('--display', DISPLAY_FONTS[displayFont] || DISPLAY_FONTS.cormorant);
}

function App() {
  const [t, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, ()=>{}];
  const [route, setRoute] = useStateA({ name: 'home' });
  const [cart, setCart] = useStateA([]);
  const [cartOpen, setCartOpen] = useStateA(false);
  const [searchOpen, setSearchOpen] = useStateA(false);
  const [order, setOrder] = useStateA(null);

  // Apply tokens when tweaks change
  useEffectA(() => {
    applyTokens(t.palette, t.displayFont);
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.marquee = t.showMarquee ? 'on' : 'off';
  }, [t.palette, t.displayFont, t.density, t.showMarquee]);

  const navigate = (r) => {
    setRoute(r);
    setCartOpen(false);
    setSearchOpen(false);
    window.scrollTo({top:0, behavior:'auto'});
  };

  const addToCart = (item) => {
    setCart(prev => {
      const ix = prev.findIndex(p => p.id === item.id && p.selectedSize === item.selectedSize);
      if (ix >= 0) {
        const copy = [...prev];
        copy[ix] = {...copy[ix], qty: copy[ix].qty + (item.qty || 1)};
        return copy;
      }
      return [...prev, item];
    });
    setTimeout(()=>setCartOpen(true), 200);
  };

  const updateQty = (idx, qty) => {
    if (qty <= 0) return removeItem(idx);
    setCart(prev => prev.map((it,i) => i===idx ? {...it, qty} : it));
  };
  const removeItem = (idx) => setCart(prev => prev.filter((_,i) => i !== idx));

  const cartCount = cart.reduce((s,i)=>s+i.qty, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate({name:'checkout'});
  };

  const handleOrderSubmit = (o) => {
    setOrder(o);
    setCart([]);
    navigate({name:'success'});
  };

  let screen;
  switch (route.name) {
    case 'home':     screen = <HomeScreen navigate={navigate} onAddToCart={addToCart} products={window.PRODUCTS} collections={window.COLLECTIONS}/>; break;
    case 'shop':     screen = <ShopScreen navigate={navigate} route={route} products={window.PRODUCTS}/>; break;
    case 'product':  screen = <ProductScreen navigate={navigate} route={route} products={window.PRODUCTS} onAddToCart={addToCart}/>; break;
    case 'about':    screen = <AboutScreen navigate={navigate}/>; break;
    case 'checkout': screen = <CheckoutScreen navigate={navigate} items={cart} onSubmit={handleOrderSubmit}/>; break;
    case 'success':  screen = <SuccessScreen navigate={navigate} order={order}/>; break;
    default:         screen = <HomeScreen navigate={navigate} onAddToCart={addToCart} products={window.PRODUCTS} collections={window.COLLECTIONS}/>;
  }

  return (
    <div className="app" data-screen-label={route.name}>
      <Header route={route} navigate={navigate} cartCount={cartCount}
              onOpenCart={()=>setCartOpen(true)}
              onOpenSearch={()=>setSearchOpen(true)}/>
      {screen}
      <Footer navigate={navigate}/>
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={()=>setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />

      <SearchOverlay
        open={searchOpen}
        products={window.PRODUCTS}
        onClose={()=>setSearchOpen(false)}
        navigate={navigate}
      />

      {/* Floating WhatsApp — abre conversa direta */}
      <a className="wa-fab"
         href={(() => {
           const cfg = window.ANALUA_CONFIG || {};
           const number = (cfg.whatsapp || '').replace(/\D/g, '');
           if (!number) return '#';
           const msg = 'Olá! Vim do site da ' + (cfg.storeName || 'analua&co') + ' e tenho uma pergunta.';
           return 'https://wa.me/' + number + '?text=' + encodeURIComponent(msg);
         })()}
         target="_blank"
         rel="noopener"
         aria-label="WhatsApp">
        <Icon.whatsapp/>
      </a>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
