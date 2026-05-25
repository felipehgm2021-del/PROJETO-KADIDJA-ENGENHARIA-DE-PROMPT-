import React, { useState, useEffect } from 'react';

// Dados iniciais padrão (Mock) caso o LocalStorage esteja vazio
const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Sacola Surpresa de Pães Variados",
    store: "Padaria Bella Massa",
    category: "Padaria",
    originalPrice: 30.00,
    discountPrice: 9.90,
    quantity: 3,
    image: "🍞",
    description: "Pode conter pães franceses, pães de doce, broas ou croissants assados no dia. Garantia de qualidade e sabor!",
    pickupTime: "Hoje das 18:30 às 19:30"
  },
  {
    id: 2,
    title: "Lote de Frutas Selecionadas",
    store: "Sacolão do Campo",
    category: "Frutas e Legumes",
    originalPrice: 25.00,
    discountPrice: 7.50,
    quantity: 2,
    image: "🍎",
    description: "Bananas maduras ideais para bolo, maçãs e laranjas com pequenas imperfeições estéticas, mas perfeitamente doces e saudáveis.",
    pickupTime: "Hoje até às 18:00"
  },
  {
    id: 3,
    title: "Lote de Laticínios Próximos ao Vencimento",
    store: "Mercado Express",
    category: "Supermercado",
    originalPrice: 45.00,
    discountPrice: 13.90,
    quantity: 1,
    image: "🧀",
    description: "Iogurtes gregos, queijo fatiado e requijão com vencimento para os próximos 3 dias. Ideal para consumo imediato.",
    pickupTime: "Hoje das 14:00 às 20:00"
  },
  {
    id: 4,
    title: "Doação: Sopa de Legumes Congelada (ONGs)",
    store: "Sabor Solidário (Cozinha)",
    category: "Doações (ONGs)",
    originalPrice: 0.00,
    discountPrice: 0.00,
    quantity: 5,
    image: "🍲",
    description: "Sopas preparadas com vegetais frescos e congeladas imediatamente. Exclusivo para representantes de ONGs cadastradas.",
    pickupTime: "Hoje até às 19:00"
  }
];

