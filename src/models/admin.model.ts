import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface IAdmin extends Document {
    email: string;
    password: string;
    isActive: boolean;
    resetPasswordToken?: number;
    token?: string;
    createdAt: Date;
    role: mongoose.Schema.Types.ObjectId;

    generateJwtFromUser: () => string;
}

const AdminScheme = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ],
    },
    password: {
        type: String,
        minLength: [6, "Please provide a password with min lenght 6"],
        required: [true, "Please provide a password"],
        select: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    resetPasswordToken: {
        type: Number
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
        default: process.env.ROLE_ADMIN_ID
    }
});

AdminScheme.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    if (!JWT_SECRET_KEY || !JWT_EXPIRE) {
        throw new Error('JWT secret key or expiration not defined in environment variables');
    }

    const payload = {
        id: this._id,
        email: this.email
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })
    return token;
}

AdminScheme.pre("save", function (next) {
    // password is change?
    if (!this.isModified("password")) {
        next()
    }

    // if password is not change, password is hashed
    bcrypt.genSalt((err, salt) => {
        if (err) next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err)
            this.password = hash
            next()
        })
    })
})

const Admin = mongoose.model<IAdmin>("Admin", AdminScheme);

export default Admin;