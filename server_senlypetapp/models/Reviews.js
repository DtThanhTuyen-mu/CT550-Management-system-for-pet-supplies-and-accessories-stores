const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = require("date-fns");
const format = date.format;
const reviewSchema = new Schema({
  idStaff: {
    type: Schema.Types.ObjectId,
    ref: "Staff"
  },
  idCustomer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  idService: {
    type: Schema.Types.ObjectId,
    ref: "Service"
  },
  reviews: {
    idSchedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule"
    },
    star: {
      type: Number
    },
    content: {
      type: String
    },
    date: {
      type: Date, 
    },
    time: {
      type: String,
    }
  }
});
module.exports = mongoose.model("Review", reviewSchema);
