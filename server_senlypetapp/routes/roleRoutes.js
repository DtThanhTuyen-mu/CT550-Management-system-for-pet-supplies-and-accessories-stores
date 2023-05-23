const router = require("express").Router();
const Role = require("../models/Role");

router.post("/role", async (req, res) => {
  console.log(req.body);
  try {
      let newRole = new Role();
      newRole.code = req.body.code;
      newRole.name = req.body.name;
    const role= await newRole.save();
    res.send({ role });
  } catch (error) {
    console.log("Data error", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/roles", async (req, res) => {
    try {
        let roles = await Role.find();
        res.send({ roles });
    } catch (error) {
        console.log("Data error: ", error);
        return res.status(422).send({ Error: error.message });
    }
})

router.delete("/role", async (req, res) => {
    try {
        let roles = await Role.findOneAndDelete({_id:req.body.id});
        res.send({ roles });
        
    } catch (error) {
        console.log("Data error: ", error);
        return res.status(422).send({ Error: error.message });
    }
})

module.exports = router;