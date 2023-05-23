const router = require('express').Router();
const Salary = require('../models/Salary');
const date = require("date-fns");
const format = date.format;

router.post("/salary", async (req, res) => {
    console.log("ok");
    try {
        const salary = new Salary({
            staff: req.body.staff,
            salary: req.body.salary,
        })
        await salary.save();
        res.send({ salary });
        
    } catch (error) {
          console.log(" Data error: ", error);
          return res.status(422).send({ Error: error.message });
    }
})

router.get("/salaries", async (req, res) => {
    try {
        let salary = await Salary.find();
        res.send({ salary });
    } catch (error) {
           console.log(" Data error: ", error);
           return res.status(422).send({ Error: error.message });
    }
})

router.post("/salary/staff=:id", async (req, res) => {
    const id = req.params.id;
    try {
        let ss = await Salary.updateOne(
            { staff: req.params.id },
            {
            $set: {
                salary: req.body.salary,
            }
            })
        res.send({ ss });
       
    } catch (error) {
          console.log(" Data error: ", error);
          return res.status(422).send({ Error: error.message });
    }
})

router.post("/salary/bonus/staff=:id", async (req, res) => {
     const id = req.params.id;
    try {
        console.log("id: " + id);
         let ss = await Salary.updateOne(
           { staff: req.params.id },
           {
             $push: {
                   bonus: {
                    reward: req.body.bonus,
                    month: format(new Date, 'MM/yyyy')
                   } ,
             }
           }
         );
         res.send({ ss });
        
    } catch (error) {
          console.log(" Data error: ", error);
          return res.status(422).send({ Error: error.message });
    }
})

module.exports = router;