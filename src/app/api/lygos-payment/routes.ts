import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      reseau,
      service,
      quantite,
      prix,
      email,
      whatsapp,
      numeroPayeur,
      lienCompte,
    } = body;

    if (
      !reseau ||
      !service ||
      !quantite ||
      !prix ||
      !email ||
      !whatsapp ||
      !numeroPayeur ||
      !lienCompte
    ) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.LYGOS_API_KEY;
    const SITE_URL = process.env.SITE_URL || "https://growthify-tau.vercel.app";

    if (!API_KEY) {
      return NextResponse.json(
        { message: "Clé API Lygos non configurée" },
        { status: 500 }
      );
    }

    const ORDER_ID = uuidv4();

    const queryParams = new URLSearchParams({
      order_id: ORDER_ID,
      reseau,
      service,
      quantite: quantite.toString(),
      prix: prix.toString(),
      email,
      whatsapp,
      numeroPayeur,
      lienCompte,
    });

    const SUCCESS_URL = `${SITE_URL}/success?${queryParams.toString()}`;
    const FAILURE_URL = `${SITE_URL}/failure`;

    const payload = {
      amount: prix,
      shop_name: "Growthify",
      message: `Commande ${service} x${quantite} sur ${reseau}`,
      success_url: SUCCESS_URL,
      failure_url: FAILURE_URL,
      order_id: ORDER_ID,
    };

    const response = await fetch("https://api.lygosapp.com/v1/gateway", {
      method: "POST",
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: "Erreur API Lygos : " + errorText },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      message: "Lien de paiement généré avec succès",
      paymentLink: data.link,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
