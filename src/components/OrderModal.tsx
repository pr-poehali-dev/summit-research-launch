import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderModal({ open, onClose }: OrderModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/baf8e790-42cb-493f-9e2b-5f4a179aac9e", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setForm({ name: "", phone: "", email: "", city: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            className="relative bg-neutral-950 border border-neutral-800 w-full max-w-md p-8"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <Icon name="X" size={18} />
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">Regent · The Mandate</p>
                <Icon name="CheckCircle" size={40} className="text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-3">Заявка принята</h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Мы свяжемся с вами в ближайшее время для подтверждения заказа и обсуждения гравировки.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-8 border border-neutral-700 text-white px-6 py-2 text-xs uppercase tracking-widest hover:border-white transition-colors"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">Regent · The Mandate</p>
                <h2 className="text-2xl font-bold text-white mb-1">Заказать кейс</h2>
                <p className="text-neutral-500 text-sm mb-8">The Chancellery — €4 200</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Имя *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Как к вам обращаться"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+7 000 000 00 00"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Город гравировки</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Москва, Лондон, Дубай…"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                    />
                    <p className="text-neutral-600 text-xs mt-1">Лазерная маркировка: Regent / № / Город</p>
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs text-center">Ошибка отправки. Попробуйте ещё раз.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 bg-white text-black text-xs uppercase tracking-widest px-6 py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {status === "loading" ? "Отправка…" : "Отправить заявку"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
