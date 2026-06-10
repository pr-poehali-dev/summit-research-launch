import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="/images/spiral-circles.jpg"
            alt="Abstract background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>

      <p className="absolute top-12 right-6 text-white/60 uppercase z-10 text-xs tracking-[0.3em]">
        Regent · The Mandate
      </p>

      <div className="absolute bottom-12 right-6 z-10 text-right max-w-2xl">
        <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Замок</p>
        <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-light">
          Два титановых клапана.<br />
          Закрываются со звуком<br />
          захлопывающейся двери<br />
          <span className="italic text-neutral-400">Bentley.</span>
        </p>
        <p className="text-white/50 text-sm mt-6 tracking-wider uppercase">Глухой. Басистый. «Thump».</p>
      </div>
    </div>
  );
}
