const router = require('express').Router();
const ReSchedule = require('../models/ReSchedule');
const Schedule = require('../models/Schedule');

router.post('/customer/reschedule', async (req, res) => {
  ReSchedule.findOne({ _id: req.body.idReSchedule }).then(async (savedReSch) => {
    if (savedReSch) {
      // console.log(" Toi ton tai ")
      let setReSch = await ReSchedule.findOneAndUpdate(
        {
          _id: req.body.idReSchedule
        },
        {
          $set: {
            date: req.body.date,
            time: req.body.time
          }
        },
        {
          upsert: true
        }
      );
      return res.send(setReSch);
    }
    const reSchedule = new ReSchedule({
        schedule: req.body.idSchedule,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status
    });
      try {
          await reSchedule.save();
          res.send(reSchedule);
          } catch (error) {
          console.log('Data error, ', error);
          return res.status(422).send({ Error: error.message });
      }
  })
});

router.get("/customer/reschedules", async (req, res) => {
  try {
    let reSchedules = await ReSchedule.find().populate("schedule").exec();
    res.send({ reSchedules });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customer=:idCustomer/reschedules", async (req, res) => {
    const { idCustomer } = req.params; 
    try {
      let reschedule = await Schedule.find({ idCustomer:  idCustomer, status:'Dời' }).populate(" idStaff idCustomer idService reSchedule").exec();
      console.log('Res',reschedule);
      res.send({ reschedule});
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/reschedule/status=0", async (req, res) => {
  try {
    let putStatusS = await Schedule.findOneAndUpdate(
      {
        _id: req.body.idSchedule
      },
      {
        $set: {
          status: 0
        }
      },
      {
        upsert: true
      }
    );
    let putStatusReS = await ReSchedule.findOneAndUpdate(
      {
        _id: req.body.idReSchedule
      },
      {
        $set: {
          status: 0
        }
      },
      {
        upsert: true
      }
    );
    res.send({
      putStatusReS
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

module.exports = router;