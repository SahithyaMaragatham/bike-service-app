const express = require("express");
const serviceController = require("../controllers/serviceController");
const router = express.Router();

router.post("/", serviceController.createService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);
router.get("/", serviceController.getAllServices);

module.exports = router;
