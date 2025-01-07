const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_OAUTH_URL = "https://api.sandbox.paypal.com/v1/oauth2/token";

let cachedToken = null;
let tokenExpirationTime = null;

const getPaypalAccessToken = async () => {
  const currentTime = Date.now();

  // Si el token está cacheado y no ha expirado, reutilizarlo
  if (cachedToken && tokenExpirationTime > currentTime) {
    return cachedToken;
  }
  const { default: fetch } = await import("node-fetch");
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`
  ).toString("base64");

  const response = await fetch(PAYPAL_OAUTH_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64Token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const data = await response.json();
  if (data.access_token) {
    cachedToken = data.access_token;
    tokenExpirationTime = currentTime + data.expires_in * 1000;
    return cachedToken;
  } else {
    console.error("Error obteniendo el access token:", data);
    return null;
  }
};

module.exports = { getPaypalAccessToken };
