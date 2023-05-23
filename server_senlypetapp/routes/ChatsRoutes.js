const router = require("express").Router();
const Chats = require('../models/Chats');
const randomstring = require("randomstring");

// Thêm mới 1 hội thoại
router.post("/conversation", async (req, res) => {
    const { nameStaff, idCustomer, idStaff } = req.body;
    var codestring = randomstring.generate({
      length: 5,
      charset: "alphabetic",
      capitalization: "lowercase"
    });
    // console.log(idStaff , idCustomer);
     
    Chats.findOne({ idCustomer: idCustomer, idStaff: idStaff }).then(async (savedConversation) => {
        if (savedConversation) {
            let roomid = savedConversation.roomId;
            return res.send({ roomid });
        }
        const conversation = new Chats({
            roomId: codestring + nameStaff,
            idCustomer: idCustomer,
            idStaff:  idStaff,
    
        });
        try {
            await conversation.save();
            let roomid = conversation.roomId;
            res.send({ roomid});
              
        } catch (error) {
             console.log("Data error: ", error);
             return res.status(422).send({ Error: error.message });
        }
    })
});

// Lấy ra hội thoại có roomId?
router.get('/conversation/roomID=:id', async (req, res) => {
    try {
        let conversation = await Chats.findOne({ roomId: req.params.id }).populate("idCustomer idStaff");
        res.send({ conversation });
    } catch (error) {
        console.log("Data error: ", error);
        return res.status(422).send({ Error: error.message });
           }
})

// Set người nhận, người gửi cho 1 hội thoại
router.put('/conversation/sender=:sender/receiver=:receiver', async (req, res) => {
  try {
    let push = await Chats.findOneAndUpdate({ roomId: req.body.roomId }, {
      $push: {
        message: {
          sender: req.params.sender,
          text: req.body.text,
          createdAt: new Date(),
        }
      }
    })
    res.send({ push });
  } catch (error) {
    console.log("Data error: ", error);
    return res.status(422).send({ Error: error.message });
        
  }
})

// Lấy ra 1 hội thoại của khách hàng có id=?
router.get('/conversation/idcustomer=:id', async (req, res) => {
  try {
    let conversation = await Chats.find(
      { idCustomer: req.params.id },
      { message: { $slice: -1 } }
    )
      .populate("idCustomer idStaff")
      .exec();
    res.send({ conversation });
  } catch (error) {
  console.log("Data error: ", error);
  return res.status(422).send({ Error: error.message });
  }
});

// Lấy ra hội thoại của nhân viên có id=?
router.get('/conversation/idstaff=:id', async (req, res) => {
  try {
    let conversation = await Chats.find({ idStaff: req.params.id }, { message: { $slice: -1 } }).populate('idCustomer idStaff').exec();
    res.send({ conversation });
  } catch (error) {
  console.log("Data error: ", error);
  return res.status(422).send({ Error: error.message });
  }
});

module.exports = router;