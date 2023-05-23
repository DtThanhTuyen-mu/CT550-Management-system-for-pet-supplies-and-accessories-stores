const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const petSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  name: { type: String },
  image: { type: String },
  type: { type: String },
  breed: { type: String },
  gender: { type: String },
  status: {
    type: Number,
    default: 1
  },
  weight: {
    weight: {
      type: String
    },
    date: { type: Date }
  },
  history: {
    idService: {
      type: String,
    },
    idStaff: {
      type: String,
    },
    date: { type: Date },
    time: { type: String },
    note: { type: String }
  }
});
module.exports = mongoose.model("Pet", petSchema);
