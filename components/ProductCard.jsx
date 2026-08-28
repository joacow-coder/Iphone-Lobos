'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function ProductCard({ product, onOpen }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 text-left shadow-glow backdrop-blur-md transition-colors hover:bg-white/[0.08]"
    >
      <div
        className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40"
        style={{ transform: 'translateZ(24px)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.model}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="mt-5" style={{ transform: 'translateZ(36px)' }}>
        <h3 className="text-lg font-semibold text-white">{product.model}</h3>
        <p className="mt-1 text-sm text-white/50">{product.tagline}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-semibold text-white">{product.price}</span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70">
            {product.storage}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
