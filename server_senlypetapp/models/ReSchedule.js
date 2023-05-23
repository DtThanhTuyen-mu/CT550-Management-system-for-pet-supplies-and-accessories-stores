const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reScheduleSchema = new Schema({
    schedule: {
        type: Schema.Types.ObjectId,
        ref:"Schedule",
        required: true,
    },
    date: {
        type: Date,

    },
    time: {
        type: String,
    },
    status: {
        type: Number,
        default: 1,
    }
})
module.exports = mongoose.model('ReSchedule', reScheduleSchema);