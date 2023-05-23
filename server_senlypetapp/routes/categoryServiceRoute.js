const router = require("express").Router();
const CategoryService = require("../models/CategoryService");

// Thêm mới một danh mục 
router.post("/categoryservice", async (req, res) => {
    const { type } = req.body; 
  try {
    const category = new CategoryService({
      type,
    });
    await category.save(); 
    res.send({ category }); 
   } catch (error) {
      console.log("Database err", error);
      return res.status(422).send({ Error: error.message });
    }
});
// Lấy ra toàn bộ danh mục 
router.get("/categoriesservice", async (req, res) => {
  try {
    let categories = await CategoryService.find();
    res.send({ categories });

  } catch (error) {
    console.log("Data err: ", error);
      return res.status(422).send({ Error: error.message });
  }
});
module.exports = router;
