'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Cpu,
  Camera,
  BatteryCharging,
  MonitorSmartphone,
  Palette,
  MessageCircle,
} from 'lucide-react';
import ProductCanvas from './ProductCanvas';

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      <span className="mt-0.5 text-violet-300">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-white/40">{label}</p>
        <p className="text-white/85">{value}</p>
      </div>
    </div>
  );
}

export default function ProductModal({ product, onClose, whatsappLink }) {
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            onClick={(event) => event.stopPropagation()}
            className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-2xl md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            <div className="relative h-72 bg-cosmic-radial md:h-auto">
              <ProductCanvas accentColor="#8b5cf6" />
              <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-white/40">
                Arrastrá para girar
              </span>
            </div>

            <div className="flex flex-col gap-5 p-8">
              <div>
                <h3 className="text-2xl font-semibold text-white">{product.model}</h3>
                <p className="mt-1 text-sm text-white/50">{product.tagline}</p>
              </div>

              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <Spec icon={Cpu} label="Chip" value={product.chip} />
                <Spec icon={Camera} label="Cámaras" value={product.cameras} />
                <Spec icon={BatteryCharging} label="Batería" value={product.battery} />
                <Spec icon={MonitorSmartphone} label="Pantalla" value={product.display} />
              </dl>

              <div>
                <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-white/40">
                  <Palette size={14} /> Colores disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-xs text-white/40">{product.storage}</p>
                  <p className="text-2xl font-semibold text-white">{product.price}</p>
                </div>
                <a
                  href={whatsappLink(`Hola! Quiero consultar por el ${product.model}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  <MessageCircle size={16} /> Consultar
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
