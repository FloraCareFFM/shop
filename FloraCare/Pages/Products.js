import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/products/ProductCard";
import ProductDetail from "../components/products/ProductDetail";

export default function Products() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date'),
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get('id');
    setSelectedProductId(productId);
  }, [location.search]);

  const categories = ["Alle", "Parfüm", "Bodyscrub", "Seife", "Deostick"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.scent?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Alle" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleBackToProducts = () => {
    setSelectedProductId(null);
    window.history.pushState({}, '', createPageUrl("Products"));
  };

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={handleBackToProducts} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-stone-800">
            Unsere Produkte
          </h1>
          <p className="text-xl text-stone-600">
            Handgemachte Bio-Kosmetik für deine natürliche Schönheit
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-stone-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                <Input
                  placeholder="Produkte durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-stone-300 focus:border-stone-500"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-5 h-5 text-stone-500 flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-emerald-700 text-white hover:bg-emerald-800 shadow-md"
                      : "border-stone-300 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse border border-stone-200">
                <div className="aspect-square bg-stone-200 rounded-xl mb-4" />
                <div className="h-6 bg-stone-200 rounded mb-2" />
                <div className="h-4 bg-stone-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-stone-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-stone-400" />
            </div>
            <h3 className="text-2xl font-semibold text-stone-700 mb-2">
              Keine Produkte gefunden
            </h3>
            <p className="text-stone-500">
              Versuche andere Suchbegriffe oder Filter
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}