import mongoose from "mongoose";

const MembershipType = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a membership name"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Membership = mongoose.model("Membership", MembershipType);

export default Membership;