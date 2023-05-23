const router = require("express").Router();
const News = require("../models/News");
const mongoose = require("mongoose");

require("dotenv").config();

router.post("/news", async (req, res) => {
  const { title, link, content } = req.body;
  try {
    const news = new News({
      title,
      link,
      content
    });
    await news.save();
    res.send({ news });
  } catch (error) {
    console.log("Data error", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/news", async (req, res) => {
  try {
    let news = await News.find();
    res.send({ news });
  } catch (error) {
    console.log("Data error", error);
    return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;
