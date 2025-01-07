const userseller = require("../model/userSeller");

const { getPaypalAccessToken } = require("../../services/paypalServices");
const { getMerchantId } = require("../../services/getMerchantId");

const PAYPAL_API_URL = "https://api.sandbox.paypal.com";
// Llamada a la función

const createPartnerReferral = async (sellerId) => {
  const { default: fetch } = await import("node-fetch");
  try {
    const seller = await userseller.findById(sellerId);

    if (!seller) {
      throw new Error("Vendedor no encontrado.");
    }

    // Obtener el token de acceso de PayPal
    const accessToken = await getPaypalAccessToken();
    console.log("token!!!!:", accessToken);

    if (!accessToken) {
      throw new Error("No se pudo obtener el access token de PayPal.");
    }

    // Crear el payload con los datos del vendedor
    const payload = {
      email: seller.email,
      tracking_id: seller.trackingId,
      partner_config_override: {
        return_url: "http://localhost:3000/", // URL para redirigir después del proceso de onboarding
        return_url_description:
          "La URL para redirigir al vendedor después del proceso de integración.",
      },
      operations: [
        {
          operation: "API_INTEGRATION",
          api_integration_preference: {
            rest_api_integration: {
              integration_method: "PAYPAL",
              integration_type: "THIRD_PARTY",
              third_party_details: {
                features: [
                  "PAYMENT", // Funcionalidad de pagos
                  "REFUND", // Funcionalidad de reembolsos
                ],
              },
            },
          },
        },
      ],
      products: ["EXPRESS_CHECKOUT"], // Producto que vas a usar (en este caso Express Checkout)

      legal_consents: [
        {
          type: "SHARE_DATA_CONSENT",
          granted: seller.legal_consents?.granted, // Consentimiento para compartir datos
        },
      ],
    };
    //console.log("Payload enviado a PayPal:", payload);

    // Realizar la solicitud a la API de PayPal para crear el Partner Referral
    const response = await fetch(
      `${PAYPAL_API_URL}/v2/customer/partner-referrals`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    console.log("Código de estado de la respuesta de PayPal:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        "Error en la creación del Partner Referral: " + errorData.message
      );
    }

    // Devolver la respuesta de PayPal si todo salió bien
    const data = await response.json();
    console.log("Respuesta completa de PayPal:", JSON.stringify(data, null, 2));

    const actionUrl = data.links.find(
      (link) => link.rel === "action_url"
    )?.href;
    if (actionUrl) {
      seller.actionUrl = actionUrl; // Guardar la URL en el campo `actionUrl`
      await seller.save(); // Actualizar el vendedor en la base de datos
      console.log("URL de acción guardada en la base de datos:", actionUrl);
    } else {
      console.warn("No se encontró la URL de acción en la respuesta.");
    }

    const referralUrl = data.links.find((link) => link.rel === "self")?.href;
    console.log("URL del partner referral:", referralUrl);

    const merchantId = await getMerchantId(accessToken, referralUrl);
    // console.log("Merchant ID:", merchantId);

    // Aquí es donde guardamos el paypalMerchantId

    if (merchantId) {
      seller.paypalMerchantId = merchantId;
      console.log("se actualizo con exito"); // Actualizar el paypalMerchantId del vendedor
    } else {
      console.warn("No se encontró el merchant_id en la respuesta de PayPal.");
    }

    await seller.save();

    return data;
  } catch (error) {
    console.error("Error en createPartnerReferral:", error.message);
    throw error; // Propaga el error para que sea manejado más adelante
  }
};

module.exports = { createPartnerReferral };
