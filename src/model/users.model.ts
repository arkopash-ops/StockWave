import type { HydratedDocument } from "mongoose"
import { model, Model, Schema } from 'mongoose';
import type { IUser } from "../types/users.types.js";
import { RoleTypes } from "../types/users.types.js";

export type UserDocument = HydratedDocument<IUser>

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    role: {
        type: String,
        enum: Object.values(RoleTypes),
        default: RoleTypes.TRADER,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },
}, { timestamps: true });

const UserModel: Model<UserDocument> = model<UserDocument>("Users", userSchema);

export default UserModel;
