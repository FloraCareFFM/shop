import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Leaf, Target, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "100% Bio",
      description: "Wir verwenden ausschließlich natürliche und biologische Inhaltsstoffe",
      color: "from-emerald-700 to-emerald-800"
    },
    {
      icon: Heart,
      title: "Handgemacht",
      description: "Jedes Produkt wird von uns mit Liebe und Sorgfalt hergestellt",
      color: "from-rose-700 to-rose-800"
    },
    {
      icon: Users,
      title: "Teamarbeit",
      description: "Ein Schulprojekt, bei dem wir gemeinsam Großes schaffen",
      color: "from-amber-700 to-amber-800"
    },
    {
      icon: Target,
      title: "Nachhaltig",
      description: "Umweltfreundliche Verpackung und verantwortungsvolle Produktion",
      color: "from-stone-700 to-stone-800"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white backdrop-blur-sm rounded-full shadow-md mb-6 border border-stone-200">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <span className="font-medium text-stone-700">Unser Schulprojekt</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-emerald-800">
            Über Flora Care
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto">
            Wir sind eine engagierte Schulklasse, die handgemachte Bio-Kosmetik herstellt
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="border border-stone-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-stone-100 to-white p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold mb-6 text-stone-800">Unsere Geschichte</h2>
                <div className="space-y-4 text-lg text-stone-700 leading-relaxed">
                  <p>
                    Flora Care entstand aus unserer gemeinsamen Leidenschaft für Nachhaltigkeit und natürliche 
                    Schönheitspflege. Als Schulklasse wollten wir nicht nur über Umweltschutz reden, 
                    sondern aktiv etwas bewirken.
                  </p>
                  <p>
                    So begannen wir, eigene Bio-Seifen und Peelings herzustellen - mit natürlichen 
                    Zutaten und viel Kreativität. Jedes Produkt wird von uns in liebevoller Handarbeit 
                    hergestellt und sorgfältig verpackt. "Frische die bleibt" ist nicht nur unser Motto, 
                    sondern unser Versprechen an euch.
                  </p>
                  <p>
                    Mit jedem Verkauf unterstützt ihr nicht nur unser Klassenprojekt, sondern auch 
                    nachhaltige Produktionsweisen und natürliche Schönheitspflege ohne Chemie.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-stone-800">
            Unsere Werte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border border-stone-200 hover:border-stone-300 transition-all duration-300 h-full shadow-md hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-3 text-stone-800">{value.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="border border-stone-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Unser Team</h2>
                <p className="text-xl text-emerald-100 leading-relaxed mb-6">
                  Wir sind eine vielfältige Gruppe von Schülerinnen und Schülern, die zusammen 
                  dieses besondere Projekt verwirklichen. Jeder bringt seine eigenen Stärken ein - 
                  ob beim Herstellen, Verpacken, Verkaufen oder in der Organisation.
                </p>
                <p className="text-xl text-emerald-100 leading-relaxed">
                  Gemeinsam lernen wir nicht nur über Kosmetik und Unternehmertum, sondern auch 
                  über Teamarbeit, Verantwortung und Nachhaltigkeit.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="border border-stone-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-amber-50 to-white p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-stone-800">Unsere Mission</h2>
                <p className="text-xl text-stone-700 leading-relaxed">
                  Mit Flora Care möchten wir zeigen, dass nachhaltiger Konsum nicht kompliziert sein muss und dass 
                  man mit kleinen Schritten Großes bewirken kann. Wir bieten hochwertige, 
                  natürliche Kosmetik an, die gut für deine Haut und gut für die Umwelt ist - 
                  mit einer Frische, die wirklich bleibt.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}