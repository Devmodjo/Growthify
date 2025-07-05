'use client';
import Image from 'next/image';
// import hero from '/hero.jpg';

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="flex flex-col md:flex-row items-center gap-6 py-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Fais exploser ta visibilité en quelques clics.</h1>
          <p className="text-lg text-gray-300 mb-6">Growthify te permet d’acheter des abonnés, des likes ou des vues sur Instagram, TikTok, YouTube et Facebook.</p>
          <a href="/commander" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-bold inline-block">Commander maintenant</a>
        </div>
        <div className="md:w-1/2">
          <img src="/hero.jpg"  alt="Booster réseaux sociaux" className="rounded-xl shadow-xl" />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#1B365D] p-6 rounded-xl mb-10 text-center">
        <div>
          <p className="text-3xl font-bold">+2000</p>
          <p className="text-gray-300">Commandes livrées</p>
        </div>
        <div>
          <p className="text-3xl font-bold">+150</p>
          <p className="text-gray-300">Clients satisfaits</p>
        </div>
        <div>
          <p className="text-3xl font-bold">4.9/5</p>
          <p className="text-gray-300">Note moyenne</p>
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">💬 Ils nous font confiance</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Amina', 'Junior', 'Fatou'].map((name, i) => (
            <div key={i} className="bg-[#1D3F6B] p-4 rounded-xl shadow-md">
              <Image
                src={`/testi${i + 1}.jpg`}
                alt={`Photo ${name}`}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-3"
              />
              <p className="font-semibold text-center">{name}</p>
              <p className="text-sm text-center italic">“Service rapide et top 🔥 !”</p>
              <div className="text-center mt-2">⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section image pour immersion visuelle */}
      <section className="mt-10 relative h-60 md:h-96 rounded-xl overflow-hidden">
        <Image
          src="/statpg.jpg"
          alt="Performance" // à ajouter dans public/
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h2 className="text-3xl font-bold">+500 abonnés offerts dès 5000 F</h2>
          <p className="text-md mt-2">Ne rate pas notre promotion du mois !</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">❓ Questions fréquentes</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            ['Est-ce sécurisé ?', 'Oui, 100% sécurisé. Aucune information sensible n’est demandée.'],
            ['Vais-je recevoir mes abonnés rapidement ?', 'La livraison commence en moins de 30 minutes.'],
            ['Faut-il donner un mot de passe ?', 'Non, jamais ! Seulement le lien de ton profil ou vidéo.'],
            ['Peut-on annuler une commande ?', 'Une fois lancée, la commande ne peut être annulée.']
          ].map(([q, r], i) => (
            <div key={i} className="bg-[#102A4D] p-4 rounded">
              <p className="font-semibold">{q}</p>
              <p className="text-sm text-gray-300 mt-1">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1B365D] p-6 rounded-xl text-center mt-10">
        <h2 className="text-2xl font-bold mb-2">📬 Reçois nos offres spéciales</h2>
        <p className="text-sm mb-4 text-gray-300">Rentre ton email pour recevoir nos promos exclusives.</p>
        <form className="flex flex-col md:flex-row justify-center gap-2">
          <input type="email" placeholder="ton@email.com" className="p-2 rounded text-black" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">S’inscrire</button>
        </form>
      </section>
    </>
  );
}
