import "./../globals.css";
import { FaWhatsapp, FaTelegram, FaHome, FaShoppingCart, FaStar } from 'react-icons/fa';

export const metadata = {
  title: "Growthify - Commander",
  description: "Fais grandir ton audience dès aujourd’hui.",
};

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#0A1D37] text-white font-sans min-h-screen flex flex-col">
        {/* <header className="hidden md:block bg-[#102A4D] px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">Growthify</h1>
          <nav className="space-x-6">
            <Link href="/" className="hover:text-blue-300">Accueil</Link>
            <Link href="/commander" className="hover:text-blue-300">Commander</Link>
            <Link href="#temoignages" className="hover:text-blue-300">Témoignages</Link>
          </nav>
        </header> */}

        <main className="flex-grow px-4 md:px-10 max-w-7xl mx-auto w-full">
          {children}
        </main>

        <footer className="bg-[#102A4D] p-4 text-center text-sm mt-10">
          <p>
            Mentions légales | Conditions d’utilisation | Politique de
            confidentialité
          </p>
          <p className="mt-1">Site sécurisé – Aucun mot de passe requis.</p>
        </footer>

        {/* Bouton WhatsApp */}
        <a
          href="https://wa.me/237698219261"
          className="fixed bottom-24 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 z-40"
          target="_blank"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://wa.me/237698219261"
          className="fixed bottom-36 right-4 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-40"
          target="_blank"
        >
          <FaTelegram />
        </a>

        {/* Bottom Nav Bar (mobile) */}
        <nav className="fixed bottom-0 md:hidden w-full bg-[#102A4D] border-t border-gray-600 flex justify-around py-2 text-sm text-white z-50">
          <Link href="/" className="flex flex-col items-center">
            <span><FaHome/></span>
            Accueil
          </Link>
          <Link href="/commande" className="flex flex-col items-center">
            <span><FaShoppingCart/></span>
            Commander
          </Link>
          <Link href="#temoignages" className="flex flex-col items-center">
            <span><FaStar/></span>
            Avis
          </Link>
        </nav>
      </body>
    </html>
  );
}
