import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ShoppingCart, Sparkles, Info, Package, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(updatedCount);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [location]);

  const navigation = [
    { name: "Home", path: createPageUrl("Home"), icon: Sparkles },
    { name: "Produkte", path: createPageUrl("Products"), icon: Package },
    { name: "Über uns", path: createPageUrl("About"), icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        :root {
          --color-primary: #8B7355;
          --color-secondary: #A0937D;
          --color-accent: #C9A882;
          --color-sage: #9CAF88;
          --color-cream: #F5F1E8;
        }

        /* Button Click Animation */
        @keyframes buttonPulse {
          0% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(0.95);
            filter: brightness(1.3);
          }
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
        }

        button:active {
          animation: buttonPulse 0.3s ease-in-out;
        }

        /* Additional click feedback for specific button types */
        button:active:not(:disabled) {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <Sparkles className="w-5 h-5 text-emerald-50" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-serif font-bold text-stone-800">
                  Flora Care
                </h1>
                <p className="text-xs text-emerald-700 tracking-wide">Frische die bleibt</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.path}>
                    <Button
                      variant="ghost"
                      className={`gap-2 transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-stone-100 text-stone-800"
                          : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Cart Button */}
            <div className="flex items-center gap-2">
              <Link to={createPageUrl("Cart")}>
                <Button
                  className="relative bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  size="icon"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-amber-600 text-white border-2 border-white h-6 w-6 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-stone-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-stone-200">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-2 ${
                          isActive(item.path)
                            ? "bg-stone-100 text-stone-800"
                            : "text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-stone-800 to-stone-900 text-stone-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold">Flora Care</h3>
                  <p className="text-xs text-emerald-300">Frische die bleibt</p>
                </div>
              </div>
              <p className="text-stone-300">
                Handgemachte Bio-Kosmetik mit Liebe von unserem Schulprojekt hergestellt.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Schnellzugriff</h4>
              <ul className="space-y-2 text-stone-300">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-emerald-300 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-stone-300">
                Fragen zu unseren Produkten?<br />
                Schreibt uns gerne eine Nachricht!
              </p>
            </div>
          </div>
          
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
            <p>© 2025 Flora Care - Frische die bleibt 🌿</p>
          </div>
        </div>
      </footer>
    </div>
  );
}