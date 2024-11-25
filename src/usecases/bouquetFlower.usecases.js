const BouquetFlower = require("../model/bouquet.model");
const createError = require("http-errors");

async function createNewBouquet(data) {
  const newBouquet = (await BouquetFlower.create(data)).populate("userId");

  return newBouquet;
}

async function getAllBouquet() {
  const bouquetsFlower = BouquetFlower.find({}).populate([{ path: "userId" }]);
  return bouquetsFlower;
}

async function getById(id) {
  const findBouquet = await BouquetFlower.findById(id).populate([
    { path: "userId" },
  ]);
  if (!findBouquet) createError(404, "bouquet not found");

  return findBouquet;
}

async function updateById(id, userId, newData) {
  const findBouquet = await BouquetFlower.findById(id);
  if (!findBouquet) throw createError(404, "bouquet not found");

  if (findBouquet.userId.toString() !== userId._id.toString())
    throw createError(403, "you don't have permission to update this bouquet");

  const updateBouquet = await BouquetFlower.findByIdAndUpdate(id, newData, {
    new: true,
  });
  return updateBouquet;
}

async function deleteById(idBouquet, userId) {
  const findBouquet = await BouquetFlower.findById(idBouquet);
  if (!findBouquet) throw createError(404, "bouquet not found");

  if (findBouquet.userId.toString() !== userId._id.toString())
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
