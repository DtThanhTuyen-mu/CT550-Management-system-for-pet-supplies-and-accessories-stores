const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const moment = require("moment/moment");
const date = require("date-fns");
const format = date.format;
const addDays = date.addDays;
const subDays = date.subDays;
const addMonths = require("date-fns/addMonths");
const subMonths = require("date-fns/subMonths");
const eachDayOfInterval = date.eachDayOfInterval;
const eachWeekOfInterval = date.eachWeekOfInterval;
const eachMonthOfInterval = require("date-fns/eachMonthOfInterval");
const randomstring = require("randomstring");
const Product = require("../models/Product");
const Service = require("../models/Service");
const Schedule = require("../models/Schedule");

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 7),
    end: addDays(new Date(), -7)
  },
  {
    weekStartsOn: 1
  }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6)
  });
  acc.push(allDays);
  return acc;
}, []);

// lấy 3 tháng trước 
const months = eachMonthOfInterval({
  start: subMonths(new Date(), 2),
  end: addMonths(new Date(), 0)
});

// Lấy 2 tháng trước
const monthed2 = eachMonthOfInterval({
  start: subMonths(new Date(), 1),
  end: addMonths(new Date(), 0)
});

// Lấy tháng trước
const monthed = eachMonthOfInterval({
  start: subMonths(new Date(), 0),
  end: addMonths(new Date(), 0)
});

