const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const servicepmSchema = new Schema({
  idCustomer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  idStaff: {
    type: Schema.Types.ObjectId,
    ref: "Staff"
  },
  idService: {
    type: Schema.Types.ObjectId,
    ref: "Service"
  },
  idSchedule: {
    type: Schema.Types.ObjectId,
    ref: "Schedule"
  },
  product: {
    idProduct: { type: Schema.Types.ObjectId },
    quantity: { type: Number },
    total: { type: Number },
    status: {
      type: String
    }
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  weight: {
    type: String
  },
  total: {
    type: Number,
  },
  item: {
    type: String
  },
  codebill: {
    type:String
  },
  status: {
    status: { type: String },
    date: { type: Date},
    time: {type: String}
  },
  check: {
    type: Number,
  }
});
module.exports = mongoose.model("Payment", servicepmSchema);
