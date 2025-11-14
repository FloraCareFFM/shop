
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
    notes: ""
  });

  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      return await base44.entities.Order.create(orderData);
    },
    onSuccess: () => {
      setOrderPlaced(true);
      localStorage.removeItem('cart');
      setCart([]);
      window.dispatchEvent(new Event('cartUpdated'));
      setTimeout(() => {
        window.location.href = createPageUrl("Home");
      }, 3000);
    },
  });

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      items: cart,
      total_amount: totalAmount,
      status: "neu"
    };
    placeOrderMutation.mutate(orderData);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-stone-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-4 text-stone-800">Bestellung erfolgreich!</h2>
          <p className="text-xl text-stone-600 mb-2">
            Vielen Dank für deine Bestellung!
          </p>
          <p className="text-stone-500">
            Wir melden uns bald bei dir.
          </p>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-stone-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-stone-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 text-stone-800">Dein Warenkorb ist leer</h2>
          <p className="text-stone-600 mb-8">
            Entdecke unsere handgemachten Bio-Produkte!
          </p>
          <Link to={createPageUrl("Products")}>
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg">
              Zum Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Products")}>
            <Button variant="ghost" className="gap-2 text-stone-700 hover:bg-stone-100">
              <ArrowLeft className="w-4 h-4" />
              Weiter einkaufen
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-serif font-bold mb-8 text-stone-800">
          Warenkorb
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl overflow-hidden flex-shrink-0 border border-stone-200">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-8 h-8 text-stone-300" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 text-stone-800">{item.name}</h3>
                          <p className="text-stone-600 mb-4">{item.price.toFixed(2)}€ / Stück</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-stone-300"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="text-lg font-semibold w-8 text-center text-stone-800">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-stone-300"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="text-xl font-bold text-stone-800">
                                {(item.price * item.quantity).toFixed(2)}€
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary / Checkout */}
          <div>
            <Card className="sticky top-24 border border-stone-200 shadow-xl">
              <CardHeader className="bg-gradient-to-br from-stone-100 to-white border-b border-stone-200">
                <CardTitle className="text-stone-800">
                  {showCheckout ? "Bestellung abschließen" : "Zusammenfassung"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {!showCheckout ? (
                  <>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-stone-600">
                        <span>Artikel ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                        <span>{totalAmount.toFixed(2)}€</span>
                      </div>
                      <div className="border-t border-stone-200 pt-3 flex justify-between text-xl font-bold">
                        <span className="text-stone-800">Gesamt</span>
                        <span className="text-stone-800">{totalAmount.toFixed(2)}€</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowCheckout(true)}
                      className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      Zur Kasse
                    </Button>
                  </>
                ) : (
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <Label htmlFor="customer_name">Name *</Label>
                      <Input
                        id="customer_name"
                        required
                        value={formData.customer_name}
                        onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer_email">E-Mail *</Label>
                      <Input
                        id="customer_email"
                        type="email"
                        required
                        value={formData.customer_email}
                        onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer_phone">Telefon</Label>
                      <Input
                        id="customer_phone"
                        type="tel"
                        value={formData.customer_phone}
                        onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery_address">Lieferadresse *</Label>
                      <Textarea
                        id="delivery_address"
                        required
                        value={formData.delivery_address}
                        onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Anmerkungen</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>

                    <div className="border-t border-stone-200 pt-4 mb-4">
                      <div className="flex justify-between text-xl font-bold mb-4">
                        <span className="text-stone-800">Gesamt</span>
                        <span className="text-stone-800">{totalAmount.toFixed(2)}€</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCheckout(false)}
                        className="flex-1 border-stone-300"
                      >
                        Zurück
                      </Button>
                      <Button
                        type="submit"
                        disabled={placeOrderMutation.isPending}
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white"
                      >
                        {placeOrderMutation.isPending ? "Wird gesendet..." : "Bestellen"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}