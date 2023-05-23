const router = require("express").Router();
const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authToken = require("../middlewares/authTokenRequired");

require("dotenv").config();

router.post("/customer/sigin", async (req, res) => {
  // res.send("This is signin page");
  console.log("send by client -", req.body);
  const { fullname, address, password, phone, gender } = req.body;
  console.log(req.body);
  if (!fullname || !address || !password || !phone) {
    return res.status(422).send({ error: "Please fill all the fields" });
  }

  Customer.findOne({ phone: phone }).then(async (savedCustomer) => {
    if (savedCustomer) {
      return res.status(422).send({ error: "Invalid Creadentials" });
    }
    const customer = new Customer({
      fullname,
      address,
      password,
      phone
    });

    try {
      await customer.save();
      const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET);
      // , {        expiresIn: 604800     });
      res.send({ token });
    } catch (error) {
      console.log("Data err", error);
      return res.status(422).send({ Error: error.message });
    }
  });
});

router.post("/customer/signin/google", async (req, res) => {
  const { email, image, fullname } = req.body;
  Customer.findOne({ email: email }).then(async (savedCustomer) => {
    if (savedCustomer) {
      return res.send({ Error: "Tài khoản google đã được đăng ký" });
    }
    try {
      const customer = new Customer({
        fullname,
        image,
        email
      });
      await customer.save();
      res.send({ customer });
    } catch (error) {
      console.log("Data err", error);
      return res.status(422).send({ Error: error.message });
    }
  });
});

router.post("/customer/login/google", async (req, res) => {
  console.log("ok đăng nhập");
  console.log(req.body.email);
  const { email } = req.body;
  try {
    Customer.findOne({ email: email }).then(async (savedCustomer) => {
      if (savedCustomer) {
        return res.send({ savedCustomer });
      }
      return res.send({ Error: "Tài khoản google chưa được đăng ký" });
    });
  } catch (error) {
    console.log("password does not match");
    return res.status(422).json({ error: "Invalid Credentials" });
  }
});

router.post("/customer/login", async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(422).json({ err: "Plases add email or password" });
  }
  const savedCustomer = await Customer.findOne({ phone: phone });
  console.log(" customer: ", savedCustomer);
  if (!savedCustomer) {
    return res.send({ Error: "Vui lòng kiểm tra lại số điện thoại" });
  }
  try {
    bcrypt.compare(password, savedCustomer.password, (err, result) => {
      if (result) {
        console.log("Password match");
        const token = jwt.sign(
          { _id: savedCustomer._id },
          process.env.JWT_SECRET
        );
        res.send({ token, savedCustomer });
      } else {
        console.log("password does not match");
        return res.send({ Error: "Vui lòng kiểm tra lại mật khẩu" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/customer/forgetpassword", async (req, res) => {
  const { phone, password } = req.body;
  try {
    console.log(" phone: ", phone);
    console.log(" password: ", password);
    Customer.findOne({ phone: phone }).then(async (savedCustomer) => {
      if (savedCustomer) {
        //  console.log("phone: ", savedCustomer);
        if (password) savedCustomer.password = password;
        await savedCustomer.save();

        res.send(savedCustomer);
      } else {
        console.log("Khong tim thay nguoi dung");
        res.send({ Error: "Số điện thoại không tồn tại" });
      }
    });
  } catch (error) {
    return res.status(422).json({ error: "Lỗi" });
  }
});

router.post("/customer/changepassword", async (req, res) => {
  const { phone, password, passworded } = req.body;
  try {
    Customer.findOne({ phone: phone }).then(async (savedCustomer) => {
      if (savedCustomer) {
        bcrypt.compare(
          passworded,
          savedCustomer.password,
          async (err, result) => {
            if (result) {
              savedCustomer.password = password;
              await savedCustomer.save();
              res.send({ result });
            } else {
              res.send({ Error: "Mật khẩu hiện tại chưa chính xác!!" });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log("password does not match");
    return res.status(422).json({ error: "Invalid Credentials" });
  }
});

router.put("/customer=:email/update", async (req, res) => {
  try {
    let up = await Customer.findOneAndUpdate(
      { email: req.params.email },
      {
        $set: {
          fullname: req.body.fullname,
          phone: req.body.phone,
          address: req.body.address
        }
      }
    );
    let customer = await Customer.findOne({ email: req.params.email });
    res.send({ customer });
  } catch (error) {
    console.log("Data error:", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.put("/customer/editprofile", async (req, res) => {
  try {
    let foundCustomer = await Customer.findOne({ _id: req.body.id });
    console.log("fff", foundCustomer);
    if (foundCustomer) {
      if (req.body.address) foundCustomer.address = req.body.address;
      if (req.body.birthday) foundCustomer.birthday = req.body.birthday;
      if (req.body.image) foundCustomer.image = req.body.image;
      if (req.body.gender) foundCustomer.gender = req.body.gender;
      if (req.body.fullname) foundCustomer.fullname = req.body.fullname;
      if (req.body.phone) foundCustomer.phone = req.body.phone;
      if (req.body.email) foundCustomer.email = req.body.email;
      await foundCustomer.save();
    }
    res.send(foundCustomer);
  } catch (error) {
    console.log("Data error:", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customers", async (req, res) => {
  try {
    let customer = await Customer.find();
    res.send(customer);
  } catch (error) {
    console.log("Data error:", error);
    return res.status(422).send({ Error: error.message });
  }
});

router.get("/customer/:id", async (req, res) => {
  try {
    let customer = await Customer.find({ _id: req.params.id });
    res.send({ customer });
  } catch (error) {
    console.log("Data error:", error);
    return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;
