import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const categoryColors = {
    "Parfüm": "bg-purple-50 text-purple-800 border-purple-200",
    "Bodyscrub": "bg-amber-50 text-amber-800 border-amber-200",
    "Seife": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "Deostick": "bg-blue-50 text-blue-800 border-blue-200"
  };

  const categoryIcons = {
    "Parfüm": "💎",
    "Bodyscrub": "✨",
    "Seife": "🧼",
    "Deostick": "🌿"
  };

  return (
    <Link to={`${createPageUrl("Products")}?id=${product.id}`} className="block">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border border-stone-200 hover:border-emerald-300 transition-all duration-300 shadow-md hover:shadow-xl bg-white cursor-pointer">
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
            {product.image_url && !imageError ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
                <div className="text-7xl opacity-60">
                  {categoryIcons[product.category] || "🌿"}
                </div>
                <Sparkles className="w-12 h-12 text-emerald-400 opacity-40" />
              </div>
            )}
            {product.featured && (
              <Badge className="absolute top-3 right-3 bg-emerald-700 text-white border-none shadow-md">
                Bestseller
              </Badge>
            )}
            <Badge className={`absolute top-3 left-3 border backdrop-blur-sm ${categoryColors[product.category] || 'bg-stone-100 text-stone-700'}`}>
              {product.category}
            </Badge>
          </div>
          
          <CardContent className="p-6">
            <h3 className="text-xl font-serif font-bold mb-2 text-stone-800 line-clamp-1">
              {product.name}
            </h3>
            
            {product.short_description && (
              <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                {product.short_description}
              </p>
            )}

            {product.scent && (
              <p className="text-xs text-stone-500 mb-3 flex items-center gap-1">
                <span>🌸</span> {product.scent}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-stone-800">
                  {product.price.toFixed(2)}€
                </span>
                {product.size && (
                  <span className="text-sm text-stone-500 ml-2">({product.size})</span>
                )}
              </div>
              
              <Button
                onClick={addToCart}
                className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg transition-all duration-300 gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                In den Warenkorb
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}