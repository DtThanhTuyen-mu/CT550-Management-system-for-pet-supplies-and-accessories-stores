const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  idStaff: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Staff"
  },
  idCustomer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  },
  idService: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Service"
  },
  idPets: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Pet"
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  reSchedule: {
    type: Schema.Types.ObjectId,
    ref: "ReSchedule"
  },
  status: {
    type: Number,
    default: 1
  },
  weight: {
    type: String
  },
  price: {
    type: String
  },
  times: {
    type: Number,
    default: 1
  }
});
module.exports = mongoose.model("Schedule", scheduleSchema);