// Post thong tin cua HD dich vu
router.post("/staff/service/payment", async (req, res) => {
  const w = req.body.weight;
  let pr, nw;
  var codestring = randomstring.generate({
    length: 2,
    charset: "numeric"
  });
  var code = "DH" + codestring + format(new Date(), "yymmss");
  try {
    let service = await Service.findById(req.body.idService);
    const t = service.price;
    Object.entries(t).forEach(async ([key, val]) => {
      // console.log("key", key); // 👉️ name, country
      // console.log(t[key]); // 👉️ James, Chile
      // for (let j = 0; j < val.length; j++) {
      if (w < 2) {
        console.log("val 1 ", val[0]);
        nw = "Dưới 2kg";
        pr = val[0];
      } else if (w < 5) {
        console.log("val 2 ", val[1]);
        nw = "2 - 5kg";
        pr = val[1];
      } else if (w < 7) {
        nw = "5 - 7kg";
        pr = val[2];
      } else if (w < 10) {
        nw = "7 - 10kg";
        pr = val[3];
      } else if (w < 15) {
        nw = "10 - 15kg";
        pr = val[4];
      } else if (w < 20) {
        nw = "15 - 20kg";
        pr = val[5];
      } else if (w < 30) {
        nw = "20 - 30kg";
        pr = val[6];
      } else {
        nw = "30 - 40kg";
        pr = val[7];
      }
   });
    console.log("cn " + nw);
    console.log("price: ", pr);

    const orderPayment = new Order({
      item: "Service",
      idCustomer: req.body.idCustomer,
      idStaff: req.body.idStaff,
      idSchedule: req.body.idSchedule,
      idService: req.body.idService,
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      weight: nw,
      total: pr,
      weight: nw,
      total: pr,
      codebill: code
    });
    await orderPayment.save();
    res.send({ orderPayment });

  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.post("/staff/product/payment", async (req, res) => {
  //  console.log(req.body);
  var codestring = randomstring.generate({
    length: 2,
    charset: "numeric"
  });
  var code = "DH" + codestring + format(new Date(), "yymmss");
  const listP = req.body.product;
  let pushP;
  let idP = "";
  // console.log(listP);
  try {
    const productOrder = new Order({
      item: "Product",
      idCustomer: req.body.idCustomer,
      // idStaff: req.body.idStaff,
      // idService: req.body.idService,
      // idProduct: req.body.idProduct,
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      quantity: req.body.quantity,
      total: req.body.total,
      codebill: code,
      check: 1
    });
    await productOrder.save();
    idP = productOrder._id;
    console.log("Product order", productOrder);
    console.log("Product id", idP);
    //   res.send({ productOrder });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }

  for (let i = 0; i < listP.length; i++) {
    try {
      pushP = await Order.updateOne(
        {
          _id: idP
        },
        {
          $push: {
            product: {
              idProduct: listP[i]._id,
              quantity: listP[i].quantity,
              total: listP[i].price,
              status: "Đã đặt"
            }
            //  status: {
            //    status: "Đơn đã đặt",
            //    date: new Date(),
            //    time: new Date().toLocaleTimeString()
            //  }
          }
        }
      );
      // res.send({ pushP });
    } catch (error) {
      console.log("Data error: ", error);
      return res.status(422).send({ Error: error.message });
    }
  }
  let bill = await Order.findByIdAndUpdate(
    { _id: idP },
    {
      $push: {
        // check:"0",
        status: {
          status: "Đơn đã đặt",
          date: new Date(),
          time: new Date().toLocaleTimeString()
        }
      }
    },
    {
      upsert: true
    }
  );
  if (pushP) {
    // console.log(pushP);
    res.send({ pushP });
  }
});
router.post("/bill/:id/status=prepare", async (req, res) => {
  try {
    let bill = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          check: 2
        },
        $push: {
          status: {
            status: "Đang chuẩn bị",
            date: new Date(),
            time: new Date().toLocaleTimeString()
          }
        }
      },
      {
        upsert: true
      }
    );
    // let fb = await Order.findOne({_id: req.params.id });
    // /let f = fb.product;
    //  Object.keys(f).forEach(async (key) => {
    //  if (key == "idProduct") {

    // console.log(key); // 👉️ name, country
    // console.log(p[key]); // 👉️ James, Chile
    //  const idP = f[key];
    //  pp = await Product.find({ _id: idP });

    //  console.log("pp", pp);
    //  for (let j = 0; j < pp.length; j++) {
    //    billById.push({
    //      _id: pp[j]._id,
    //      title: pp[j].title,
    //      image: pp[j].image,
    //      price: pp[j].price
    //    });
    //  }

    //  console.log("billid", billById);
    //  res.send({ billById });
    //  }
    //  });

    // Object.keys(f).forEach((key) => {
    //   console.log(key); // 👉️ name, country
    //   console.log(f[key]); // 👉️ James, Chile
    // });
    // Object.values(f).forEach((value) => {
    //   console.log(value); // 👉️ James, Chile
    // });

    // console.log(fb);
    // console.log(fb.product[0].length);
    res.send({ bill });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.post("/bill/:id/status=delivering", async (req, res) => {
  try {
    let bill = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          check: 3
        },
        $push: {
          status: {
            status: "Đang giao",
            date: new Date(),
            time: new Date().toLocaleTimeString()
          }
        }
      },
      {
        upsert: true
      }
    );
    res.send({ bill });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.post("/bill/:id/status=cancel", async (req, res) => {
  try {
    let bill = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          check: 0
        },
        $push: {
          status: {
            status: "Hủy",
            date: new Date(),
            time: new Date().toLocaleTimeString()
          }
        }
      },
      {
        upsert: true
      }
    );
    res.send({ bill });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.post("/bill/:id/status=delivered", async (req, res) => {
  try {
    let bill = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          check: 4
        },
        $push: {
          status: {
            status: "Đã giao",
            date: new Date(),
            time: new Date().toLocaleTimeString()
          }
        }
      },
      {
        upsert: true
      }
    );
    res.send({ bill });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.post("/bill/:id/staff/status=confirmcancel", async (req, res) => {
  try {
    let bill = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          check: -1
        },
        $push: {
          status: {
            status: "Đã xác nhận hủy",
            date: new Date(),
            time: new Date().toLocaleTimeString()
          }
        }
      },
      {
        upsert: true
      }
    );
    res.send({ bill });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.post("/bill/:id/status=confirm", async (req, res) => {
  try {
    let bill = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "Duyệt"
        }
      },
      {
        upsert: true
      }
    );
    let b = await Order.find({ _id: req.params.id });
    let temp = bill.product;
    // .length;
    console.log(b.product);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Tat ca don hang cua nguoi dung
router.get("/bill/customer/:id", async (req, res) => {
  let billOC = [];
  try {
    let billC = await Order.find({
      idCustomer: req.params.id,
      item: "Product"
    }).sort({ date: -1 });

    res.send({ billC });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
  // if (billOC) console.log(billOC);
});
router.get("/bill/customer/billid/:id", async (req, res) => {
  let billById = [];
  let pp;
  try {
    let billBI = await Order.find({ _id: req.params.id });
    for (let i = 0; i < billBI.length; i++) {
      let p = billBI[i].product;
      // console.log(Object.keys(p));
      Object.keys(p).forEach(async (key) => {
        if (key == "idProduct") {
          // console.log(key); // 👉️ name, country
          // console.log(p[key]); // 👉️ James, Chile
          const idP = p[key];
          pp = await Product.find({ _id: idP });
          // console.log("pp", pp.length);
          for (let j = 0; j < pp.length; j++) {
            billById.push({
              _id: pp[j]._id,
              title: pp[j].title,
              image: pp[j].image,
              price: pp[j].price
            });
          }

          console.log("billid", billById);
          res.send({ billById });
        }
      });
    }
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
  // if (billOC) console.log(billOC);
});
// Danh sách hóa đơn sản phẩm
router.get("/bill/product/currentdate", async (req, res) => {
  let billProduct = [];
  try {
    let billP = await Order.find({
      //item: "Product"
      $or: [{ check: { $gte: 2, $lte: 5 } }]
    })
      .populate("idCustomer")
      .exec();
    for (let i = 0; i < billP.length; i++) {
      // const s = billP[i].status;
      // console.log("'s'",s);
      // const d = new Date(billP[i].status.date).toLocaleDateString();
      // console.log("d", d);
      // const h = new Date().toLocaleDateString();
      // console.log("h", h);
      // s.forEach((element) => console.log('element.status'));
      // for (let j = 0; j < s.length;  j++){
      //console.log(s[j].date);
      // }
      if (
        new Date(billP[i].date).toLocaleDateString() ===
        new Date().toLocaleDateString()
      ) {
        // console.log(billP[i]);
        // console.log(billP[i].status.date);
        billProduct.push(billP[i]);
      }
    }
    res.send({ billProduct });
    //  res.send({ billP });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
  // console.log(format(new Date(),'yyMMHHddmmss'));
});

router.get("/bill/product/currentMonth", async (req, res) => {
  let billProduct = [];
  try {
    let billP = await Order.find({
      // item: "Product"
      $or: [{ check: { $gte: 2, $lte: 5 } }]
    });
    for (let i = 0; i < billP.length; i++) {
      if (
        format(new Date(billP[i].date), "MM/yyyy") ===
        format(new Date(), "MM/yyyy")
      ) {
        billProduct.push(billP[i]);
      }
    }
    res.send({ billProduct });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/bill/product/currentMonth/confirm", async (req, res) => {
  let billProduct = [];
  try {
    let billP = await Order.find({
      item: "Product"
      // $or: [{ check: { $gte: 2, $lte: 5 } }]
    })
      .sort({ date: -1 })
      .populate("idCustomer")
      .exec();
    for (let x = 0; x < monthed2.length; x++){
      console.log(monthed2[x])
      for (let i = 0; i < billP.length; i++) {
        if (
          format(new Date(billP[i].date), "MM/yyyy") ===
          format(new Date(monthed2[x]), "MM/yyyy")
        ) {
          billProduct.push(billP[i]);
        }
      }

    }
    res.send({ billProduct });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/bill/service/currentMonth", async (req, res) => {
  let billService = [];
  try {
    let billS = await Order.find({ item: "Service" });
    for (let i = 0; i < billS.length; i++) {
      if (
        format(new Date(billS[i].date), "MM/yyyy") ===
        format(new Date(), "MM/yyyy")
      ) {
        billService.push(billS[i]);
      }
    }
    res.send({ billService });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/bill/service/currentMonth/confirm", async (req, res) => {
  let billService = [];
  try {
    let billS = await Order.find({ item: "Service" })
      .populate("idCustomer idStaff idService")
      .exec();
    for (let i = 0; i < billS.length; i++) {
      if (
        format(new Date(billS[i].date), "MM/yyyy") ===
        format(new Date(), "MM/yyyy")
      ) {
        billService.push(billS[i]);
      }
    }
    res.send({ billService });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/bill/service&product/currentDate", async (req, res) => {
  let bill = 0;
  try {
    let billSP = await Order.find({
      $or: [{ item: "Service" }, { check: { $gte: 2, $lte: 5 } }]
    });
    for (let i = 0; i < billSP.length; i++) {
      if (
        format(new Date(billSP[i].date), "dd/MM/yyyy") ===
        format(new Date(), "dd/MM/yyyy")
      ) {
        bill += billSP[i].total;
      }
    }
    res.send({ bill });
    // console.log("SP",billSP);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/bill/service&product/currentMonth", async (req, res) => {
  let bill = 0;
  try {
    let billSP = await Order.find({
      $or: [{ item: "Service" }, { check: { $gte: 2, $lte: 5 } }]
    });
    for (let i = 0; i < billSP.length; i++) {
      if (
        format(new Date(billSP[i].date), "MM/yyyy") ===
        format(new Date(), "MM/yyyy")
      ) {
        bill += billSP[i].total;
      }
    }
    res.send({ bill });
    // console.log("SP",billSP);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
// Tìm hóa đơn theo id cua nó
router.get("/bill/id=:id", async (req, res) => {
  try {
    let bill = await Order.findById(req.params.id).populate("idCustomer idSchedule idService idStaff");
    res.send({ bill });
  } catch (error) {
      console.log("Data error: ", error);
      return res.status(422).send({ Error: error.message });
 
  }
})
router.get("/bill/service/customer/id=:id", async (req, res) => {
  console.log(req.params);
  try {
    let bill = await Schedule.find({
      idCustomer: req.params.id,
      $or: [{ status: 3 }, { status: 5 }]
    })
      .sort({ date: -1 })
      .populate("idStaff idService reSchedule")
      .exec();
    // console.log(bill);
    // res.send({ bill });
    // for (let i=0;i< bill.length; i++){
    //   const idS = bill[i].idSchedule.idService;
    //   let ser = await Service.findById(idS);
    //  service.push(ser);
    // }
    res.send({ bill });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/bill/service/staff/id=:id", async (req, res) => {
  console.log(req.params);
  try {
    let bill = await Schedule.find({
      idStaff: req.params.id,
      $or: [{ status: 3 }, { status: 5 }]
    })
      .sort({ date: -1 })
      .populate("idStaff idService idCustomer")
      .exec();
    // console.log(bill);
    // res.send({ bill });
    // for (let i=0;i< bill.length; i++){
    //   const idS = bill[i].idSchedule.idService;
    //   let ser = await Service.findById(idS);
    //  service.push(ser);
    // }
    res.send({ bill });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
// Danh sách hóa đơn dịch vụ
router.get("/bill/service/currentdate", async (req, res) => {
  let service = [];
  try {
    let serviceP = await Order.find({ item: "Service" }).populate(
      "idCustomer idStaff idService"
    );
    for (let i = 0; i < serviceP.length; i++) {
      if (
        format(new Date(serviceP[i].date), "dd/MM/yyyy") ==
        format(new Date(), "dd/MM/yyyy")
      ) {
        service.push(serviceP[i]);
      }
    }
    res.send({ service });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
  // console.log(format(new Date(),'yyMMHHddmmss'));
});
router.get("/staff/service/payment", async (req, res) => {
  try {
    const servicePayment = await Order.find()
      .populate("idCustomer idStaff idService")
      .exec();
    res.send({ servicePayment });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/staff/product/payment", async (req, res) => {
  try {
    const productPayment = await Order.find()
      .populate("idCustomer idStaff idProduct")
      .exec();
    res.send({ productPayment });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
// Số sản phẩm trong hóa đơn theo ngày
router.get("/bill/count/product/groupbydate", async (req, res) => {
  try {
    let g = await Order.aggregate([
      {
        $match: {
          // $or: [
          // {
          //   item: "Service"
          // },
          check: { $gte: 2, $lte: 5 }
          // ]
        }
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: {
            date: "$date",
            // date: { $dateToString: { format: "%m-%Y", date: "$date" } },
            idProduct: "$product.idProduct"
          },
          // _id: { date: $dateToString: { format: "%d-%m-%Y", date: "$date" } ,idProduct: "$product.idProduct" },
          count: { $sum: 1 },
          total: {
            $sum: { $multiply: ["$product.total", "$product.quantity"] }
          },
          quantity: { $sum: "$product.quantity" }
        }
      },
      { $sort: { "_id.date": 1 } }
    ]);
    for (let i = 0; i < g.length; i++) {
      // console.log(format(g[i]._id.date, 'yyyy-MM-dd'))
      if (format(g[i]._id.date, "dd-MM-yyyy") === "21-03-2023")
        console.log(g[i]);
    }
    // res.send({ g });
    // console.log(f);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
// Loi nhuan theo tháng
router.get("/bill/profit/groupby3w", async (req, res) => {
  // console.log("months llll : ", months);
  let arrP = [];
  let arrS = [];
  let arrT = [];
  try {
    let p = await Order.aggregate([
      {
        $match: {
          check: { $gte: 2, $lte: 5 }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%m/%Y", date: "$date" } },
            month: { $dateToString: { format: "%m", date: "$date" } },
            year: { $dateToString: { format: "%Y", date: "$date" } }
          },
          count: { $sum: 1 },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
    let s = await Order.aggregate([
      {
        $match: {
          item: "Service"
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%m/%Y", date: "$date" } },
            month: { $dateToString: { format: "%m", date: "$date" } },
            year: { $dateToString: { format: "%Y", date: "$date" } }
          },
          count: { $sum: 1 },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
    for (let m = 0; m < months.length; m++) {
      for (let i = 0; i < p.length; i++) {
        sub = subDays(months[m], 1);
        // console.log('m:',subDays(months[m],1));
        if (format(sub, "MM/yyyy") === p[i]._id.date) {
          console.log("total:", p[i]._id.date);
          // console.log('m:',(months[m]));
          arrP.push({ month: p[i]._id.date, total: p[i].total });
        }
      }
    }
    for (let m = 0; m < months.length; m++) {
      for (let i = 0; i < s.length; i++) {
        sub = subDays(months[m], 1);

        if (format(sub, "MM/yyyy") === s[i]._id.date)
          // console.log('total:', p[i].total);
          arrS.push({ month: s[i]._id.date, total: s[i].total });
      }
    }
    // console.log('arrP', arrP);
    // console.log('arrS', arrS);
    for (let x = 0; x < arrP.length; x++) {
      for (let y = 0; y < arrS.length; y++) {
        if (arrP[x].month === arrS[y].month) {
          arrT.push({
            Tháng: arrP[x].month,
            "Doanh thu": arrP[x].total + arrS[y].total,
            "Lợi nhuận": arrP[x].total * 0.3 + arrS[y].total * 0.4
          });
        }
      }
    }
    // console.log('p:', arrT);
    // console.log('arrT:', arrT);
    // console.log('arrT:', arrT);
    // res.send({ p ,s});
    res.send({ arrT });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
  // Lay doanh thu san pham theo thang
});
// Doanh thu loi nhuan theo năm hiện tại
router.get("/bill/profit/gb/currentyear", async (req, res) => {
  const year = format(new Date(), "yyyy");
  // const cyear= ["01/year","02/year" ]
  let arrP = [];
  let arrS = [];
  let arrT = [];
  const cyear = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];
  console.log("year: ", year);
  try {
    let p = await Order.aggregate([
      {
        $match: {
          check: { $gte: 2, $lte: 5 }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%m/%Y", date: "$date" } },
            month: { $dateToString: { format: "%m", date: "$date" } },
            year: { $dateToString: { format: "%Y", date: "$date" } }
          },
          count: { $sum: 1 },
          //  month: { $dateToString: { format: "%m", date: "$date" } },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
    let s = await Order.aggregate([
      {
        $match: {
          item: "Service"
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%m/%Y", date: "$date" } },
            month: { $dateToString: { format: "%m", date: "$date" } },
            //  date: { $dateToString: { format: "%m/%Y", date: "$date" } },
            year: { $dateToString: { format: "%Y", date: "$date" } }
          },
          count: { $sum: 1 },
          //  month: { $dateToString: { format: "%m", date: "$date" } },
          total: {
            $sum: "$total"
          }
        }
      }
    ]);
    for (let i = 0; i < p.length; i++) {
      if (year === p[i]._id.year)
        arrP.push({ my: p[i]._id.date, m: p[i]._id.month, total: p[i].total });
    }

    for (let i = 0; i < s.length; i++) {
      if (year === s[i]._id.year)
        arrS.push({
          my: s[i]._id.date,
          m: s[i]._id.month,
          total: s[i].total
        });
    }

    for (let x = 0; x < arrP.length; x++) {
      for (let y = 0; y < arrS.length; y++) {
        if (arrP[x].my === arrS[y].my) {
          arrT.push({
            Tháng: arrP[x].my,
            m: arrP[x].m,
            "Doanh thu": arrP[x].total + arrS[y].total,
            "Lợi nhuận": arrP[x].total * 0.3 + arrS[y].total * 0.4
          });
        }
      }
    }
    let arrPt = [];
    for (let z = 0; z < cyear.length; z++) {
      for (let q = 0; q < arrT.length; q++) {
        if (cyear[z] === arrT[q].m) {
          arrPt.push(arrT[q]);
        }
      }
    }
    // console.log("p: ", p);
    // console.log("s: ", s);
    // res.send({ p });
    // res.send({ s });
    // res.send({ arrP });
    // res.send({ arrS });
    // res.send({ arrT });
    res.send({ arrPt });
    // res.send({ p, s });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Số sản phẩm trong hóa đơn theo thangs rồi
router.get("/bill/count/product/groupbymonthed", async (req, res) => {
  let arr = [];
  let arrCPM = [];
  try {
    // console.log("monthed:", monthed);
    let g = await Order.aggregate([
      {
        $match: {
          // $or: [ { item: "Service" },
          check: { $gte: 2, $lte: 5 }
          // ]
        }
      },
      { $unwind: "$product" },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: {
            // date: format("$date",'dd/MM/yyyy'),
            date: { $dateToString: { format: "%m/%Y", date: "$date" } },
            idProduct: "$product.idProduct"
          },
          // _id: { date: $dateToString: { format: "%d-%m-%Y", date: "$date" } ,idProduct: "$product.idProduct" },
          count: { $sum: 1 },
          total: {
            $sum: { $multiply: ["$product.total", "$product.quantity"] }
          },
          quantity: { $sum: "$product.quantity" }
        }
      }
    ]);
   
    //  for (let j = 0; j < monthed.length; j++) {
    for (let i = 0; i < g.length; i++) {
      // console.log("w:",format(week[j], "dd/MM/yyyy"));
      // console.log("g:",format(g[i]._id.date, "dd/MM/yyyy"));
      if (
        format(subDays(monthed[0], 1), "MM/yyyy") === g[i]._id.date
        // format(week[j], "dd/MM/yyyy") === format(g[i]._id.date, "dd/MM/yyyy")
      ) {
        arr.push({ idProduct: g[i]._id.idProduct, quantity: g[i].quantity });
      }
    }
    for (let y = 0; y < arr.length; y++) {
      let titleP = await Product.findById(arr[y].idProduct);
      arrCPM.push({ name: titleP.title, value: arr[y].quantity });
    }

    //  }
    // console.log(" theo thang: ", g);
    // console.log(" theo thang: ", arrCPM);
    res.send({ arrCPM });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Số sản phẩm trong hóa đơn theo tuan roi
router.get("/bill/count/product/groupbyweek", async (req, res) => {
  let week = dates[0];
  let arr = [];
  let arrTP = [];
  try {
    // for (let j = 0; j < week.length; j++){
    //   console.log("week: "+format(week[j],'dd/MM/yyyy'))
    // }
    // 27 - 2/3
    //=> 13/03/2023 - 19/03/2023
    // Tim so san pham nhom theo ngay va ma sp
    let g = await Order.aggregate([
      {
        $match: {
          // $or: [ { item: "Service" },
          check: { $gte: 2, $lte: 5 }
          // ]
        }
      },
      { $unwind: "$product" },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: {
            // date: format("$date",'dd/MM/yyyy'),
            date: { $dateToString: { format: "%d/%m/%Y", date: "$date" } },
            idProduct: "$product.idProduct"
          },
          // _id: { date: $dateToString: { format: "%d-%m-%Y", date: "$date" } ,idProduct: "$product.idProduct" },
          count: { $sum: 1 },
          total: {
            $sum: { $multiply: ["$product.total", "$product.quantity"] }
          },
          quantity: { $sum: "$product.quantity" }
        }
      }
    ]);
    for (let j = 0; j < week.length; j++) {
      for (let i = 0; i < g.length; i++) {
        // console.log("w:",format(week[j], "dd/MM/yyyy"));
        // console.log("g:",format(g[i]._id.date, "dd/MM/yyyy"));
        if (
          format(week[j], "dd/MM/yyyy") === g[i]._id.date
          // format(week[j], "dd/MM/yyyy") === format(g[i]._id.date, "dd/MM/yyyy")
        ) {
          arr.push({ idProduct: g[i]._id.idProduct, quantity: g[i].quantity });
        }
      }
    }
    for (let y = 0; y < arr.length; y++) {
      let titleP = await Product.findById(arr[y].idProduct);
      arrTP.push({ name: titleP.title, value: arr[y].quantity });
    }
    // res.send({ arr });
    console.log("arrTP: ", arrTP);
    res.send({ arrTP });
    //  console.log(arrTP);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
//Số dịch vu dc lam trong tuần qua
router.get("/bill/count/service/groupbyweek", async (req, res) => {
  let week = dates[0];
  let arr = [];
  let arrTP = [];
  try {
    // Tim so dv nhom theo ngay va ma dv
    let g = await Order.aggregate([
      {
        $match: {
          item: "Service"
        }
      },
      // { $unwind: "$idSchedule" },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%d/%m/%Y", date: "$date" } },
            idService: "$idService"
          },
          // _id: { date: $dateToString: { format: "%d-%m-%Y", date: "$date" } ,idProduct: "$product.idProduct" },
          count: { $sum: 1 }
          // total: {
          //   $sum: { $multiply: ["$product.total", "$product.quantity"] }
          // },
          // quantity: { $sum: "$product.quantity" }
        }
      }
    ]);
    for (let j = 0; j < week.length; j++) {
      for (let i = 0; i < g.length; i++) {
        if (
          format(week[j], "dd/MM/yyyy") === g[i]._id.date
          // format(week[j], "dd/MM/yyyy") === format(g[i]._id.date, "dd/MM/yyyy")
        ) {
          arr.push({ idService: g[i]._id.idService, quantity: g[i].count });
        }
      }
    }
    let s = 0;
    for (let y = 0; y < arr.length; y++) {
      for (let z = 1; z < arr.length; z++) {
        if (arr[y].idService === arr[z].idService) {
          console.log("quantity: ", arr[y].idService);
        }
      }
    
    }
   
    console.log("S:", s);
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
// dv tron tuan qua va so tien
router.get("/bill/count/service/gbweek/chart", async (req, res) => {
  let week = dates[0];
  let arr = [];
  let arrTP = [];
  try {
    // Tim so dv nhom theo ngay va ma dv
    let g = await Order.aggregate([
      {
        $match: {
          item: "Service"
        }
      },
      // { $unwind: "$idSchedule" },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%d/%m/%Y", date: "$date" } }
            // idService: "$idService"
          },
          // _id: { date: $dateToString: { format: "%d-%m-%Y", date: "$date" } ,idProduct: "$product.idProduct" },
          count: { $sum: 1 }
          // total: {
          //   $sum: { $multiply: ["$product.total", "$product.quantity"] }
          // },
          // quantity: { $sum: "$product.quantity" }
        }
      }
    ]);
    let s = 0;
    let i;
    for (let j = 0; j < week.length; j++) {
      for (i = 0; i < g.length; i++) {
        // console.log("w:",format(week[j], "dd/MM/yyyy"));
        // console.log("g:",format(g[i]._id.date, "dd/MM/yyyy"));
        if (
          format(week[j], "dd/MM/yyyy") === g[i]._id.date
          // format(week[j], "dd/MM/yyyy") === format(g[i]._id.date, "dd/MM/yyyy")
        ) {
          arr.push({
            date: format(week[j], "dd/MM"),
            "Số lượng": g[i].count
          });
        }
      }
    }
    // let s = 0;
    // for (let y = 0; y < arr.length; y++){
    //   for (let z = 1; z < arr.length; z++){
    //     if (arr[y].idService === arr[z].idService) {
    //       // s += arr[y].quantity;
    //       console.log("quantity: ", arr[y].idService);
    //     }
    //   }
    //   // let titleP = await Product.findById(arr[y].idProduct);
    //   // arrTP.push({name: titleP.title, value:arr[y].quantity})
    // }
    // let g = await Order.find({ item: 'Service' }).populate("idSchedule").exec();
    // res.send({g });
    // res.send({ arrTP });
    //  console.log(arrTP);
    //  console.log(arr);
    // console.log("week:", week);
    // console.log("week:",arr);
    //  console.log("S:",g);
    res.send({ arr });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Ngày có bao nhiêu hóa đơn và tổng tiền
router.get("/bill/count/groupbydate", async (req, res) => {
  try {
    let g = await Order.aggregate([
      {
        $match: {
          $or: [
            {
              item: "Service"
            },
            { check: { $gte: 2, $lte: 5 } }
          ]
        }
      },
      // {$unwind:'$product'},
      {
        $group: {
          _id: "$date",
          // { date: "$date" },
          // _id: { $dateToString: { format: "%d-%m-%Y", date: "$date" } },
          count: { $sum: 1 },
          total: { $sum: "$total" }
          // q:{$sum:"$product"}
        }
      },
      { $sort: { _id: 1 } }
    ]);
    // res.send({ f });
    res.send({ g });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});
router.get("/bill/count/groupbymonth", async (req, res) => {
  try {
    let g = await Order.aggregate([
      {
        $match: {
          $or: [
            {
              item: "Service"
            },
            { check: { $gte: 2, $lte: 5 } }
          ]
        }
      },
      {
        $group: {
          // _id: { date: "$date" },
          _id: { $dateToString: { format: "%m-%Y", date: "$date" } },
          count: { $sum: 1 },
          total: { $sum: "$total" }
        }
      }
    ]);
    // res.send({ f });
    res.send({ g });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Số lượng sản phẩm khách mua trong tháng rồi 
router.get("/bill/count/customer=:id/product/gbbm", async (req, res) => {
   let arr = [];
   let arrCCPM = [];
   try {
     console.log("monthed:", monthed)
     console.log("id", req.params.id);
     console.log("monthed:",format(subDays(monthed[0], 1), "MM/yyyy") );
     let g = await Order.aggregate([
       {
         $match: {
           
           check: { $gte: 2, $lte: 5 },
           idCustomer: new mongoose.Types.ObjectId(""+req.params.id+"")
           
         }
       },
       { $unwind: "$product" },
       { $sort: { date: 1 } },
       {
         $group: {
           _id: {
             date: { $dateToString: { format: "%m/%Y", date: "$date" } },
             idProduct: "$product.idProduct"
           },
           count: { $sum: 1 },
           total: {
             $sum: { $multiply: ["$product.total", "$product.quantity"] }
           },
           quantity: { $sum: "$product.quantity" }
         }
       }
     ]);
       for (let i = 0; i < g.length; i++) {
        if (
         format(subDays(monthed[0], 1), "MM/yyyy") === g[i]._id.date
        ) {
         arr.push({ idProduct: g[i]._id.idProduct, quantity: g[i].quantity });
       }
     }
     for (let y = 0; y < arr.length; y++) {
       let titleP = await Product.findById(arr[y].idProduct);
       arrCCPM.push({ name: titleP.title, value: arr[y].quantity });
     }

    res.send({ arrCCPM });
   } catch (error) {
     console.log("Data error: ", error);
     return res.status(422).send({ Error: error.message });
   }
})
router.get("/bill/count/customer=:id/service/gbbm", async (req, res) => {
   let arr = [];
   let arrCCPM = [];
   try {
     console.log("monthed:", monthed)
     console.log("id", req.params.id);
     console.log("monthed:",format(subDays(monthed[0], 1), "MM/yyyy") );
     let g = await Order.aggregate([
       {
         $match: {
           item:"Service",
          //  check: { $gte: 2, $lte: 5 },
           idCustomer: new mongoose.Types.ObjectId(""+req.params.id+"")
           
         }
       },
      //  { $unwind: "$idService" },
       { $sort: { date: 1 } },
       {
         $group: {
           _id: {
             date: { $dateToString: { format: "%m/%Y", date: "$date" } },
             idService: "$idService"
           },
           count: { $sum: 1 },
          
         }
       }
     ]);
       for (let i = 0; i < g.length; i++) {
        if (
         format(subDays(monthed[0], 1), "MM/yyyy") === g[i]._id.date
        ) {
         arr.push({ idService: g[i]._id.idService, count: g[i].count });
       }
     }
     for (let y = 0; y < arr.length; y++) {
       let titleP = await Service.findById(arr[y].idService);
       arrCCPM.push({ name: titleP.title, value: arr[y].count });
     }

    res.send({ arrCCPM });
   } catch (error) {
     console.log("Data error: ", error);
     return res.status(422).send({ Error: error.message });
   }
})

router.get("/bill/count/customer=:id/service/gbbyear", async (req, res) => {
   let arr = [];
   let arrCCPY = [];
   try {
     let g = await Order.aggregate([
       {
         $match: {
           item: "Service",
          
           idCustomer: new mongoose.Types.ObjectId("" + req.params.id + "")
         }
       }, 
       { $sort: { date: 1 } },
       {
         $group: {
           _id: {
             year: { $dateToString: { format: "%Y", date: "$date" } },

              idService: "$idService"
           },
           count: { $sum: 1 },
           
         }
       }
     ]);
    // res.send({ g});

       for (let i = 0; i < g.length; i++) {
        if (
         format(new Date(), "yyyy") === g[i]._id.year
        ) {
         arr.push({ idService: g[i]._id.idService, count: g[i].count });
       }
     }
     for (let y = 0; y < arr.length; y++) {
       let titleP = await Service.findById(arr[y].idService);
       arrCCPY.push({ name: titleP.title, value: arr[y].count });
     }

    res.send({ arrCCPY });
   } catch (error) {
     console.log("Data error: ", error);
     return res.status(422).send({ Error: error.message });
   }
})
// Số lượng sản phẩm khách mua trong năm nay
router.get("/bill/count/customer=:id/product/gbbyear", async (req, res) => {
   let arr = [];
   let arrCCPY = [];
   try {
     let g = await Order.aggregate([
       {
         $match: {
           
           check: { $gte: 2, $lte: 5 },
           idCustomer: new mongoose.Types.ObjectId(""+req.params.id+"")
           
         }
       },
       { $unwind: "$product" },
       { $sort: { date: 1 } },
       {
         $group: {
           _id: {
            year: { $dateToString: { format: "%Y", date: "$date" } },
             
            //  date: { $dateToString: { format: "%m/%Y", date: "$date" } },
             idProduct: "$product.idProduct"
           },
           count: { $sum: 1 },
           total: {
             $sum: { $multiply: ["$product.total", "$product.quantity"] }
           },
           quantity: { $sum: "$product.quantity" }
         }
       }
     ]);
       for (let i = 0; i < g.length; i++) {
        if (
         format(new Date(), "yyyy") === g[i]._id.year
        ) {
         arr.push({ idProduct: g[i]._id.idProduct, quantity: g[i].quantity });
       }
     }
     for (let y = 0; y < arr.length; y++) {
       let titleP = await Product.findById(arr[y].idProduct);
       arrCCPY.push({ name: titleP.title, value: arr[y].quantity });
     }

    res.send({ arrCCPY });
   } catch (error) {
     console.log("Data error: ", error);
     return res.status(422).send({ Error: error.message });
   }
})

module.exports = router;
