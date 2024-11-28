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

module.exports = {
  createNewBouquet,
  getAllBouquet,
  getById,
  deleteById,
  updateById,
};
