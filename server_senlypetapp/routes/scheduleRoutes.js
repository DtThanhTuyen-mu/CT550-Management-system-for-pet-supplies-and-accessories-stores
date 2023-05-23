const router = require("express").Router();
const ReSchedule = require("../models/ReSchedule");
const Schedule = require("../models/Schedule");
const date = require("date-fns");
const format = date.format;

router.post("/customer/:customer/schedule", async (req, res) => {
  try {
    const newSchedule = new Schedule({
      idStaff: req.body.idStaff,
      idCustomer: req.params.customer,
      idService: req.body.idService,
      idPets: req.body.idPets,
      date: new Date(req.body.date),
      time: req.body.time,
      weight: req.body.weight,
      price: req.body.price
    });
    const schedule = await newSchedule.save();
    res.send(schedule);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Lịch hẹn theo ngày
router.get("/schedules/currentdate", async (req, res) => {
  let schedulesD = [];
  console.log(format(new Date(), "dd/MM/yyyy"));
  try {
    let schedules = await Schedule.find()
      .populate("idStaff idCustomer idService reSchedule")
      .exec();
    for (let i = 0; i < schedules.length; i++) {
      console.log(format(new Date(schedules[i].date), "dd/MM/yyyy"));
      if (
        format(new Date(schedules[i].date), "dd/MM/yyyy") ==
        format(new Date(), "dd/MM/yyyy")
      ) {
        schedulesD.push(schedules[i]);
      }
    }

    res.send({ schedulesD });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Lịch hẹn theo tháng
router.get("/schedules/currentmonth", async (req, res) => {
  let schedulesM = [];
  try {
    let schedules = await Schedule.find()
      .sort({ date: -1 })
      .populate("idStaff idCustomer idService reSchedule")
      .exec();
    for (let i = 0; i < schedules.length; i++) {
      if (
        new Date(schedules[i].date).getMonth() + 1 ==
        new Date().getMonth() + 1
      ) {
        schedulesM.push(schedules[i]);
      }
    }
    res.send({ schedulesM });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customer/schedules", async (req, res) => {
  try {
    let schedules = await Schedule.find()
      .populate("idStaff idCustomer idService")
      .exec();
    res.send(schedules);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/customer=:idCustomer/schedule/status=2", async (req, res) => {
  // reqdate=[[2023-02-19T17:00:00.000Z, 2023-02-20T17:00:00.000Z, 2023-02-21T17:00:00.000Z, 2023-02-22T17:00:00.000Z, 2023-02-23T17:00:00.000Z, 2023-02-24T17:00:00.000Z, 2023-02-25T17:00:00.000Z], [2023-02-26T17:00:00.000Z, 2023-02-27T17:00:00.000Z, 2023-02-28T17:00:00.000Z, 2023-03-01T17:00:00.000Z, 2023-03-02T17:00:00.000Z, 2023-03-03T17:00:00.000Z, 2023-03-04T17:00:00.000Z], [2023-03-05T17:00:00.000Z, 2023-03-06T17:00:00.000Z, 2023-03-07T17:00:00.000Z, 2023-03-08T17:00:00.000Z, 2023-03-09T17:00:00.000Z, 2023-03-10T17:00:00.000Z, 2023-03-11T17:00:00.000Z]]
  //const date = new Date();//.toLocaleDateString();
  // console.log(req.params.idCustomer);
  try {
    let schedules = await Schedule.find({
      idCustomer: req.params.idCustomer,
      times: 1,
      status: 2
    })
      .populate("idStaff idCustomer idService")
      .exec();
    res.send(schedules);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customer=:idCustomer/schedule/status=-1or7", async (req, res) => {
  try {
    let schedules = await Schedule.find({
      idCustomer: req.params.idCustomer,
      $or: [{ status: -1 }, { status: 7, times: { $gte: 1 } }]
    })
      .populate("idStaff idCustomer idService reSchedule")
      .exec();
    res.send(schedules);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customer=:idCustomer/schedule/status=-1", async (req, res) => {
  try {
    let schedules = await Schedule.find({
      idCustomer: req.params.idCustomer,
      status: -1
    })
      .populate("idStaff idCustomer idService reSchedule")
      .exec();
    res.send(schedules);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customer=:idCustomer/schedule/status=6", async (req, res) => {
  // reqdate=[[2023-02-19T17:00:00.000Z, 2023-02-20T17:00:00.000Z, 2023-02-21T17:00:00.000Z, 2023-02-22T17:00:00.000Z, 2023-02-23T17:00:00.000Z, 2023-02-24T17:00:00.000Z, 2023-02-25T17:00:00.000Z], [2023-02-26T17:00:00.000Z, 2023-02-27T17:00:00.000Z, 2023-02-28T17:00:00.000Z, 2023-03-01T17:00:00.000Z, 2023-03-02T17:00:00.000Z, 2023-03-03T17:00:00.000Z, 2023-03-04T17:00:00.000Z], [2023-03-05T17:00:00.000Z, 2023-03-06T17:00:00.000Z, 2023-03-07T17:00:00.000Z, 2023-03-08T17:00:00.000Z, 2023-03-09T17:00:00.000Z, 2023-03-10T17:00:00.000Z, 2023-03-11T17:00:00.000Z]]
  //const date = new Date();//.toLocaleDateString();
  // console.log("lololo");
  // console.log(req.params.idCustomer);
  try {
    let schedules = await Schedule.find({
      idCustomer: req.params.idCustomer,
      $or: [{ status: 6 }, { status: 7 }]
    })
      .populate("idStaff idCustomer idService reSchedule")
      .exec();
    res.send(schedules);
    console.log(schedules.reSchedule);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customer/:customer/schedule", async (req, res) => {
  try {
    let schedules = await Schedule.find({ idCustomer: req.body.idCustomer });
    res.send(schedules);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: message });
  }
});

router.get("/staff=:idStaff/schedule", async (req, res) => {
  console.log(req.params);
  const sdate = [];
  try {
    let schedulesB = await Schedule.find({
      idStaff: req.params.idStaff,
      status: 2
    }).populate("idCustomer idService idStaff");
    for (let i = 0; i < schedulesB.length; i++) {
      sdate.push(schedulesB[i].date);
    }
    let schedulesA = await Schedule.find({
      idStaff: req.params.idStaff,
      $or: [{ status: -1 }, { status: 7 }]
    })
      .populate("idCustomer idService reSchedule idStaff")
      .exec();
    for (let i = 0; i < schedulesA.length; i++) {
      sdate.push(schedulesA[i].reSchedule.date);
    }

    res.send({
      schedulesB,
      schedulesA,
      sdate
    });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: message });
  }
});

router.get("/staff=:idStaff/schedulebydate", async (req, res) => {
  console.log(req.params);
  const sdate = [];
  let scheduleB = [];
  let scheduleA = [];
  try {
    let schedulesB = await Schedule.find({
      idStaff: req.params.idStaff,
      status: 2
    }).populate("idCustomer idService idStaff idPets");
    for (let i = 0; i < schedulesB.length; i++) {
      if (
        schedulesB[i].date.toLocaleDateString() ===
        new Date().toLocaleDateString()
      ) {
        scheduleB.push(schedulesB[i]);
      }
    }

    let schedulesA = await Schedule.find({
      idStaff: req.params.idStaff,
      $or: [{ status: -1 }, { status: 7 }]
    })
      .populate("idCustomer idService reSchedule idStaff idPets")
      .exec();

    for (let i = 0; i < schedulesA.length; i++) {
      if (
        schedulesA[i].reSchedule.date.toLocaleDateString() ===
        new Date().toLocaleDateString()
      )
        scheduleA.push(schedulesA[i]);
    }
    res.send({
      scheduleB,
      scheduleA
    });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: message });
  }
});
router.post("/staff/:idStaff/schedule", async (req, res) => {
  const { idStaff, date } = req.body;
  console.log("date tu req.body: ", new Date(date).toLocaleDateString());
  const datatime = [
    "08:00AM",
    "08:30AM",
    "09:00AM",
    "09:30AM",
    "10:00AM",
    "10:30AM",
    "11:00AM",
    "11:30AM",
    "13:30PM",
    "14:00PM",
    "14:30PM",
    "15:00PM",
    "15:30PM",
    "16:00PM",
    "16:30PM",
    "17:00PM",
    "17:30PM",
    "18:00PM",
    "18:30PM",
    "19:00PM",
    "19:30PM",
    "20:00PM",
    "20:30PM"
  ];
  let staffbydate = [];
  let time = [];
  try {
    let staffScheduleSs1 = await Schedule.find({
      idStaff: idStaff,
      status: -1
    })
      .populate("reSchedule")
      .exec();
    console.log("staff have schedule status -1: ", staffScheduleSs1);
    for (let j = 0; j < staffScheduleSs1.length; j++) {
      if (
        staffScheduleSs1[j].reSchedule.date.toLocaleDateString() ===
        new Date(date).toLocaleDateString()
      ) {
        staffbydate.push(staffScheduleSs1[j].reSchedule.time);
      }
    }

    let staffSchedule = await Schedule.find({
      idStaff: idStaff,
      $or: [{ status: 1 }, { status: 2 }]
    });
    console.log("staff have schedule status 1 , 2 : ", staffSchedule);
    for (let i = 0; i < staffSchedule.length; i++) {
      //  console.log(staffSchedule[i].date.toLocaleDateString());
      //  if (staffSchedule[i].date.toLocaleDateString() == '25/2/2023') {
      if (
        staffSchedule[i].date.toLocaleDateString() ===
        new Date(date).toLocaleDateString()
      ) {
        staffbydate.push(staffSchedule[i].time);
        console.log("staffbydate: ", staffbydate);

        time = datatime
          .filter((x) => !staffbydate.includes(x))
          .concat(staffbydate.filter((x) => !datatime.includes(x)));
      } else {
        console.log(" Khong co ");
        time = datatime;
      }
    }
    console.log("Filter: ", time);
    res.send(time);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/schedule/status=0", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
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
    res.send({
      putStatus
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/schedule/status=complete", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.body.idSchedule
      },
      {
        $set: {
          status: "Hoàn thành"
        }
      },
      {
        upsert: true
      }
    );
    if (putStatus.reSchedule !== undefined) {
      let sRe = await ReSchedule.findOneAndUpdate(
        {
          schedule: req.body.idSchedule
        },
        {
          $set: {
            status: "Hoàn thành"
          }
        },
        {
          upsert: true
        }
      );
    }
    res.send({
      putStatus
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/schedule/status=-1", async (req, res) => {
  try {
    let idRe = await ReSchedule.findOne({ schedule: req.body.idSchedule });
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.body.idSchedule
      },
      {
        $set: {
          status: -1,
          reSchedule: idRe._id,
          idStaff: req.body.idStaff
        }
      },
      {
        upsert: true
      }
    );
    res.send({
      putStatus
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/schedule/status=6&&addtime", async (req, res) => {
  try {
    let sch = await Schedule.findById(req.body.idSchedule);
    let idRe = await ReSchedule.findOne({ schedule: req.body.idSchedule });
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.body.idSchedule
      },
      {
        $set: {
          status: 7,
          reSchedule: idRe._id,
          idStaff: req.body.idStaff,
          times: ++sch.times
        }
      },
      {
        upsert: true
      }
    );
    res.send({
      putStatus
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/schedule/status=6&&noaddtime", async (req, res) => {
  try {
    let sch = await Schedule.findById(req.body.idSchedule);
    let idRe = await ReSchedule.findOne({ schedule: req.body.idSchedule });
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.body.idSchedule
      },
      {
        $set: {
          status: 7,
          reSchedule: idRe._id,
          idStaff: req.body.idStaff
        }
      },
      {
        upsert: true
      }
    );
    res.send({
      putStatus
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/schedule/:id/status=2", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          status: 2
        }
      },
      {
        upsert: true
      }
    );
    res.send({
      putStatus
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/staff/schedule/:id/status=3", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          status: 3
        }
      },
      {
        upsert: true
      }
    );

    res.send({
      putStatus
    });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/staff/schedule/:id/status=6", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          status: 6
        }
      },
      {
        upsert: true
      }
    );

    res.send({putStatus });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/schedule/:id/status=5", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          status: 5
        }
      },
      {
        upsert: true
      }
    );

    res.send({ putStatus });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/schedule/:id/status=-2", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          status: -2
        }
      },
      {
        upsert: true
      }
    );

    res.send({  putStatus });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

router.put("/schedule/:id/status=0", async (req, res) => {
  try {
    let putStatus = await Schedule.findOneAndUpdate(
      {
        _id: req.params.id
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
    res.send({ putStatus });
  } catch (error) {
    console.log(" Date error: ", error);
    res.status(422).send({ Error: error.message });
  }
});

module.exports = router;
