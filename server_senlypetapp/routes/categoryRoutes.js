const router = require("express").Router();
const Category = require("../models/Category");

// Thêm mới một danh mục 
router.post("/category", async (req, res) => {
    const { type } = req.body; 
  try {
    const category = new Category({
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
router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    res.send({ categories });

  } catch (error) {
    console.log("Data err: ", error);
      return res.status(422).send({ Error: error.message });
  }
});

// Lấy một danh mục 
router.get("/categories/:animal", async (req, res) => {
  try {
    let getanimal = await Category.find({ animal: req.params.animal })
    res.send({ 
      getanimal
    });
  } catch (err) {
    console.log("Data error: ", err)
    res.status(422).json({
      Error: err.message,
    });
  }
});

// Cap nhat mot danh muc
router.put("/category/:id", async (req, res) => {
  try {
    let putCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          type,
          animal
        }
      },
      {
        upsert: true
      }
    );
    res.send({
      putCategory
    });
  } catch (err) {
    res.status(422).json({
      Error: err.message
    });
  }
});

// Xóa 1 danh mục
router.delete("/category/:id", async (req, res) => {
  try {
    let deletedBook = await Category.findOneAndDelete({ _id: req.params.id });
    if (deletedBook) {
      res.json({
        status: true,
        message: "Successfully deleted"
      });
    }
  } catch (err) {
    console.log("Data error:", err);
    res.status(422).json({Error: err.message
    });
  }
});

module.exports = router;
