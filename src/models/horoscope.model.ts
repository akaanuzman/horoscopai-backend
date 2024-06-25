
import mongoose from "mongoose";

const HoroscopeScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a horoscope name"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startedDateRange: {
        type: String,
        required: [true, "Please provide a started date range"]
    },
    endedDateRange: {
        type: String,
        required: [true, "Please provide an ended date range"]
    },
});

const Horoscope = mongoose.model("Horoscope", HoroscopeScheme);

export default Horoscope;