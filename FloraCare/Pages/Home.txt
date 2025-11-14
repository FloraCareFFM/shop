import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Leaf, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../components/products/ProductCard";

export default function Home() {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => base44.entities.Product.filter({ featured: true }, '-created_date', 3),
  });

  const features = [
    {
      icon: Leaf,
      title: "100% Bio",
      description: "Nur natürliche Inhaltsstoffe",
      color: "from-emerald-700 to-emerald-800"
    },
    {
      icon: Heart,
      title: "Handgemacht",
      description: "Mit Liebe hergestellt",
      color: "from-rose-700 to-rose-800"
    },
    {
      icon: Sparkles,
      title: "Nachhaltig",
      description: "Umweltfreundlich verpackt",
      color: "from-amber-700 to-amber-800"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-stone-100 to-stone-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-8 border border-stone-200"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-medium text-stone-700">Ein Schulprojekt mit Herz</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              <span className="text-emerald-800">
                Flora Care
              </span>
              <br />
              <span className="text-stone-600 text-4xl md:text-5xl">Frische die bleibt</span>
            </h1>

            <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-3xl mx-auto">
              Handgemachte Bio-Seifen und Peelings – von Schülern für eine nachhaltige Zukunft
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Products")}>
                <Button
                  size="lg"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 h-14 gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Jetzt Shoppen
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl("About")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-stone-300 hover:bg-stone-100 text-stone-700 text-lg px-8 h-14"
                >
                  Über uns erfahren
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-stone-800">{feature.title}</h3>
                  <p className="text-stone-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-stone-800">
              Unsere Bestseller
            </h2>
            <p className="text-xl text-stone-600">
              Diese Produkte lieben unsere Kunden besonders
            </p>
          </motion.div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-500">Noch keine Featured-Produkte verfügbar</p>
            </div>
          )}

          <div className="text-center">
            <Link to={createPageUrl("Products")}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-stone-300 hover:bg-stone-100 text-stone-700 gap-2"
              >
                Alle Produkte ansehen
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-700 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Bereit für Frische die bleibt?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Entdecke unsere handgemachten Bio-Produkte und unterstütze unser Schulprojekt
            </p>
            <Link to={createPageUrl("Products")}>
              <Button
                size="lg"
                className="bg-white text-emerald-800 hover:bg-stone-50 text-lg px-8 h-14 shadow-xl"
              >
                Zum Shop
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}