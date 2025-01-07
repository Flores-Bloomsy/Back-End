const userSellerSchema = require("../model/userSeller");
const User = require("../model/userBuyer");

const { getPaypalAccessToken } = require("../../services/paypalServices");

const createOrder = async (req, res) => {
  const cart = req.body;

  // console.log("Cart:", JSON.stringify(cart, null, 2));
  const buyEmail = await getCustomerEmailById(cart.customerId);
  //console.log("Buyer Email:", buyEmail);

  // Obtener el token de acceso (asegúrate de que esta función ya esté implementada)
  const accessToken = await getPaypalAccessToken();

  const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders`;

  // Extraer los productos y vendedores del carrito
  const purchaseUnits = await Promise.all(
    cart.products.map(async (product, index) => {
      const seller = await getSellerEmailById(product.sellerId);
      const sellerEmail = seller.email;
      const paymentMerchantId = seller.paypalMerchantId;
      return {
        reference_id: `${cart.orderNumber}-${index + 1}`,
        amount: {
          currency_code: "USD", // Aquí puedes ajustarlo si necesitas otra moneda
          value: product.totalPrice.toFixed(2), // Total por producto
        },
        payee: {
          email_address: sellerEmail, // Ahora deberías tener el email del vendedor correctamente
        },
        payment_instruction: {
          disbursement_mode: "INSTANT", // Pago inmediato
          platform_fees: [
            {
              amount: {
                currency_code: "USD",
                value: (product.totalPrice * 0.1).toFixed(2), // Ejemplo de comisión del 10%
              },
            },
          ],
        },
        merchant_id: paymentMerchantId,
      };
    })
  );
  //console.log("Purchase Units:", JSON.stringify(purchaseUnits, null, 2));

  // Crear el cuerpo de la solicitud
  const payload = {
    intent: "CAPTURE",
    purchase_units: purchaseUnits,
    payer: {
      email_address: buyEmail, // Correo del comprador
    },

    custom_id: cart.orderNumber, // Puedes agregar un identificador personalizado
  };

  //console.log("Payload:", JSON.stringify(payload, null, 2));

  // Realizar la solicitud a la API de PayPal
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const responseBody = await response.json();
  //console.log("PayPal response:", responseBody);

  // Manejar la respuesta

  res.status(response.status).json(responseBody);
  return response;
};

const getSellerEmailById = async (sellerId) => {
  const seller = await userSellerSchema.findById(sellerId);
  //console.log("Seller found:", seller);
  return seller ? seller.email : null;
};

const getCustomerEmailById = async (customerId) => {
  const customer = await User.findById(customerId);
  //console.log("Seller found:", customer);
  return customer ? customer.email : null;
};

module.exports = { createOrder };
