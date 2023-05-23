const router = require('express').Router();
const Pet = require('../models/Pet');
router.post('/pets', async (req, res) => { 
    try {
        const newPets = new Pet({
            owner: req.body.owner,
            name: req.body.name,
            image: req.body.image,
            type: req.body.type,
            breed: req.body.breed,
            gender: req.body.gender,
           
        })
        const pets = await newPets.save();
        const weight = await Pet.updateOne(
          {
            _id: pets._id
          },
          {
            $push: {
                  weight: {
                    weight: req.body.weight,
                    date: new Date(),
                }
                
            }
          }
        );
      res.send(pets);
      
    } catch (error) {
         console.log("Data error: ", error);
         return res.status(422).send({ Error: error.message });
    }
})

router.get('/customer=:id/pets', async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.params.id, status:1 });
        res.send({pets})
        
    } catch (error) {
          console.log("Data error: ", error);
          return res.status(422).send({ Error: error.message });
    }
})

router.put('/pets=:id/status=0', async (req, res) => {
  try {
    console.log("id:", req.params.id);
    const pets = await Pet.updateOne({ _id: req.params.id }, {
      $set: {
        status: 0,
      }
    });
    res.send({ pets });
    
  } catch (error) {
      console.log("Data error: ", error);
          return res.status(422).send({ Error: error.message });
  }
})

router.put('/pet=:id/profile', async (req, res) => {
  try {
    console.log(" Tham so truyen: ", req.params.id);
    const pets = await Pet.updateOne({
      _id: req.params.id},{
      $set: {
          name: req.body.name,
          type: req.body.type,
          breed:req.body.breed,
          gender: req.body.gender,
          image: req.body.image,
         
      },
      $push: {
           weight: {
            date: new Date(),
            weight: req.body.weight,
        }
        }
      }) 
    res.send({ pets });

  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
})

// Them thong tin theo doi dv vao thú cưng
router.put('/pets=:id/schedule', async (req, res) => {
  const { nameStaff, titleService, note } = req.body;
  let follow;
  try {
    if (note === null) {
      follow = await Pet.updateOne({
          _id: req.params.id
        },{
          $push: {
           history: {
             idService: titleService,
             idStaff: nameStaff,
             date: new Date(),
             time:new Date().toLocaleTimeString(),
            },
         }
      })
      
    } else {
      follow = await Pet.updateOne({
          _id: req.params.id
        },{
          $push: {
           history: {
             idService: titleService,
             idStaff: nameStaff,
             date: new Date(),
             time:new Date().toLocaleTimeString(),
             note: note,
          },
         }
      })
    }
    res.send({ follow });
        
    } catch (error) {
          console.log("Data error: ", error);
          return res.status(422).send({ Error: error.message });
    }
})


module.exports = router;