const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const customerSchema = new Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    unique: true
  },
  address: String,
  birthday: String,
  image: {
    type: String,
    default:
      "https://648869380.r.worldcdn.net/app/views/client/lutfi-cloud-avatar/lutfi-file/images/avatar.png"
  },
  gender: String
});

customerSchema.pre('save', async function (next) {
    const customer = this;
    console.log("Just before saving ", customer.password);
    if (!customer.isModified('password')) {
        return next();
    }
    customer.password = await bcrypt.hash(customer.password, 8);
    console.log("Just after saving ", customer.password);
    next();
})
// Xuat model Customer de cac file khac co the dung
module.exports = mongoose.model("Customer", customerSchema);