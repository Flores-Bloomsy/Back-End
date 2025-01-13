const { default: mongoose } = require("mongoose");
const BouquetFlower = require("../model/bouquet.model");
const createError = require("http-errors");

async function createNewBouquet(data) {
  const newBouquet = (await BouquetFlower.create(data)).populate("ownerId");

  return newBouquet;
}

async function getAllBouquet() {
  const bouquetsFlower = await BouquetFlower.find({}).populate([
    { path: "ownerId" },
  ]);
  if (bouquetsFlower.length === 0)
    throw createError(200, "no bouquets created");

  return bouquetsFlower;
}

async function getById(id) {
  const findBouquet = await BouquetFlower.findById(id).populate([
    { path: "ownerId" },
  ]);
  if (!findBouquet) throw createError(404, "bouquet not found");

  return findBouquet;
}

async function updateById(id, ownerId, newData) {
  const findBouquet = await BouquetFlower.findById(id);
  if (!findBouquet) throw createError(404, "bouquet not found");

  if (newData.ownerId)
    throw createError(400, "The ownerId property cannot be changed");

  if (findBouquet.ownerId.toString() !== ownerId._id.toString())
    throw createError(403, "you don't have permission to update this bouquet");

  const updateBouquet = await BouquetFlower.findByIdAndUpdate(id, newData, {
    new: true,
  });
  return updateBouquet;
}

async function deleteById(idBouquet, ownerId) {
  const findBouquet = await BouquetFlower.findById(idBouquet);
  if (!findBouquet) throw createError(404, "bouquet not found");

  if (findBouquet.ownerId.toString() !== ownerId._id.toString())
    throw createError(403, "you don't have permission to deleted this bouquet");

  const deleteBouquet = await BouquetFlower.findByIdAndDelete(idBouquet);
  return deleteBouquet;
}

//traer todos los bouquets por el id del vendedor
async function getBouquetByOwnerId(ownerId) {
  if (!mongoose.Types.ObjectId.isValid(ownerId))
    throw createError(400, "Invalid owner ID");

  const bouquets = await BouquetFlower.find({ ownerId });
  if (!bouquets.length) throw createError(404, "bouquets not found");

  return bouquets;
}

async function getBouquetByFilter(filters) {
  const requiredFields = ["occasion", "size", "color", "style", "flowerType"];

  // Verifica que todos los campos requeridos estén presentes
  for (const field of requiredFields) {
    if (
      !filters[field] ||
      typeof filters[field] !== "string" ||
      filters[field].trim() === ""
    ) {
      throw createError(404, `El campo '${field}' es obligatorio`);
    }
  }
  // Verifica que no haya propiedades adicionales a las requeridas
  const filterKeys = Object.keys(filters);
  const extraFields = filterKeys.filter((key) => !requiredFields.includes(key));
  if (extraFields.length > 0) {
    throw createError(
      400,
      `Los campos '${extraFields.join(", ")}' no son permitidos`
    );
  }
  //estructura para buscar en un objeto anidado
  const query = {
    "details.occasion": { $in: filters.occasion },
    "details.size": filters.size,
    "details.color": { $in: filters.color },
    "details.style": filters.style,
    "details.flowerType": { $in: filters.flowerType },
  };

  let resultFilter = await BouquetFlower.find(query).limit(3);
  console.log("Consulta", query);

  // Si no se encuentran resultados con la consulta exacta
  if (!resultFilter.length) {
    const fallbackQuery = {
      "details.occasion": { $in: filters.occasion },
      "details.color": { $in: filters.color },
      "details.flowerType": { $in: filters.flowerType },
    };
    console.log("Consulta de respaldo:", fallbackQuery);

    resultFilter = await BouquetFlower.find(fallbackQuery).limit(3);
  }

  // Si aún no se encuentran resultados, buscamos solo por  tipo de flor(flowerType)
  if (!resultFilter.length) {
    const finalFallbackQuery = {
      "details.flowerType": { $in: filters.flowerType },
    };
    console.log("Consulta final de respaldo:", finalFallbackQuery);

    resultFilter = await BouquetFlower.find(finalFallbackQuery).limit(3);
  }

  console.log("Resultado final:", resultFilter);

  return resultFilter;
}

module.exports = {
  createNewBouquet,
  getAllBouquet,
  getById,
  deleteById,
  updateById,
  getBouquetByOwnerId,
  getBouquetByFilter,
};
