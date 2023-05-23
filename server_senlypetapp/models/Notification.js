const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
    sender: {
        type: String
    },
    idStaff: {
        type: Schema.Types.ObjectId,
        ref: "Staff",
    },
    idCustomer: {
        type: Schema.Types.ObjectId,
        ref:"Customer",
    },
    idSchedule: {
        type: Schema.Types.ObjectId,
        ref:"Schedule",
    },
    status: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String,
    },
    body: {
        type: String,
    }
})
module.exports = mongoose.model("Notification", notificationSchema);