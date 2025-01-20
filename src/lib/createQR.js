const QRCode = require("qrcode");
const createError = require("http-errors");
const { uploadQRtoS3 } = require("../lib/transloadit");
const fs = require("fs");
const path = require("path");

const { FRONTEND_URL_PAGE } = process.env;

async function createQR(idFromMessage) {
  const qrCodeBasePath = path.resolve("qrCode");

  //crea la direccion donde se guardara la archvio
  const filepath = path.resolve(qrCodeBasePath, `qrcode_${idFromMessage}.webp`);
  //idFromMessage es el id de la orden donde esta el mensaje personalizado
  try {
    if (!FRONTEND_URL_PAGE || !idFromMessage)
      throw createError(
        404,
        "Faltan datos obligatorios: FRONTEND_URL_PAGE o idFromMessage"
      );

    //creamos un QR en buffer que va a redirigir a una pagina
    const qrCode = await QRCode.toBuffer(
      `${FRONTEND_URL_PAGE}/customMessage/${idFromMessage}`,
      {
        errorCorrectionLevel: "H",
      }
    );

    //crea la carpeta donde se crearan los archivos .web de los QR
    if (!fs.existsSync(qrCodeBasePath))
      fs.mkdirSync(qrCodeBasePath, { recursive: true });

    // Escribir temporalemente el archivo QR en el sistema
    fs.writeFileSync(filepath, qrCode, "buffer");

    //sube archivo en S3
    const result = await uploadQRtoS3(filepath);

    fs.unlinkSync(filepath);

    return result;
  } catch (error) {
    throw error;
  } finally {
    // Eliminar archivo temporal
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
}
module.exports = { createQR };
