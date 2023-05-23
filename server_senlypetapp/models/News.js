const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
});
 
// Xuat model News de cac file khac co the dung
module.exports = mongoose.model("News", newsSchema);
