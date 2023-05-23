const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  storage: {
    type: Number,
    required: true
  },
  delivery: {
    type: Number,
    require: true
  },
  unit: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
});
module.exports = mongoose.model('Product', ProductSchema);