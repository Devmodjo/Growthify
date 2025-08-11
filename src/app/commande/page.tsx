'use client';

import { useState, useEffect } from 'react';

export default function Commander() {
  const [reseau, setReseau] = useState('Instagram');
  const [service, setService] = useState('Abonnés');
  const [quantite, setQuantite] = useState(500);
  const [prix, setPrix] = useState('0 F');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [numeroPayeur, setNumeroPayeur] = useState('');
  const [lienCompte, setLienCompte] = useState('');
  const [paiementEnCours, setPaiementEnCours] = useState(false);
  const [paiementReussi, setPaiementReussi] = useState(false);
  const [messageErreur, setMessageErreur] = useState('');



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

  useEffect(() => {
    if (tarifs[quantite]) {
      setPrix(`${tarifs[quantite]} F`);
    } else if (quantite > 0) {
      setPrix(`${quantite} F`);
    } else {
      setPrix('0 F');
    }
  }, [quantite]);

  // Validation lien selon réseau
  const validerLienSelonReseau = (reseau: string, lien: string) => {
    if (!lien) return false;
    const lienLower = lien.toLowerCase();

    switch (reseau) {
      case 'Instagram':
        return lienLower.includes('instagram.com');
      case 'TikTok':
        return lienLower.includes('tiktok.com');
      case 'YouTube':
        return lienLower.includes('youtube.com') || lienLower.includes('youtu.be');
      case 'Facebook':
        return lienLower.includes('facebook.com');
      default:
        return false;
    }
  };

  // Validations
  const reseauValide = reseau.trim().length > 0;
  const serviceValide = service.trim().length > 0;
  const quantiteValide = quantite > 0 && tarifs[quantite] !== undefined;
  const emailValide = /\S+@\S+\.\S+/.test(email);
  const whatsappValide = /^\+?[0-9\s]{8,15}$/.test(whatsapp);
  const numeroPayeurValide = /^\+?[0-9\s]{8,15}$/.test(numeroPayeur);
  const lienCompteValide = lienCompte.trim().length > 0;
  const lienCorrespondAuReseau = validerLienSelonReseau(reseau, lienCompte);

  const updatePrix = (q: number) => {
    setQuantite(q);
    setPrix(`${tarifs[q] || q} F`);
  };

  const handlePaiement = async () => {
    setMessageErreur('');
    if (!emailValide || !whatsappValide || !numeroPayeurValide) {
      setMessageErreur('Merci de fournir un email, un WhatsApp et un numéro Mobile Money valides.');
      return;
    }
    if (!quantiteValide) {
      setMessageErreur('Quantité invalide selon la grille tarifaire.');
      return;
    }
    if (!lienCorrespondAuReseau) {
      setMessageErreur(`Le lien ne correspond pas au réseau social sélectionné (${reseau}).`);
      return;
    }
    setPaiementEnCours(true);

    try {
      const res = await fetch('/api/lygos-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reseau,
          service,
          quantite,
          prix: tarifs[quantite] || quantite,
          email,
          whatsapp,
          numeroPayeur,
          lienCompte,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setPaiementReussi(true);
      } else {
        setMessageErreur(data.message || 'Erreur lors du paiement');
      }
    } catch (error) {
      setMessageErreur('Erreur serveur ou réseau');
    } finally {
      setPaiementEnCours(false);
    }
  };

  return (
    <section className="py-10 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">🛒 Commander</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePaiement();
        }}
        className="bg-[#1B365D] p-6 rounded-xl space-y-4"
      >
        {/* Réseau social */}
        <div>
          <label className="block mb-1">Réseau social</label>
          <select
            className="w-full p-2 rounded bg-[#102A4D] text-white"
            value={reseau}
            onChange={(e) => setReseau(e.target.value)}
            disabled={paiementReussi}
            required
          >
            <option>Instagram</option>
            <option>TikTok</option>
            <option>YouTube</option>
            <option>Facebook</option>
          </select>
        </div>

        {/* Service */}
        <div>
          <label className="block mb-1">Service</label>
          <select
            className="w-full p-2 rounded bg-[#102A4D] text-white"
            value={service}
            onChange={(e) => setService(e.target.value)}
            disabled={!reseauValide || paiementReussi}
            required
          >
            <option>Abonnés</option>
            <option>Likes</option>
            <option>Vues</option>
          </select>
        </div>

        {/* Quantité */}
        <div>
          <label className="block mb-1">Quantité</label>
          <input
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(parseInt(e.target.value) || 0)}
            className="w-full p-2 rounded bg-[#102A4D] text-white"
            disabled={!serviceValide || paiementReussi}
            required
            min={500}
          />
          {!quantiteValide && (
            <p className="text-red-400 text-sm mt-1">
              Quantité invalide. Choisissez une quantité présente dans la grille tarifaire.
            </p>
          )}
        </div>

        {/* Prix calculé */}
        <div>
          <p>
            Prix à payer : <strong>{prix}</strong>
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-[#102A4D] text-white"
            disabled={!quantiteValide || paiementReussi}
            required
          />
          {!emailValide && email.length > 0 && (
            <p className="text-red-400 text-sm mt-1">Email invalide</p>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block mb-1">WhatsApp</label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full p-2 rounded bg-[#102A4D] text-white"
            disabled={!emailValide || paiementReussi}
            required
          />
          {!whatsappValide && whatsapp.length > 0 && (
            <p className="text-red-400 text-sm mt-1">Numéro WhatsApp invalide</p>
          )}
        </div>

        {/* Numéro Mobile Money (client payeur) */}
        <div>
          <label className="block mb-1">Numéro Mobile Money (payeur)</label>
          <input
            type="tel"
            value={numeroPayeur}
            onChange={(e) => setNumeroPayeur(e.target.value)}
            className="w-full p-2 rounded bg-[#102A4D] text-white"
            disabled={!whatsappValide || paiementReussi}
            required
            placeholder="+237 6XXXXXXXX"
          />
          {!numeroPayeurValide && numeroPayeur.length > 0 && (
            <p className="text-red-400 text-sm mt-1">Numéro Mobile Money invalide</p>
          )}
        </div>

        {/* Lien compte */}
        <div>
          <label className="block mb-1">Lien de ton compte ou vidéo</label>
          <input
            type="url"
            value={lienCompte}
            onChange={(e) => setLienCompte(e.target.value)}
            className="w-full p-2 rounded bg-[#102A4D] text-white"
            disabled={!numeroPayeurValide || paiementReussi}
            required
            placeholder="https://instagram.com/tonprofil"
          />
          {!lienCompteValide && lienCompte.length > 0 && (
            <p className="text-red-400 text-sm mt-1">Lien invalide</p>
          )}
          {lienCompteValide && !lienCorrespondAuReseau && (
            <p className="text-red-400 text-sm mt-1">
              Le lien ne correspond pas au réseau social sélectionné ({reseau}).
            </p>
          )}
        </div>

        {/* Bouton paiement */}
        <button
          type="submit"
          disabled={
            !lienCompteValide ||
            !lienCorrespondAuReseau ||
            paiementEnCours ||
            paiementReussi
          }
          className={`w-full py-2 rounded font-bold ${
            !lienCompteValide || !lienCorrespondAuReseau || paiementEnCours || paiementReussi
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          {paiementEnCours
            ? 'Paiement en cours...'
            : paiementReussi
            ? 'Paiement réussi ✅'
            : 'Payer avec Lygos'}
        </button>

        {messageErreur && <p className="text-red-400 mt-2">{messageErreur}</p>}
      </form>
    </section>
  );
}
