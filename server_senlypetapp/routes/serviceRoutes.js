const router = require('express').Router();
const Service = require('../models/Service');

router.post("/service", async (req, res) => {
    console.log(req.body);
    try {
        const service = new Service({
          title: req.body.title,
          image: req.body.image,
          category: req.body.category,
          times: req.body.times,
        });
        await service.save(function (err, result) {
            if (err) { }
            res.json(result);
        });
        // res.send({ service });
        
    } catch (error) {
        console.log(" Data error: ", error);
        return res.status(422).send({Error: error.message})
    }
})

router.put("/service/:id", async (req, res) => {
    try {
      let service = await Service.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            image: req.body.image
          }
        },
        {
          upsert: true
        }
      );
      
        res.send({ service });
        
    } catch (error) {
        console.log(" Data error: ", error);
        return res.status(422).send({Error: error.message})
    }
})

// POST price  - cap nhat mot cuon sach
router.post("/service/price/:id", async (req, res) => {
    console.log(req.body);
  try {
    let service = await Service.updateOne(
      { _id: req.params.id },
      {
          $push: {
            price: {
                  weight: req.body.weight,
                  byweight: req.body.byweight,
              },
          }
      },
    );
    res.send({ service });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.post("/service/price/delete/:id", async (req, res) => {
  try {
    let service = await Service.updateMany(
      { _id: req.params.id },
      {
          $unset: {
              price: {
                  weight: "",
                  byweight: "",
              },
          }
      },
    );
    res.send({ service });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// POST description  - cap nhat mot cuon sach
router.post("/service/description/:id", async (req, res) => {
   try {
    let service = await Service.updateOne(
      { _id: req.params.id },
      {
        $push: {
            description: {
                  title: req.body.title,
                  content: req.body.content,
            } 
        }
      },
    
    );
    res.send({ service });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.post("/service/description/delete/:id", async (req, res) => {
  try {
    let service = await Service.updateOne(
      { _id: req.params.id },
      {
        $unset: {
          description: {
            title: "",
            content: "",
          }
        }
      },
       );

    res.send({ service });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/services", async (req, res) => {
  try {
    let getServices = await Service.find({ status: 1 });
    res.send({ getServices });
   
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/category=combo/services", async (req, res) => {
  try {
    let getServices = await Service.find({
      status: 1 ,
      category: "640fde8a60c354b7006669f0"
    }).populate("category").exec();
    res.send({ getServices });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/category=package/services", async (req, res) => {
  try {
    let getServices = await Service.find({
      status: 1,
      category: "640fde9860c354b7006669f2"
    })
      .populate("category")
      .exec();
    res.send({ getServices });
  } catch (error) {
    console.log("Data err: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/service/:id", async (req, res) => {
    try {
        let service = await Service.findById(req.params.id )
        res.send({ service });
    } catch (error) {
          console.log(" Data error: ", error);
          return res.status(422).send({ Error: error.message });
    }
})
router.get("/service=:id/weight=:w", async (req, res) => {
  const { id, w } = req.params;
  let pr;
    try {
      let service = await Service.findById(id);
      const t = service.price;
      
        console.log("chieu dai", service.price);
    
         Object.entries(t).forEach(async ([key, val]) => {
            console.log('key', key); // 👉️ name, country
            // console.log(t[key]); // 👉️ James, Chile
              // for (let j = 0; j < val.length; j++) {
                if ( w < 2) {
                  console.log('val 1 ', val[0]);
                  pr=val[0];
                } else if(w < 5){
                  console.log('val 2 ', val[1]);
                  pr = val[1];
                } else if ( w < 7) {
                  pr = val[2];
                  console.log('val 3 ', val[2]);
                } else if ( w < 10) {
                  pr=val[3];
                  console.log('val 4 ', val[3]);
                } else if ( w < 15) {
                  console.log('val 5 ', val[4]);
                  pr = val[4];
                } else if (w < 20) {
                  console.log('val 6 ', val[5]);
                  pr= val[5];
                } else if ( w < 30) {
                  console.log('val 7 ', val[6]);
                  pr=val[6];
                } else {
                  console.log('val 8 ', val[7]);
                  pr = val[7];
              }
            })
      res.send({pr});
        
    } catch (error) {
          console.log(" Data error: ", error);
          return res.status(422).send({ Error: error.message });  
    }
})

router.put("/service/idservice/:id", async (req, res) => {
  try {
    let deletedService = await Service.updateOne({
      _id: req.params.id
    }, {
      $set: {
        status:0,
      }
    });
     res.send({ deletedService });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;