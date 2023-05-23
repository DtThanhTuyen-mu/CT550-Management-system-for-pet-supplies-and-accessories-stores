const router = require("express").Router();
const Staff = require("../models/Staff");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authToken = require("../middlewares/authTokenRequired");
const Reviews = require("../models/Reviews");
const Schedule = require("../models/Schedule");
const date = require("date-fns");
const Salary = require("../models/Salary");
const format = date.format;

// Dang ky - thong tin tai khoan nhan vien 
router.post("/staff/register", async (req, res) => {
  const {
    fullname,
    idc,
    gender,
    phone,
    birthday,
    address,
    username,
    password,
    image,
    role
  } = req.body;
  console.log(req.body);
  try {
    if (
      !fullname ||
      !idc ||
      !phone ||
      !birthday ||
      !address ||
      !username ||
      !password
    ) {
      return res.status(422).send({ error: "Please fill all the fields" });
    }
    Staff.findOne({ username: username }).then(async (savedStaff) => {
      if (savedStaff) {
        return res.status(422).send({ error: "Invalid Creadentials" });
      }
      const newStaff = new Staff({
        fullname,
        idc,
        gender,
        phone,
        birthday,
        address,
        username,
        password,
        image,
        role
      });
      const staff = await newStaff.save();
      const token = jwt.sign({ _id: newStaff._id }, process.env.JWT_SECRET);
      res.send({ staff});
    });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Dang nhap tai khoan nhan vien
router.post("/staff/login", async (req, res) => {
  const { username, password } = req.body;
  const savedStaff = await Staff.findOne({ username: username })
  console.log("staff: ", savedStaff);
  if (!savedStaff) {
    return res.send({Error: 'Thông tin không hợp lệ!!'}); 
  }
   try {
     bcrypt.compare(password, savedStaff.password, (err, result) => {
       if (result) {
        //  console.log("Password match");
         const token = jwt.sign(
           { _id: savedStaff._id },
           process.env.JWT_SECRET
         );
         res.send({ token, savedStaff });
       } else {
        //  console.log("password does not match");
         res.send({Error: 'Vui lòng kiểm tra lại mật khẩu.'})
       }
     });
   } catch (err) {
     console.log(err);
   }
})

// Them thong tin kinh nghiem cua nhan vien
router.put("/staff/experience/push/:username", async (req, res) => {
  try {
    let staff = await Staff.updateOne(
      { username: req.params.username },
      {
        $push: {
          experience: {
            title: req.body.title,
            year: req.body.year,
            describe: req.body.describe
          }
        }
      }
    );
    res.send({ staff });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Dat lai thong tin kinh nghiem cua nhan vien
router.put("/staff/experience/set/:username", async (req, res) => {
  try {
    let staff = await Staff.updateOne(
      { username: req.params.username },
      {
        $set: {
          experience: {
            title: req.body.title,
            year: req.body.year,
            describe: req.body.describe
          }
        }
      }
      );
    res.send({ staff });
  } catch (error) {
    console.log("Data error ", error);
    return res.status(422).send({ Error: error.message });
  }
});

// Cap nhat lai thong tin nguoi dung
router.put("/staff/updateprofile/:id", async (req, res) =>{
  try {
    let foundStaff = await Staff.findOne({ username: req.body.username });
    // console.log(foundStaff);
     if (foundStaff) {
      if (req.body.fullname) foundStaff.fullname = req.body.fullname;
      if (req.body.idc) foundStaff.idc = req.body.idc;
      if (req.body.gender) foundStaff.gender = req.body.gender;
      if (req.body.phone) foundStaff.phone = req.body.phone;
      if (req.body.birthday) foundStaff.birthday = req.body.birthday;
      if (req.body.address) foundStaff.address = req.body.address;
      if (req.body.image) foundStaff.image = req.body.image;
      if (req.body.role) foundStaff.role = req.body.role;
      await foundStaff.save();
      res.send({ foundStaff });
    }
   
  } catch (error) {
  console.log(" Data error ", error);
    return res.status(422).send({ Error: error.message })
  }
})

router.put("/staff/owner/updateprofile/:id", async (req, res) =>{
  try {
    
  //   let foundStaff = await Staff.findById(req.params.id );
  //    console.log(foundStaff);
  //    if (foundStaff) {
  //     if (req.body.fullname) foundStaff.fullname = req.body.fullname;
  //     if (req.body.idc) foundStaff.idc = req.body.idc;
  //     if (req.body.gender) foundStaff.gender = req.body.gender;
  //     if (req.body.phone) foundStaff.phone = req.body.phone;
  //     if (req.body.birthday) foundStaff.birthday = req.body.birthday;
  //     if (req.body.address) foundStaff.address = req.body.address;
  //     if (req.body.image) foundStaff.image = req.body.image;
  // //     if (req.body.role) foundStaff.role = req.body.role;
  //     await foundStaff.save();
  //     res.send({ foundStaff });

  //     // if (req.body.fullname) foundStaff.fullname = req.body.fullname;
  //     //     idc: req.body.idc,
  //     //     phone: req.body.phone,
  //     //     birthday: req.body.birthday,
  //     //     address: req.body.address,
  //     //     username: req.body.username,
  //     //     image: req.body.image,
  //     //     role: req.body.role
    // }
    let foundStaff = await Staff.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          fullname: req.body.fullname,
          idc: req.body.cccd,
          phone: req.body.phone,
          gender:req.body.gender,
          birthday: req.body.birthday,
          address: req.body.address,
          image: req.body.image,
        }
      },
      {
        upsert: true
      }
    );
    res.send({ foundStaff });
   
  } catch (error) {
  console.log(" Data error ", error);
    return res.status(422).send({ Error: error.message })
  }
})

router.get('/staffs', async (req, res) => {
  let arrStar = [];
  let ass = [];
  let arrSchedule1 = [];
  let arrSchedule2 = [];
  let salary;
  try {
    let staff = await Staff.find({status: 1}).populate("role").exec();
    for (let x = 0; x < staff.length; x++){
      salary = await Salary.findOne({ staff: staff[x]._id });

      let star = await Reviews.find({ idStaff: staff[x]._id });
      if (star.length !== 0) {
        console.log(star); // Nhan vien da dc danh gia.
        for (let i = 0; i < star.length; i++) {
          // console.log("oK", star[i].reviews.length);
          let s = star[i].reviews;
          Object.entries(s).forEach(async ([key, val]) => {
            // console.log(key); // 👉️ name, country
            // console.log(s[key]); // 👉️ James, Chile
            if (key === "star") {
              // console.log('star: ', val);
              for (let j = 0; j < val.length; j++) {
                arrStar.push(val[j]);
                // console.log('val', val[j]);
              }
            }
          });
        }

        let av = arrStar.reduce((partialSum, a) => partialSum + a, 0) / arrStar.length;
        let tofixed = av.toFixed(1);
        ass.push ({idStaff: staff[x]._id ,star: tofixed} )
      } else {
        console.log("Nhan vien không có trong review");
      }
      let schedule = await Schedule.find({ idStaff: staff[x]._id });
      if (schedule.length !== 0) {
        for (let y = 0; y < schedule.length; y++){
          if (format(new Date(schedule[y].date),'MM/yyyy') === format(new Date(),'MM/yyyy'))
            arrSchedule1.push(schedule[y]);
        }
        arrSchedule2.push({ idStaff: staff[x]._id, length: arrSchedule1.length})
        
      } else {
        console.log("Nhan vien ko có lich hen");
      }
      arrSchedule1 = [];
    }

     res.send({ staff, ass, arrSchedule2, salary });
  } catch (error) {
     console.log(" Data error ", error);
     return res.status(422).send({ Error: error.message });
   }
})

router.delete('/staff/:id', async (req, res) => {
  try {
    let deletedStaff = await Staff.updateOne({
      _id: req.params.id
    }, {
      $set: {
        status: 0
      },
    });
    res.send({ deletedStaff });
    
  } catch (error) {
     console.log(" Data error ", error);
     return res.status(422).send({ Error: error.message });
  }
})

router.get('/staff/staffid/:id', async (req, res) => {
  try {
    let staff = await Staff.findById(req.params.id).populate("role").exec();
    res.send({staff})
  } catch (error) {
      console.log(" Data error ", error);
      return res.status(422).send({ Error: error.message });
  }
})

router.get('/staff/role/groomer', async (req, res) => {
  try {
    let role = await Role.find({ "code": 'Groomer' });
    let groomer = await Staff.find({ role: role[0]._id });
    res.send(groomer);
        
  } catch (error) {
    console.log('Data error: ', error);
    return res.status(422).send({ Error: error.message})
  }
})

router.post("/staff/owner/changepassword", async (req, res) => {
  const { id, password , passworded} = req.body;
  try {
    Staff.findById(id).then(async (savedCustomer) => {
      if (savedCustomer) {
        bcrypt.compare(passworded, savedCustomer.password, async (err, result) => {
          if (result) {
            savedCustomer.password = password;
           await savedCustomer.save();
            res.send({ result});
          } else {
            res.send({ Error: "Mật khẩu hiện tại chưa chính xác" });
          }
        });
      }
    });
  } catch (error) {
    console.log("password does not match");
    return res.status(422).json({ error: "Invalid Credentials" });
  }
});

module.exports = router;
