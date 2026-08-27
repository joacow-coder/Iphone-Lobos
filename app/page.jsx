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
  ShieldCheck,
} from 'lucide-react';

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

const CATALOG = [
  { model: 'iPhone 11', storage: '64GB', battery: '87%', price: 'USD 280' },
  { model: 'iPhone 12', storage: '128GB', battery: '89%', price: 'USD 350' },
  { model: 'iPhone 13', storage: '128GB', battery: '91%', price: 'USD 430' },
  { model: 'iPhone 14', storage: '128GB', battery: '95%', price: 'USD 520' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 text-slate-800">
      {/* Header / Navegación */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/40 backdrop-blur-xl shadow-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            iPhone <span className="font-light text-blue-500">Lobos</span>
          </span>

          <ul className="hidden gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
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
              className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-5 py-2 text-sm font-medium text-slate-800 shadow-lg backdrop-blur-md transition hover:bg-white/80"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="text-slate-700 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/30 bg-white/60 px-6 py-4 backdrop-blur-xl md:hidden">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-slate-700"
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
                  className="flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-sm font-medium shadow-md"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/40 bg-white/40 p-10 text-center shadow-xl backdrop-blur-xl md:p-16">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-1 text-xs font-medium text-blue-600">
            <ShieldCheck size={14} />
            Servicio técnico especializado en Lobos
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
            Tu iPhone, como nuevo.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-600 md:text-lg">
            Reparación, mantenimiento y venta de iPhones con repuestos de calidad,
            diagnóstico transparente y garantía real.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={whatsappLink('Hola! Quiero solicitar un presupuesto para mi iPhone.')}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-slate-700"
            >
              Solicitar Presupuesto
            </a>
            <a
              href="#catalogo"
              className="rounded-full border border-white/50 bg-white/60 px-8 py-3 text-sm font-medium text-slate-800 shadow-lg backdrop-blur-md transition hover:bg-white/80"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      </section>

      {/* Servicios de Reparación */}
      <section id="reparaciones" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">Servicios de Reparación</h2>
          <p className="mt-3 text-slate-600">
            Soluciones rápidas y confiables para cada problema de tu equipo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/30 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/60"
            >
              <div className="mb-4 inline-flex rounded-xl border border-white/40 bg-white/60 p-3 text-blue-500 shadow-md">
                <Icon size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Catálogo Rápido */}
      <section id="catalogo" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">Catálogo Rápido</h2>
          <p className="mt-3 text-slate-600">
            Equipos revisados y con garantía. Consultá stock disponible al instante.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATALOG.map(({ model, storage, battery, price }) => (
            <div
              key={model}
              className="flex flex-col justify-between rounded-2xl border border-white/30 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/60"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{model}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>Almacenamiento: {storage}</li>
                  <li>Salud de batería: {battery}</li>
                </ul>
                <p className="mt-4 text-2xl font-semibold text-slate-900">{price}</p>
              </div>
              <a
                href={whatsappLink(`Hola! Quiero consultar stock de ${model}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-slate-800 shadow-md backdrop-blur-md transition hover:bg-white/80"
              >
                <MessageCircle size={16} />
                Consultar Stock
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto / Ubicación */}
      <section id="contacto" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 rounded-3xl border border-white/40 bg-white/40 p-10 shadow-xl backdrop-blur-xl md:grid-cols-2 md:p-16">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Contacto y Ubicación</h2>
            <p className="mt-4 text-slate-600">
              Visitanos o escribinos, te respondemos a la brevedad.
            </p>

            <ul className="mt-8 space-y-4 text-slate-700">
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-500" />
                Lobos, Provincia de Buenos Aires
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-blue-500" />
                Lunes a Sábados de 9 a 19hs
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="text-blue-500" />
                +54 9 2227 12-3456
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-white/40 bg-white/50 p-8 text-center shadow-lg backdrop-blur-md">
            <h3 className="text-xl font-semibold text-slate-900">
              ¿Tenés una consulta o querés cotizar tu equipo?
            </h3>
            <p className="text-sm text-slate-600">
              Escribinos por WhatsApp y te respondemos al instante.
            </p>
            <a
              href={whatsappLink('Hola! Quiero hacer una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto flex w-fit items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-slate-700"
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/30 bg-white/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row">
          <p>© {new Date().getFullYear()} iPhone Lobos. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 bg-white/50 p-2 shadow-md transition hover:bg-white/80"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 bg-white/50 p-2 shadow-md transition hover:bg-white/80"
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
