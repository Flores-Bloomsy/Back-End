process.loadEnvFile();

const { Router } = require("express");
const bouquetUseCase = require("../usecases/bouquetFlower.usecases");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const createError = require("http-errors");

const router = Router();

//create new Bouquet
router.post("/create-bouquet", auth, authorize("seller"), async (req, res) => {
  try {
    const data = req.body;
    const ownerId = req.user;

    if (data.sold)
      throw createError(
        409,
        "'sold' field should not be provided and cannot be modified"
      );

    const bouquet = await bouquetUseCase.createNewBouquet({
      ...data,
      ownerId: ownerId._id,
    });

    res.json({
      success: true,
      message: "bouquet created",
      data: { bouquet },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

// get all Bouquet
router.get("/get-bouquets", async (req, res) => {
  try {
    const allBouquets = await bouquetUseCase.getAllBouquet();

    res.json({
      success: true,
      message: "all bouquets",
      data: { allBouquets },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

//get bouquet by id
router.get("/get-bouquet-by-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getBouquetById = await bouquetUseCase.getById(id);

    res.json({
      succes: true,
      message: "bouquet found",
      data: { getBouquetById },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

//update bouquet by id
router.patch("/update/:id", auth, authorize("seller"), async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const ownerId = req.user;
    if (newData.sold) throw createError(409, "sold is not modifiable");

    const updateBouquet = await bouquetUseCase.updateById(id, ownerId, newData);

    res.json({
      success: true,
      message: "updated Bouquet",
      data: { updateBouquet },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

//delete bouquet by id
router.delete("/delete/:id", auth, authorize("seller"), async (req, res) => {
  try {
    const id = req.params.id;
    const ownerId = req.user;

    const deleteBouquet = await bouquetUseCase.deleteById(id, ownerId);

    res.json({
      success: true,
      message: "deleted bouquet",
      data: { deleteBouquet },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

//get bouquets by ownerId
router.get(
  "/get-seller-bouquets/",
  auth,
  authorize("seller"),
  async (req, res) => {
    try {
      const ownerId = req.user.id;
      console.log("ownerId:", ownerId);
      const bouquets = await bouquetUseCase.getBouquetByOwnerId(ownerId);

      res.json({
        success: true,
        message: "bouquets found",
        data: bouquets,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

//get bouquets by details filter
router.get("/search", async (req, res) => {
  try {
    const filters = req.query;
    console.log(filters);

    const bouquetsFiltered = await bouquetUseCase.getBouquetByFilter(filters);
    res.json({
      success: true,
      message: "bouquets filtered",
      data: bouquetsFiltered,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
