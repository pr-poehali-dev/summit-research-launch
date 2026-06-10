import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onOrder={() => setModalOpen(true)} />
      <Featured onOrder={() => setModalOpen(true)} />
      <Promo />
      <Footer onOrder={() => setModalOpen(true)} />
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Index;
