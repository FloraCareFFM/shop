import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail({ product, onBack }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
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

  const genderBadgeColor = {
    "Männer": "bg-blue-50 text-blue-700 border-blue-200",
    "Frauen": "bg-rose-50 text-rose-700 border-rose-200",
    "Unisex": "bg-stone-50 text-stone-700 border-stone-200"
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 gap-2 hover:bg-stone-100 text-stone-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zu den Produkten
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticky top-24">
              <Card className="overflow-hidden border border-stone-200 shadow-xl">
                <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-50">
                  {product.image_url && !imageError ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-12">
                      <div className="text-9xl opacity-60">
                        {categoryIcons[product.category] || "🌿"}
                      </div>
                      <Sparkles className="w-20 h-20 text-emerald-400 opacity-40" />
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex gap-2 mb-4">
                <Badge className={`border ${categoryColors[product.category] || 'bg-stone-100 text-stone-700'}`}>
                  {product.category}
                </Badge>
                {product.gender && (
                  <Badge className={`border ${genderBadgeColor[product.gender] || 'bg-stone-100 text-stone-700'}`}>
                    {product.gender}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-stone-800">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-stone-800">
                  {product.price.toFixed(2)}€
                </span>
                {product.size && (
                  <span className="text-xl text-stone-500">/ {product.size}</span>
                )}
              </div>
            </div>

            {product.scent && (
              <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌸</span>
                    <div>
                      <p className="text-xs text-stone-600 font-medium">Duftrichtung</p>
                      <p className="text-stone-800 font-semibold">{product.scent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {product.short_description && (
              <p className="text-xl text-stone-600 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {product.description && (
              <Card className="bg-gradient-to-br from-stone-50 to-white border-stone-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-stone-800">Beschreibung</h3>
                  <p className="text-stone-700 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {product.benefits && product.benefits.length > 0 && (
              <Card className="bg-white border border-emerald-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4 text-stone-800">Vorteile</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {product.ingredients && (
              <Card className="bg-white border border-stone-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-stone-800">Inhaltsstoffe</h3>
                  <p className="text-stone-700 leading-relaxed">
                    {product.ingredients}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart */}
            <Card className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-semibold text-stone-700">Menge:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 border-stone-300"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center text-stone-800">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 border-stone-300"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={addToCart}
                  className="w-full h-14 text-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 gap-2"
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      In den Warenkorb gelegt!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Für {(product.price * quantity).toFixed(2)}€ in den Warenkorb
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}