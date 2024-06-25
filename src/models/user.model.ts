import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Horoscope from "./horoscope.model";

interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    birthday: Date;
    gender: string;
    age?: number;
    imageUrl?: string;
    isActive: boolean;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    horoscope?: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    membership: mongoose.Schema.Types.ObjectId;
    role: mongoose.Schema.Types.ObjectId;
    token?: string;

    generateJwtFromUser: () => string;
    findUserHoroscope: () => Promise<mongoose.Schema.Types.ObjectId | null>;
    getResetPasswordTokenFromUser: () => string;
    calculateAge: () => number;
}

const UserScheme = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide a full name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Please provide a password with min lenght 6"],
    },
    birthday: {
        type: Date,
        required: [true, "Please provide a birthday"]
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        required: [true, "Please provide a gender"]
    },
    imageUrl: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    horoscope: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Horoscope"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Membership",
        required: true,
        default: process.env.MEMBERSHIP_FREE_ID
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
        default: process.env.ROLE_USER_ID
    },
    token: {
        type: String
    },
});

/**
 * @description Generate JWT token from user object
 * @param this IUser object
 * @returns JWT token
 */
UserScheme.methods.generateJwtFromUser = function (this: IUser) {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    if (!JWT_SECRET_KEY || !JWT_EXPIRE) {
        throw new Error('JWT secret key or expiration not defined in environment variables');
    }

    const payload = {
        id: this._id,
        fullName: this.fullName,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE })
    return token;
};

/**
 * 
 * @param this IUser object
 * @description Find user horoscope from birthday and add it to user object
 * @returns Horoscope ID or null if no match is found
 */
UserScheme.methods.findUserHoroscope = async function (this: IUser): Promise<mongoose.Types.ObjectId | null> {
    const date = this.birthday;
    const monthDay = date.toISOString().slice(5, 10); // Extract MM-DD format
    const horoscopes = await Horoscope.find();

    if (!horoscopes || horoscopes === undefined) return null;

    for (const horoscope of horoscopes) {
        if ((monthDay >= horoscope.startedDateRange && monthDay <= horoscope.endedDateRange) ||
            (horoscope.startedDateRange > horoscope.endedDateRange &&
                (monthDay >= horoscope.startedDateRange || monthDay <= horoscope.endedDateRange))) {
            return horoscope._id as mongoose.Types.ObjectId;
        }
    }
    return null; // Fallback in case no match is found
}

/**
 * 
 * @param this IUser object
 * @description Calculate age from birthday
 * @returns Age of user
 */
UserScheme.methods.calculateAge = function (this: IUser): number {
    const today = new Date();
    const birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/**
 * @description Generate reset password token
 * @returns Reset password token
 */
UserScheme.methods.getResetPasswordTokenFromUser = function () {
    const randomHexString = crypto.randomBytes(16).toString("hex")
    const resetPasswordToken = crypto
        .createHash("SHA256")
        .update(randomHexString)
        .digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE ?? '600000')
    return resetPasswordToken
}

UserScheme.pre("save", function (next) {
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
        });
    });
});

const User = mongoose.model<IUser>("User", UserScheme);

export default User;
