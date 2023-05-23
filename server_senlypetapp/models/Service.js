const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "CategoryService"
  },
  image: {
    type: String,
    required: true
  },
  times: {
    type: String,
    required: true
    
  },
  price:
    {
      weight: { type: String },
      byweight: { type: Number }
    },
  description:
    {
      title: { type: String },
      content: { type: String }
  },
  status: {
    type: Number,
    default: 1,
  }
});
module.exports = mongoose.model("Service", ServiceSchema);
