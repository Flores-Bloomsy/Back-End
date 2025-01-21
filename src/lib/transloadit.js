const { TRANSLOADIT_KEY, TRANSLOADIT_SECRET, TRANSLOADIT_TEMPLATE_ID } =
  process.env;
const Transloadit = require("transloadit");
const createError = require("http-errors");

//para subir archivos a aws(s3)
async function uploadQRtoS3(buffer) {
  try {
    if (!buffer || buffer.length === 0)
      throw createError(
        400,
        "El archivo está vacío o no tiene el formato esperado."
      );

    const transloadit = new Transloadit({
      authKey: TRANSLOADIT_KEY,
      authSecret: TRANSLOADIT_SECRET,
    });

    const options = {
      files: {
        file1: buffer,
      },
      params: {
        template_id: TRANSLOADIT_TEMPLATE_ID,
      },
      waitForCompletion: true,
    };

    const status = await transloadit.createAssembly(options);

    if (!status.ok)
      throw createError(500, "El ensamblaje de Transloadit falló.");
    console.log(status.results.resize[0].ssl_url);
    if (status.results.resize) {
      //regresa la url de S3
      return status.results.resize[0].ssl_url;
    } else {
      throw createError(
        404,
        "No se encontró el archivo procesado en la respuesta."
      );
    }
  } catch (error) {
    throw createError(
      400,
      error.message || "Error al intentar cargar el archivo a Transloadit."
    );
  }
}

module.exports = { uploadQRtoS3 };
