const router = require("express").Router()
const typeController = require("../controllers/type.controllers")

router
    .get("/", typeController.getTypes)
    .post("/add-type", typeController.addType)
    .put("/update-type/:id", typeController.updateType)
    .delete("/delete-type/:id", typeController.deleteType)

module.exports = router