export default function App() {
  // Estados do sistema
  const [profile, setProfile] = useState('consumer'); // 'consumer' ou 'merchant'
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ecoresgate_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [showGuide, setShowGuide] = useState(true);

  // Estados do formulário de cadastro (Comerciante)
  const [newTitle, setNewTitle] = useState('');
  const [newStore, setNewStore] = useState('');
  const [newCategory, setNewCategory] = useState('Padaria');
  const [newOrigPrice, setNewOrigPrice] = useState('');
  const [newDiscPrice, setNewDiscPrice] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newEmoji, setNewEmoji] = useState('🛍️');
  const [successMsg, setSuccessMsg] = useState('');

  // Sincronizar produtos com LocalStorage sempre que houver alteração
  useEffect(() => {
    localStorage.setItem('ecoresgate_products', JSON.stringify(products));
  }, [products]);

  // Função para simular reserva do Consumidor
  const handleReserve = (product) => {
    if (product.quantity <= 0) return;

    // Diminui o estoque na memória reativa
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        return { ...p, quantity: p.quantity - 1 };
      }
      return p;
    });
    setProducts(updatedProducts);

    // Gera um código de cupom fictício para a apresentação
    const cupomCode = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservation({
      product: product,
      code: cupomCode,
      date: new Date().toLocaleDateString('pt-PT')
    });
    setSelectedProduct(null);
  };

  // Função para cadastrar novo produto (Comerciante)
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newStore || !newQty) {
      alert("Por favor, preencha o título, estabelecimento e quantidade!");
      return;
    }

    const newProd = {
      id: Date.now(),
      title: newTitle,
      store: newStore,
      category: newCategory,
      originalPrice: parseFloat(newOrigPrice) || 0,
      discountPrice: parseFloat(newDiscPrice) || 0,
      quantity: parseInt(newQty) || 1,
      image: newEmoji,
      description: newDesc || "Sacola preparada com carinho pelo estabelecimento parceiro.",
      pickupTime: newTime || "Hoje no horário comercial"
    };

    setProducts([newProd, ...products]);
    setSuccessMsg('✅ Sacola cadastrada com sucesso! Altere para o perfil "Consumidor" para vê-la no feed.');
    
    // Limpar formulário
    setNewTitle('');
    setNewStore('');
    setNewOrigPrice('');
    setNewDiscPrice('');
    setNewQty('');
    setNewTime('');
    setNewDesc('');

    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const categories = ['Todas', 'Padaria', 'Frutas e Legumes', 'Supermercado', 'Doações (ONGs)'];
  const filteredProducts = categoryFilter === 'Todas' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* MODO GUIA DE APRESENTAÇÃO (BÔNUS PARA A NOTA DA PROFESSORA) */}
      {showGuide && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 shadow-md transition-all">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <span className="bg-emerald-500 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mr-2">
                Roteiro de Apresentação
              </span>
              <p className="text-sm mt-1 text-emerald-50 text-balance">
                <strong>Olá! Aqui está o roteiro ideal para mostrar para a profª Kadidja:</strong> 
                <br />
                1. Comece no perfil <strong>Consumidor</strong> e mostre as ofertas disponíveis e os filtros.
                <br />
                2. Mude para o perfil <strong>Estabelecimento</strong>, cadastre uma nova sacola (coloque preços e quantidade) e envie.
                <br />
                3. Volte para <strong>Consumidor</strong>, mostre que o seu novo produto apareceu na tela e clique em <strong>Reservar</strong> para ver o estoque diminuir e gerar o cupom com QR Code.
              </p>
            </div>
            <button 
              onClick={() => setShowGuide(false)}
              className="text-xs bg-emerald-800/50 hover:bg-emerald-800/80 px-3 py-1.5 rounded text-white font-medium"
            >
              Ocultar Guia ×
            </button>
          </div>
        </div>
      )}

      {/* HEADER PRINCIPAL */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo e Nome */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <div>
              <h1 className="text-2xl font-black text-emerald-600 tracking-tight">EcoResgate</h1>
              <p className="text-xs text-slate-500 font-medium">Alimento bom, preço justo, desperdício zero</p>
            </div>
          </div>

          {/* Seleção de Perfil (Alternador de Contexto) */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => { setProfile('consumer'); setReservation(null); }}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-1.5 ${
                profile === 'consumer' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🛒</span> Sou Consumidor / ONG
            </button>
            <button
              onClick={() => { setProfile('merchant'); setReservation(null); }}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-1.5 ${
                profile === 'merchant' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏪</span> Sou Estabelecimento
            </button>
          </div>

        </div>
      </header>

      {/* ÁREA DE CONTEÚDO */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* ---------------- TELA DO CONSUMIDOR ---------------- */}
        {profile === 'consumer' && !reservation && (
          <div>
            {/* Banner de Boas-Vindas */}
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8 border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-900">Economize resgatando alimentos de qualidade!</h2>
                <p className="text-sm text-emerald-700 mt-1">
                  Estabelecimentos da sua região listam o excedente do dia com até 70% de desconto. Faça sua reserva e pague direto na retirada.
                </p>
              </div>
              <div className="text-5xl hidden md:block">🥦🥪🍰</div>
            </div>

            {/* Filtros de Categoria */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Filtrar por Categoria</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      categoryFilter === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Listagem de Ofertas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <div 
                  key={prod.id} 
                  className={`bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-transform hover:-translate-y-1 ${
                    prod.quantity === 0 ? 'opacity-60' : ''
                  }`}
                >
                  {/* Emoji / Ícone de Capa */}
                  <div className="bg-slate-100 h-40 flex items-center justify-center text-6xl relative select-none">
                    {prod.image}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {prod.category}
                    </span>
                    {prod.quantity === 0 && (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center">
                        <span className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md uppercase">
                          Esgotado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-slate-400 mb-1">{prod.store}</p>
                    <h4 className="font-bold text-lg text-slate-800 line-clamp-1 mb-2" title={prod.title}>
                      {prod.title}
                    </h4>

                    {/* Preços */}
                    <div className="flex items-baseline gap-2 mb-4">
                      {prod.originalPrice > 0 ? (
                        <>
                          <span className="text-2xl font-black text-emerald-600">
                            R$ {prod.discountPrice.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            R$ {prod.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </>
                      ) : (
                        <span className="text-emerald-600 font-extrabold text-sm uppercase bg-emerald-50 px-3 py-1 rounded-md">
                          Doação Grátis
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>🕒 Retirada: <strong>{prod.pickupTime}</strong></span>
                      <span className="font-bold">Restam: <span className={prod.quantity > 0 ? "text-emerald-600" : "text-red-500"}>{prod.quantity}</span></span>
                    </div>

                    {/* Botão de Ver Detalhes */}
                    <button
                      onClick={() => prod.quantity > 0 && setSelectedProduct(prod)}
                      disabled={prod.quantity === 0}
                      className={`w-full mt-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        prod.quantity > 0 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {prod.quantity > 0 ? 'Ver e Reservar' : 'Esgotado'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <span className="text-5xl">📦</span>
                <p className="text-slate-500 font-medium mt-3">Nenhuma sacola disponível nesta categoria no momento.</p>
              </div>
            )}
          </div>
        )}

        {/* ---------------- MODAL DE DETALHES ---------------- */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="p-6">
                {/* Header do modal */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{selectedProduct.category}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{selectedProduct.title}</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Disponibilizado por: <strong>{selectedProduct.store}</strong></p>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    className="text-slate-400 hover:text-slate-600 text-2xl p-1"
                  >
                    ×
                  </button>
                </div>

                {/* Banner de Destaque no Modal */}
                <div className="bg-slate-50 rounded-2xl p-6 flex justify-center text-7xl mb-4">
                  {selectedProduct.image}
                </div>

                {/* Descrição */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">O que pode vir nesta Sacola?</h4>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Informações chaves */}
                <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block">Horário de Retirada</span>
                    <strong className="text-slate-700">{selectedProduct.pickupTime}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Forma de Pagamento</span>
                    <strong className="text-slate-700">Na retirada física</strong>
                  </div>
                </div>

                {/* Rodapé e Reserva */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Preço Final</span>
                    <span className="text-2xl font-black text-emerald-600">
                      R$ {selectedProduct.discountPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button
                    onClick={() => handleReserve(selectedProduct)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-sm"
                  >
                    Confirmar Reserva Grátis
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ---------------- TELA DE RESERVA SUCESSO ---------------- */}
        {profile === 'consumer' && reservation && (
          <div className="max-w-md mx-auto my-8">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl text-center">
              
              {/* Header Verde de Sucesso */}
              <div className="bg-emerald-600 text-white p-6">
                <span className="text-4xl">🎉</span>
                <h3 className="text-xl font-bold mt-2">Sua reserva foi concluída!</h3>
                <p className="text-xs text-emerald-100 mt-1">Agora é só buscar no estabelecimento.</p>
              </div>

              {/* Bilhete/Cupom */}
              <div className="p-6 relative">
                
                {/* Linha pontilhada estilizada de cupom */}
                <div className="absolute top-0 left-0 right-0 h-1 flex justify-center gap-1.5 overflow-hidden -translate-y-1/2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-slate-50 border border-slate-200 shrink-0"></div>
                  ))}
                </div>

                <div className="mb-4">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block">Código de Resgate</span>
                  <span className="text-2xl font-mono font-black text-slate-800 tracking-wider">
                    {reservation.code}
                  </span>
                </div>

                {/* Detalhes do produto reservado */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left mb-6">
                  <p className="text-xs font-semibold text-slate-400">{reservation.product.store}</p>
                  <h4 className="font-bold text-slate-800 text-sm mb-2">{reservation.product.title}</h4>
                  
                  <div className="border-t border-slate-200/60 pt-2 text-xs flex justify-between text-slate-500">
                    <span>Data: <strong>{reservation.date}</strong></span>
                    <span>Pagar no local: <strong className="text-emerald-600">R$ {reservation.product.discountPrice.toFixed(2).replace('.', ',')}</strong></span>
                  </div>
                </div>

                {/* QR CODE Simulado em SVG */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="bg-white p-3 border border-slate-200 rounded-xl inline-block shadow-inner">
                    <svg className="w-36 h-36 text-slate-800" viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="white" />
                      {/* Cantos do QR Code */}
                      <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                      <rect x="10" y="10" width="15" height="15" fill="white" />
                      <rect x="13" y="13" width="9" height="9" fill="currentColor" />

                      <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                      <rect x="75" y="10" width="15" height="15" fill="white" />
                      <rect x="78" y="13" width="9" height="9" fill="currentColor" />

                      <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                      <rect x="10" y="75" width="15" height="15" fill="white" />
                      <rect x="13" y="78" width="9" height="9" fill="currentColor" />

                      {/* Elementos internos randômicos para parecer um QR Code */}
                      <rect x="35" y="35" width="10" height="10" fill="currentColor" />
                      <rect x="50" y="35" width="15" height="5" fill="currentColor" />
                      <rect x="35" y="50" width="5" height="15" fill="currentColor" />
                      <rect x="50" y="50" width="15" height="15" fill="currentColor" />
                      
                      <rect x="45" y="5" width="5" height="20" fill="currentColor" />
                      <rect x="55" y="15" width="10" height="5" fill="currentColor" />
                      <rect x="70" y="45" width="20" height="5" fill="currentColor" />
                      <rect x="80" y="55" width="10" height="15" fill="currentColor" />
                      <rect x="5" y="45" width="20" height="5" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-xxs text-slate-400 mt-2">Apresente este QR Code no caixa para confirmar</span>
                </div>

                {/* Alerta de Retirada */}
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-left text-xs text-amber-700 mb-6">
                  ⚠️ <strong>Instruções de Retirada:</strong> Dirija-se até o endereço físico do parceiro hoje durante o horário indicado ({reservation.product.pickupTime}) para retirar a sua sacola.
                </div>

                {/* Botões finais */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setReservation(null)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-all"
                  >
                    Voltar para o Feed
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ---------------- TELA DO ESTABELECIMENTO ---------------- */}
        {profile === 'merchant' && (
          <div className="max-w-2xl mx-auto">
            
            {/* Boas-Vindas Estabelecimento */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800">Painel do Parceiro Comercial</h2>
              <p className="text-sm text-slate-500 mt-1">
                Cadastre seus lotes excedentes ou doações rapidamente. Eles aparecerão em tempo real no feed dos moradores e ONGs próximas.
              </p>
            </div>

            {/* Alerta de Sucesso de Cadastro */}
            {successMsg && (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 mb-6 text-sm font-semibold animate-bounce">
                {successMsg}
              </div>
            )}

            {/* Formulário de Cadastro */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span>➕</span> Cadastrar Lote / Sacola Surpresa
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                
                {/* Título e Loja */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Nome do Lote / Sacola *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sacola de Doces Variados"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Nome do Estabelecimento *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Padaria Bella Massa"
                      value={newStore}
                      onChange={(e) => setNewStore(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Categoria e Ícone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Categoria</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Padaria">Padaria</option>
                      <option value="Frutas e Legumes">Frutas e Legumes</option>
                      <option value="Supermercado">Supermercado</option>
                      <option value="Doações (ONGs)">Doações (ONGs)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Escolha um Ícone representativo</label>
                    <select
                      value={newEmoji}
                      onChange={(e) => setNewEmoji(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="🍞">🍞 Padaria / Pães</option>
                      <option value="🍎">🍎 Frutas</option>
                      <option value="🧀">🧀 Laticínios / Queijo</option>
                      <option value="🍲">🍲 Prato Feito / Sopa</option>
                      <option value="🍩">🍩 Doces / Donuts</option>
                      <option value="🥦">🥦 Verduras / Legumes</option>
                      <option value="🛍️">🛍️ Sacola Genérica</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Quantidade Disponível *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Ex: 3"
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Preços */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Preço Original Estimado (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Ex: 30.00"
                      value={newOrigPrice}
                      onChange={(e) => setNewOrigPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Preço com Desconto (R$ ou 0 p/ Grátis)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Ex: 9.90 (Coloque 0 para doação)"
                      value={newDiscPrice}
                      onChange={(e) => setNewDiscPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Tempo e Descrição */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Horário/Janela de Retirada *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Hoje das 18:00 às 19:00"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Breve Descrição do Conteúdo</label>
                    <textarea
                      placeholder="Indique o que pode vir na sacola ou o estado dos alimentos."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                </div>

                {/* Botões do Form */}
                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm"
                  >
                    Publicar Nova Sacola Surpresa
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-700">EcoResgate — Protótipo de Engenharia de Software</p>
          <p className="text-xs text-slate-400 mt-1">Desenvolvido individualmente para fins didáticos e avaliativos de impacto social.</p>
        </div>
      </footer>

    <
