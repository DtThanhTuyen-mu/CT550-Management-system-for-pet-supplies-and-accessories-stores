const router = require("express").Router();
const Product = require("../models/Product");

router.post("/product", async (req, res) => {
  //   res.send("This is Product Page");
  // console.log(req.body);
  //const { type, animal } = req.body;
  const {
    category,
    title,
    image,
    price,
    storage,
    delivery,
    description,
    unit
  } = req.body;
  try {
    const product = new Product({
      title,
      description,
      price,
      image,
      storage,
      delivery,
      category,
      unit
    });
    await product.save();
    res.send({ product });
  } catch (error) {
    console.log("Data error", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    let products = await Product.find({ status: 1 })
      .populate("category")
      .exec();
    res.send({ products });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Yeu cau lay 1 san pham
router.get("/product/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send({ product });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/product/categoryid/:id", async (req, res) => {
  try {
    let product = await Product.find({ category: req.params.id });
    res.send({ product });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Put yeu cau - cap nhat mot cuon sach
router.put("/product/editproduct/:id", async (req, res) => {
  const { category, title, image, price, storage, delivery, description } =
    req.body;
  try {
    let product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title,
          price,
          image,
          description,
          storage,
          delivery,
          category
        }
      },
      {
        upsert: true
      }
    );
    res.send({ product });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

//Delete - xoa 1 cuon sach
router.put("/product/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.updateOne(
      {
        _id: req.params.id
      },
      {
        $set: {
          status: 0
        }
      }
    );
    res.send({ deletedProduct });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;
