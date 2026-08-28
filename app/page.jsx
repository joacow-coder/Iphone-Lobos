'use client';

import { useState } from 'react';
import {
  Menu,
  X,
  Smartphone,
  BatteryCharging,
  Cpu,
  Plug,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
} from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { PRODUCTS } from '../data/products';

const WHATSAPP_NUMBER = '5492227419010';

const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Reparaciones', href: '#reparaciones' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Contacto', href: '#contacto' },
];

const SERVICES = [
  {
    icon: Smartphone,
    title: 'Cambio de Pantalla',
    description:
      'Reemplazo de pantallas originales y compatibles de alta calidad para todos los modelos de iPhone.',
  },
  {
    icon: BatteryCharging,
    title: 'Cambio de Batería',
    description:
      'Restaurá la autonomía de tu equipo con baterías nuevas certificadas y garantía por escrito.',
  },
  {
    icon: Cpu,
    title: 'Reparación de Placa Base',
    description:
      'Diagnóstico y microsoldadura para fallas de placa, cortos, humedad y componentes dañados.',
  },
  {
    icon: Plug,
    title: 'Pin de Carga / Mantenimiento',
    description:
      'Limpieza, cambio de pin de carga y mantenimiento general para que tu iPhone cargue como el primer día.',
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="min-h-screen bg-cosmic-radial text-white">
      {/* Header / Navegación */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-semibold tracking-tight text-white">
            iPhone <span className="font-light text-violet-300">Lobos</span>
          </span>

          <ul className="hidden gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/60 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href={whatsappLink('Hola! Quiero más información sobre iPhone Lobos.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white shadow-glow backdrop-blur-md transition hover:bg-white/10"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black/60 px-6 py-4 backdrop-blur-xl md:hidden">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-white/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappLink('Hola! Quiero más información sobre iPhone Lobos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero con revelado 3D ligado al scroll */}
      <Hero whatsappLink={whatsappLink} />

      {/* Servicios de Reparación */}
      <section id="reparaciones" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-white">Servicios de Reparación</h2>
          <p className="mt-3 text-white/60">
            Soluciones rápidas y confiables para cada problema de tu equipo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="glass-panel rounded-2xl p-6 shadow-glow transition hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-white/5 p-3 text-violet-300">
                <Icon size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Galería de iPhones */}
      <section id="catalogo" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-white">Catálogo</h2>
          <p className="mt-3 text-white/60">
            Equipos revisados y con garantía. Tocá una tarjeta para ver el detalle completo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} onOpen={setSelectedProduct} />
          ))}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        whatsappLink={whatsappLink}
      />

      {/* Contacto / Ubicación */}
      <section id="contacto" className="mx-auto max-w-6xl px-6 py-16">
        <div className="glass-panel-strong grid gap-8 rounded-3xl p-10 shadow-glow md:grid-cols-2 md:p-16">
          <div>
            <h2 className="text-3xl font-semibold text-white">Contacto y Ubicación</h2>
            <p className="mt-4 text-white/60">
              Visitanos o escribinos, te respondemos a la brevedad.
            </p>

            <ul className="mt-8 space-y-4 text-white/70">
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-violet-300" />
                Lobos, Provincia de Buenos Aires
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-violet-300" />
                Lunes a Sábados de 9 a 19hs
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="text-violet-300" />
                +54 9 2227 41-9010
              </li>
            </ul>
          </div>

          <div className="glass-panel flex flex-col justify-center gap-4 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white">
              ¿Tenés una consulta o querés cotizar tu equipo?
            </h3>
            <p className="text-sm text-white/60">
              Escribinos por WhatsApp y te respondemos al instante.
            </p>
            <a
              href={whatsappLink('Hola! Quiero hacer una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-black shadow-lg transition hover:bg-white/90"
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} iPhone Lobos. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
