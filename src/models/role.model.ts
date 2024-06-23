import mongoose from "mongoose";


const RoleScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a role name"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Role = mongoose.model("Role", RoleScheme);

export default Role;