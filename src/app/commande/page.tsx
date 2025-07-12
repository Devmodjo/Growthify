'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Commander() {
  const [step, setStep] = useState(1);
  const [reseau, setReseau] = useState('Instagram');
  const [service, setService] = useState('Abonnés');
  const [quantite, setQuantite] = useState(500);
  const [prix, setPrix] = useState('500 F');
  const [lienPaiement, setLienPaiement] = useState('');
  const [lienCompte, setLienCompte] = useState('');

  const tarifs: { [key: number]: number } = {
    500: 500,
    1000: 1000,
    1500: 1500,
    2000: 2000,
    2500: 2500,
    3000: 3000,
    3500: 3500,
    4000: 4000,
    5000: 5000,
    8000: 8000,
    10000: 9000,
    12000: 10000,
    15000: 14000,
    20000: 19000,
    30000: 29000,
    50000: 49000,
    80000: 79000,
    100000: 85000,
    120000: 90000,
    130000: 100000,
    150000: 125000,
  };

  const handleNextStep = () => {
    if (step === 1) setPrix(`${tarifs[quantite] || quantite} F`);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section className="py-10 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">🛒 Commander</h1>

      {step === 1 && (
        <div className="bg-[#1B365D] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Étape 1 : Choisis ton service</h2>
          <div className="grid gap-4">
            <div>
              <label className="block mb-1">Réseau social</label>
              <select
                className="w-full p-2 rounded bg-[#102A4D] text-white"
                value={reseau}
                onChange={(e) => setReseau(e.target.value)}
              >
                <option>Instagram</option>
                <option>TikTok</option>
                <option>YouTube</option>
                <option>Facebook</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Service</label>
              <select
                className="w-full p-2 rounded bg-[#102A4D] text-white"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option>Abonnés</option>
                <option>Likes</option>
                <option>Vues</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Quantité</label>
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(parseInt(e.target.value))}
                className="w-full p-2 rounded bg-[#102A4D] text-white"
              />
            </div>
            <button
              onClick={handleNextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
            >
              Suivant ➡️
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-[#1D3F6B] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Étape 2 : Paiement</h2>
          <p className="mb-1">Total à payer : <strong>{prix}</strong></p>
          <p className="mb-1">Orange Money : <strong><input className="bg-[#102A4D] p-1 rounded text-white" placeholder="À compléter" /></strong></p>
          <button
            onClick={handleNextStep}
            className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded"
          >
            J’ai payé ✅
          </button>
          <p className="mb-4">MTN Mobile Money : <input className="bg-[#102A4D] p-1 rounded text-white" placeholder="À compléter" /></p>
          <button
            onClick={handleNextStep}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            J’ai payé ✅
          </button>
          <button
            onClick={handlePrevStep}
            className="mt-2 underline text-sm text-gray-300 block"
          >⬅️ Retour</button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-[#1B365D] p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Étape 3 : Ton lien</h2>
          <p className="mb-2 text-sm">Renseigne le lien de ton compte ou de ta vidéo.</p>
          <input
            type="text"
            placeholder="Ex : https://instagram.com/tonprofil"
            className="w-full p-2 rounded bg-[#102A4D] text-white mb-4"
            value={lienCompte}
            onChange={(e) => setLienCompte(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-bold"
            onClick={() => alert('Commande validée !')}
          >
            Valider ma commande ✅
          </button>
          <button
            onClick={handlePrevStep}
            className="mt-2 underline text-sm text-gray-300 block"
          >⬅️ Retour</button>
        </div>
      )}
    </section>
  );
}
