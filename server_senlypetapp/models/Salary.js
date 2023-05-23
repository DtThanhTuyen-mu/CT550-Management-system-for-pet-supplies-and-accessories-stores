const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const salarySchema = new Schema({
    staff:{
        type: Schema.Types.ObjectId,
        ref:"Staff",
    },
    salary: {
        type: Number,
    },
    bonus: {
        reward: { type: Number },
        month: { type: String}
    }
})
module.exports = mongoose.model("Salary", salarySchema);