import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/38b343eb-3f94-4415-aa7b-0cf74aec5b3c/files/df886386-bb3f-4aec-bde6-956e7b8ee664.jpg"
          alt="The Chancellery — кожаный портфель-кейс"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="text-xs uppercase tracking-[0.4em] mb-6 text-neutral-400 font-light">
          Regent · The Mandate
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
          THE<br />CHANCELLERY
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto opacity-80 font-light leading-relaxed mb-10">
          Кожаный кейс для тех, кто не объясняет свои решения.
          Норвежская кожа. Кевларовые швы. Титановые клапаны.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-black px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors duration-300 cursor-pointer">
            Заказать — €4 200
          </button>
          <button className="border border-white/50 text-white px-8 py-3 text-sm uppercase tracking-widest font-light hover:border-white transition-colors duration-300 cursor-pointer">
            Узнать больше
          </button>
        </div>
      </div>
    </div>
  );
}
