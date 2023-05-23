const router = require("express").Router();
const Review = require("../models/Reviews");
const Schedule = require("../models/Schedule");
const date = require("date-fns");
const format = date.format;
router.post('/review/schedule', async (req, res) => {

  let push;
    try {
        const {idStaff,idCustomer, idService, idSchedule, star, content,date, time} = req.body;
       // ktra neu da ton tai
      Review.findOne({
        idStaff: idStaff,  idService:idService, idCustomer: idCustomer
      }).then(async (savedReview) => {
        if (savedReview) {
          push = await Review.updateOne(
            { _id: savedReview._id },
            {
              $push: {
                reviews: {
                  idSchedule: idSchedule,
                  star: star,
                  content: content,
                  date: new Date(),
                  time: format(new Date(), "HH:mm")
                }
              }
            }
          );
          return res.send({ push });
        }
        let newRe = new Review();
        newRe.idStaff= idStaff;
        newRe.idService = idService;
        newRe.idCustomer = idCustomer;
        try {
          await newRe.save();
            push = await Review.updateOne(
              { _id: newRe._id },
              {
                $push: {
                  reviews: {
                    idSchedule: idSchedule,
                    star: star,
                    content: content,
                    date: new Date(),
                    time: format(new Date(), "HH:mm")
                  }
                }
              }
            );
          
            res.send({ push });
        } catch (error) {
          console.log("Data err", error);
          return res.status(422).send({ Error: error.message });
        }
      })
     
    } catch (error) {
        console.log(" Data error ", error);
        return res.status(422).send({ Error: error.message });
    }
})

// Tim shedule co status la 3 
router.get('/customer/id=:id/schedules', async (req, res) => {
    try {
        let rs = await Review.find({idCustomer: req.params.id});
        res.send({ rs });
    } catch (error) {
        console.log(" Data error ", error);
        return res.status(422).send({ Error: error.message });
    }
})

router.get('/staff/id=:id/schedules', async (req, res) => {
    try {
        let rs = await Review.find({idStaff: req.params.id});
        res.send({ rs });
    } catch (error) {
        console.log(" Data error ", error);
        return res.status(422).send({ Error: error.message });
    }
})

// Danh gia sao cua nhan vien
router.get('/staff/id=:id/reviews/star', async (req, res) => {
  let arrStar = [];
  try {
    let star = await Review.find({ idStaff: req.params.id });
    // res.send({ star });
    for (let i = 0; i < star.length; i++){
      // console.log("oK", star[i].reviews.length);
      let s = star[i].reviews;
      Object.entries(s).forEach(async ([key, val]) => {
        // console.log(key); // 👉️ name, country
        // console.log(s[key]); // 👉️ James, Chile
        if (key === 'star') {
          // console.log('star: ', val);
          for (let j = 0; j < val.length; j++){
            arrStar.push(val[j]);
            // console.log('val', val[j]);
          };
        }
      })
    //  Object.entries(s).forEach((entry) => {
    //    const [key, value] = entry;
    //    console.log(key, value);
    //  });
    }
    console.log("aray: ", arrStar);
    let av =
      arrStar.reduce((partialSum, a) => partialSum + a, 0) / arrStar.length;
    let tofixed = av.toFixed(1);
    res.send({ tofixed });

  } catch (error) {
    console.log("Data err", error);
    return res.status(422).send({ Error: error.message });
  }
})

module.exports = router;