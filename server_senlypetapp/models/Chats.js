const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatsSchema = new Schema({
  roomId: {
    type: String
  },
  idCustomer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  idStaff: {
    type: Schema.Types.ObjectId,
    ref: "Staff"
  },
  message: {
    type: Array,
  }
});

module.exports = mongoose.model("Chats", chatsSchema);
