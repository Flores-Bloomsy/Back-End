const orderModel = require("../src/model/order.model");

async function getMerchantId(accessToken, referralToken) {
  // console.log({ referralToken });
  // console.log({ accessToken });
  const { default: fetch } = await import("node-fetch");

  try {
    const response = await fetch(referralToken, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data.partner_referral_id;
  } catch (error) {
    console.error(
      "Error al obtener el Merchant ID:",
      error.response?.data || error.message
    );
  }
}
module.exports = { getMerchantId };
