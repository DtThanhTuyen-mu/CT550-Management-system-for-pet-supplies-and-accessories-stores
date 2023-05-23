const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const staffSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  idc: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    },
  phone: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  experience:
    // { type: Array }
    {
      title: { type: String },
      year: { type: String },
      describe: { type: String }
    },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:
      "https://648869380.r.worldcdn.net/app/views/client/lutfi-cloud-avatar/lutfi-file/images/avatar.png",
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role"
  },
  status: {
    type: Number,
    default: 1
  }

});
staffSchema.pre('save', async function (next) {
  const staff = this;
  console.log(" Just before saving: ", staff.password);
  if (!staff.isModified('password')) {
    return next();
  }
  staff.password = await bcrypt.hash(staff.password, 8);
  console.log("Just after saving ", staff.password);
  next();

})
module.exports = mongoose.model("Staff", staffSchema);
