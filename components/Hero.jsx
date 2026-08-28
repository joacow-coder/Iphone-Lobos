'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import PhoneGLTF from './PhoneGLTF';

const lerp = (a, b, t) => a + (b - a) * t;

function RevealPhone({ progress }) {
  const groupRef = useRef(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = progress.get();

    // Phase 1 [0, 0.3]: stays a small, mostly-static peek above the card
    // while the card itself fades out — this is the part that must never
    // visually fight with the headline text.
    // Phase 2 [0.3, 0.9]: card is long gone, so the model is free to grow,
    // descend slightly and complete its 360° turn into full view.
    let y;
    let scale;
    if (p < 0.3) {
      const t = p / 0.3;
      y = lerp(0.36, 0.34, t);
      scale = lerp(0.36, 0.4, t);
    } else {
      const t = Math.min((p - 0.3) / 0.6, 1);
      y = lerp(0.34, -0.05, t);
      scale = lerp(0.4, 1.05, t);
    }
    const rotY = Math.min(p / 0.92, 1) * Math.PI * 2;

    groupRef.current.position.y = y;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.y = rotY;
    groupRef.current.rotation.x = Math.sin(rotY * 0.5) * 0.05;
  });

  return <PhoneGLTF ref={groupRef} />;
}

/** With frameloop="demand" nothing renders unless invalidated. The model's
 * transform is entirely a function of scroll position, so a single
 * invalidate() per scroll change is all the render loop ever needs. */
function ScrollInvalidator({ progress }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
    return progress.on('change', () => invalidate());
  }, [progress, invalidate]);

  return null;
}

/** Mounts the Canvas only while the hero is near the viewport, so the
 * render loop stops burning CPU/GPU once the user has scrolled away. */
function useNearViewport(ref, margin = '600px') {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: margin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, margin]);

  return active;
}

export default function Hero({ whatsappLink }) {
  const containerRef = useRef(null);
  const isNear = useNearViewport(containerRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  const cardScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);
  // Dim during the small peek phase, full brightness once emerged, then
  // fades into the next section.
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.88, 1], [0.55, 0.55, 1, 1, 0]);

  return (
    <section id="inicio" ref={containerRef} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-glow" aria-hidden="true" />

        {isNear && (
          <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0">
            <Canvas
              frameloop="demand"
              camera={{ position: [0, 0, 7], fov: 30 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.35} />
              <pointLight position={[3, 3, 3]} intensity={45} color="#8b5cf6" />
              <pointLight position={[-3, -1.5, 2]} intensity={28} color="#3b82f6" />
              <directionalLight position={[0, 4, 5]} intensity={0.6} color="#ffffff" />
              <ScrollInvalidator progress={scrollYProgress} />
              <Suspense fallback={null}>
                <RevealPhone progress={scrollYProgress} />
              </Suspense>
              {/* Environment loads independently so a slow network never
                  blocks the scroll-linked model from appearing. */}
              <Suspense fallback={null}>
                <Environment preset="city" />
              </Suspense>
              <ContactShadows
                position={[0, -1.7, 0]}
                opacity={0.5}
                blur={2.6}
                far={4.2}
                color="#3b0764"
              />
            </Canvas>
          </motion.div>
        )}

        <motion.div
          style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
          className="relative z-10 flex h-full w-full items-center justify-center px-6"
        >
          <div className="glass-panel-strong mx-auto max-w-3xl rounded-3xl p-10 text-center shadow-glow md:p-16">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-violet-300">
              <ShieldCheck size={14} />
              Servicio técnico especializado en Lobos
            </span>
            <h1 className="text-glow text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Tu iPhone, como nuevo.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
              Reparación, mantenimiento y venta de iPhones con repuestos de calidad,
              diagnóstico transparente y garantía real.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={whatsappLink('Hola! Quiero solicitar un presupuesto para mi iPhone.')}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black shadow-lg transition hover:bg-white/90"
              >
                Solicitar Presupuesto
              </a>
              <a
                href="#catalogo"
                className="rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </motion.div>

        <span className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-float text-xs uppercase tracking-[0.3em] text-white/40">
          Scroll para explorar
        </span>
      </div>
    </section>
  );
}
