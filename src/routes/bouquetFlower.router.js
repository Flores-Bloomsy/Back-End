process.loadEnvFile();

const { Router } = require("express");
const createError = require("http-errors");
const bouquetUseCase = require("../usecases/bouquetFlower.usecases");
const auth = require("../middleware/auth");

const router = Router();

//create new Bouquet
router.post("/", auth, async (req, res) => {
  try {
    const data = req.body;
    const ownerId = req.userSeller;
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.patch("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const ownerId = req.userSeller;

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
router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const ownerId = req.userSeller;

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

module.exports = router;
