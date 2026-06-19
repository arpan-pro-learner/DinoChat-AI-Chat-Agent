import React from 'react';
import { ShoppingCart, Star, ShieldCheck, Truck, Clock } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Rexy the T-Rex",
    price: "₹1,299",
    rating: 5,
    image: "/assets/trex.png",
    color: "bg-green-50"
  },
  {
    id: 2,
    name: "Trippy the Triceratops",
    price: "₹1,499",
    rating: 4,
    image: "/assets/tricera.png",
    color: "bg-blue-50"
  },
  {
    id: 3,
    name: "Stego the Stegosaurus",
    price: "₹1,199",
    rating: 5,
    image: "/assets/stego.png",
    color: "bg-purple-50"
  }
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🦕</span>
            <span className="font-black text-xl tracking-tight text-slate-800">DinoStore</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-dino-medium transition-colors">Shop All</a>
            <a href="#" className="hover:text-dino-medium transition-colors">Gift Guide</a>
            <a href="#" className="hover:text-dino-medium transition-colors">Sustainability</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-50 rounded-full relative">
              <ShoppingCart size={20} className="text-slate-700" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-dino-medium text-white text-[10px] flex items-center justify-center rounded-full">3</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <img 
            src="/assets/hero.png" 
            alt="Happy child with dino" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-xl space-y-4 md:space-y-6">
                <span className="inline-block px-4 py-1.5 bg-dino-medium/10 text-dino-medium rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                  New Arrival: The Jurrasic Collection
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                  Soft Friends for <br /> 
                  <span className="text-dino-medium italic">Big Adventures.</span>
                </h1>
                <p className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-md">
                  Handcrafted prehistoric pals made from the softest organic cotton. 
                  Perfect for cuddles and creative play.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-dino-medium text-white rounded-full font-bold shadow-lg shadow-dino-medium/30 hover:bg-dino-dark transition-all transform hover:-translate-y-1 text-sm md:text-base">
                    Adopt a Dino
                  </button>
                  <button className="px-6 md:px-8 py-3 md:py-4 bg-slate-100 text-slate-700 rounded-full font-bold hover:bg-slate-200 transition-all text-sm md:text-base">
                    View Lookbook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-2 md:space-y-0 md:space-x-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-dino-medium">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm md:text-base">Free Shipping</h4>
                <p className="text-[10px] md:text-xs text-slate-500">Above ₹999</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-2 md:space-y-0 md:space-x-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-dino-medium">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm md:text-base">Organic</h4>
                <p className="text-[10px] md:text-xs text-slate-500">100% Kid-Safe</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-2 md:space-y-0 md:space-x-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-dino-medium">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm md:text-base">Fast Shipping</h4>
                <p className="text-[10px] md:text-xs text-slate-500">5-7 Days</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-2 md:space-y-0 md:space-x-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-dino-medium">
                <Star size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm md:text-base">Top Rated</h4>
                <p className="text-[10px] md:text-xs text-slate-500">4.9/5 Average</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-12 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Our Best Cuddlers</h2>
              <p className="text-sm md:text-base text-slate-500">The most popular species in the store.</p>
            </div>
            <a href="#" className="text-dino-medium font-bold hover:underline text-sm md:text-base">Shop All Collection →</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className={`aspect-square rounded-[2rem] ${product.color} p-8 mb-6 relative overflow-hidden transition-transform duration-500 group-hover:-translate-y-2`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                  <button className="absolute bottom-4 right-4 p-4 bg-white rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    <ShoppingCart size={20} className="text-dino-medium" />
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{product.name}</h3>
                    <div className="flex space-x-1 text-yellow-400">
                      {[...Array(product.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <span className="text-lg font-black text-slate-900">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section (Brief) */}
        <section className="py-24 bg-dino-light/30">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Got Questions?</h2>
            <div className="space-y-4 text-left">
              <div className="bg-white p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-2">How long for delivery?</h4>
                <p className="text-sm text-slate-500">We ship across India. Standard delivery takes 5–7 business days.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-2">What is your return policy?</h4>
                <p className="text-sm text-slate-500">We offer a 30-day return policy for all unused products in original packaging.</p>
              </div>
            </div>
            <p className="mt-8 text-slate-400 text-sm italic">
              Psst... feel free to ask our assistant Dino in the corner for more help! 🦕
            </p>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>© 2026 DinoStore. Hand-stitched with love.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Instagram</a>
            <a href="#">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
