const router = require("express").Router();
const Notification = require("../models/Notification");
const date = require("date-fns");
const Schedule = require("../models/Schedule");
const format = date.format;

router.post("/staff/id=:id/request/schedule", async (req, res) => { 
  try {
    const newStaffN = new Notification({
      sender: "Nhân viên",
      idStaff: req.params.id,
      idCustomer: req.body.idCustomer,
      idSchedule: req.body.idSchedule,
      status: "Chấp nhận",
      date: new Date(),
      time:format(new Date(), "HH:mm"),
      body: "muốn bạn điều chỉnh thời gian hoặc nhân viên khác cho lịch hẹn "
    });
    const staffN = await newStaffN.save();
    res.send(staffN);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.post("/customer/id=:id/request/schedule", async (req, res) => { 
  try {
    const newStaffN = new Notification({
      sender: "Khách hàng",
      idStaff: req.body.idStaff,
      idCustomer: req.params.id,
      idSchedule: req.body.idSchedule,
      date: new Date(),
      time:format(new Date(), "HH:mm"),
      body: "đã chấp nhận yêu cầu điều chỉnh thời gian hoặc nhân viên khác cho lịch hẹn "
    });
    const staffN = await newStaffN.save();
    res.send(staffN);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Tìm tất cả thông báo cửa khách hàng
router.get("/customer/id=:id/notification", async (req, res) => {
  try {
    let notification = await Notification.find({ idCustomer: req.params.id ,sender:"Nhân viên"})
      .sort({ date: -1 })
      .populate("idStaff idCustomer idSchedule");
      console.log("Notification:", notification);
    res.send({ notification });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Tìm tất cả thông bao của nhân viên
router.get("/staff/id=:id/notification", async (req, res) => {
  try {
    let notification = await Notification.find({ idStaff: req.params.id, sender:"Khách hàng" })
      .sort({ date: -1 })
      .populate("idStaff idCustomer idSchedule");
    console.log("Notification:", notification);
    res.send({ notification });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/notification/id=:id/status=confirm", async (req, res) => {
  try {
    let push = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "Hoàn thành",
          date: new Date(),
          time: format(new Date(), "HH:mm")
        }
      },
      {
        upsert: true
      }
    );
    res.send({ push });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;
