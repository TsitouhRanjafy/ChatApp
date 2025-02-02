import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    is_online: boolean;
}

const UserSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    is_online: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const User = model<IUser>('utilisateurs',UserSchema); 
